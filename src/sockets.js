var cookie = require("cookie");

function Sockets(socketio, io){
	var dj = require("./dj")(io);

	io.on("connection", function(socket){
		var url    = socket.handshake.headers.referer,
		    cookies = cookie.parse(socket.handshake.headers.cookie);

		if (url.indexOf("/dj", url.length - 3) > -1){
			global.tester = socket;
		}

		if (cookies.user && require("./utils").decrypt(cookies.user)){
			socket.user = require("./utils").decrypt(cookies.user);
		}

		dj.refresh();

		socket.on("disconnect", function(){
			if (global.tester == socket){
				global.tester = undefined;
			}
		});

		socket.on("login", function(data){
			require("request")({
				method: "POST",
				url: "http://worldscolli.de/api/login",
				json: {
					"username": data.username,
					"password": data.password
				}
			}, function(err, res, body){
				if (!err && res.statusCode == 200){
					if (body.success){
						var utils = require("./utils");

						utils.cookie(socket, {
							name: "user",
							value: utils.encrypt(data.username),
							secs: (60 * 60 * 24 * 365 * 20) // 20 years
						});

						socket.emit("reload");
					}
				}
			});
		});

		socket.on("add", function(data){
			if (socket.user){
				dj.add(socket, data);
			}
		});
	});
}

module.exports = Sockets;