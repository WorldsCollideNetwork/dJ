var cookie = require("cookie");

function Sockets(socketio, io){
	var dj = require("./dj")(io);

	io.on("connection", function(socket){
		var url = socket.handshake.headers.referer;

		if (url.indexOf("/tester", url.length - 3) > -1){
			global.tester = socket;
		}

		var cookies = socket.handshake.headers.cookie;

		if (cookies){
			cookies = cookie.parse(cookies);

			if (cookies.user && require("./utils").decrypt(cookies.user)){
				socket.user = require("./utils").decrypt(cookies.user);
			}

			if (cookies.staff){
				socket.staff = cookies.staff;
			}
		}

		dj.refresh();

		socket.on("disconnect", function(){
			if (global.tester == socket){
				global.tester = undefined;
			}
		});

		// for seekrit debugging purposes
		socket.on("reload", function(){
			if (socket.user && socket.staff){
				console.log("CLIENT RELOAD INITIATED.");
				console.log("- USER: " + socket.user);

				io.emit("reload");
			}
		});

		socket.on("login", function(data){
			require("request")({
				method: "POST",
				url: require("./CONFIG.json").login_request,
				json: {
					"username": data.username,
					"password": data.password
				}
			}, function(err, res, body){
				if (err || res.statusCode != 200){
					socket.emit("message", {
						message: "An error occurred connecting to worldscolli.de!",
						err: true
					});
				} else {
					if (body.success){
						var utils = require("./utils");

						utils.cookie(socket, {
							name: "user",
							value: utils.encrypt(data.username),
							secs: (60 * 60 * 24 * 365 * 20) // 20 years
						});

						utils.cookie(socket, {
							name: "staff",
							value: body.data.staff,
							secs: (60 * 60 * 24 * 365 * 20) // 20 years
						});

						socket.emit("reload");
					} else {
						socket.emit("message", {
							message: "Invalid credentials!",
							err: true
						});
					}
				}
			});
		});

		socket.on("add", function(data){
			if (socket.user){
				dj.add(socket, data);
			}
		});

		socket.on("drop", function(){
			if (socket.user){
				dj.drop(socket);
			}
		});

		socket.on("veto", function(){
			if (socket.user){
				dj.veto(socket);
			}
		});
	});
}

module.exports = Sockets;