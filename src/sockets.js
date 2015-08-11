function Sockets(socketio, io){
	io.on("connection", function(socket){
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
	});
}

module.exports = Sockets;