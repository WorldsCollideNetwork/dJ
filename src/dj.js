function dJ(io){
	var queue = {
		list:    [],
		playing: false,
		process: undefined,
		timeout: undefined
	};

	var that = this,
	    cmd  = "google-chrome";

	if (/^win/.test(process.platform)){
		cmd = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
	}

	this.refresh = function(){
		require("./utils").socks(io).forEach(function(socket){
			socket.emit("refresh", {
				queue: queue.list,
				playlist: []
			});
		});
	};

	this.get = function(user){
		for (var i = 0; i < queue.list.length; ++i){
			var request = queue.list[i];

			if (request.user == user){
				return request;
			}
		}

		return undefined;
	};

	this.rem = function(user){
		if (this.get(user)){
			queue.list.splice(queue.list.indexOf(this.get(user)), 1);

			return true;
		}

		return false;
	};

	this.add = function(socket, data){
		socket.emit("load", true);
		require("./info").get(socket, data, function(err, info){
			if (!err && !that.get(socket.user)){
				queue.list.push(info);
				this.refresh();

				console.log("ADDED REQUEST.");
				console.log("- USER: " + info.user);
				console.log("- LINK: " + info.link);
			}

			socket.emit("load", false);
		});
	};

	this.drop = function(socket){
		socket.emit("load", true);

		if (this.get(socket.user)){
			if (queue.list[0] == this.get(socket.user)){
				this.kill();
			} else {
				this.rem(socket.user);
			}

			this.refresh();

			console.log("DROPPED REQUEST.");
			console.log("- USER: " + socket.user);
		}

		socket.emit("load", false);
	};

	this.kill = function(){
		if (queue.process && queue.timeout){
			queue.process.kill();
			clearTimeout(queue.timeout);
			this.rem(queue.list[0].user);

			queue.process = undefined;
			queue.timeout = undefined;
			queue.playing = false;
		}
	};

	setInterval(function(){
		if (!queue.playing){
			if (queue.list.length > 0){
				queue.playing = true;
				queue.process = require("./utils").cmd(cmd, [queue.list[0].link]);
				queue.timeout = setTimeout(function(){
					that.kill();
					that.refresh();
				}, (queue.list[0].duration + 5 + queue.list[0].addition) * 1000);
			}
		} else if (queue.list.length == 0){
			queue.playing = false;
		}
	}, 500);

	return this;
}

module.exports = dJ;