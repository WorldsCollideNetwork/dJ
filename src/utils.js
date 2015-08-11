var crypto = require("crypto");

function Utils(){
	this.timestamp = function(){
		var date  = new Date().toString(),
		    split = date.split(" "),
		    time  = split[4] + " " + split[1] + "/" + split[2];

		return time;
	};

	this.encrypt = function(text){
		var config    = require("./CONFIG.json"),
		    cipher    = crypto.createCipher(
		                config.encryption.algorithm,
		                config.encryption.password
		    ),
		    encrpyted = cipher.update(text, "utf8", "hex") + cipher.final("hex");

		return encrpyted;
	};

	this.decrypt = function(text){
		try {
			var config    = require("./CONFIG.json"),
			    cipher    = crypto.createDecipher(
			                config.encryption.algorithm,
			                config.encryption.password
			    ),
			    decrpyted = cipher.update(text, "hex", "utf8") + cipher.final("utf8");

			return decrpyted;
		} catch (e){
			return undefined;
		}
	};

	this.cookie = function(socket, data){
		var date = new Date();
		date.setTime(date.getTime() + (data.secs * 1000)),

		socket.emit("cookie", {
			name: data.name,
			value: data.value,
			expires: "expires=" + date.toGMTString()
		});
	};

	this.test_mp3 = function(url, callback){
		if (global.tester){
			global.tester.removeAllListeners("test");
			global.tester.on("test", callback);
			global.tester.emit("test", url);
		} else {
			callback(true);
		}
	};

	this.cmd = function(cmd, args){
		var child = require("child_process").spawn(cmd, args),
		    that  = this;

		child.on("error", function(err){
			console.log("SHELL ERROR.");
			console.log("- CODE: " + err.code);
		});

		return child;
	};

	this.socks = function(io){
		var res = [],
		    ns  = io.of("/");

		if (ns){
			for (var id in ns.connected){
				res.push(ns.connected[id]);
			}
		}

		return res;
	};

	return this;
}

module.exports = new Utils;