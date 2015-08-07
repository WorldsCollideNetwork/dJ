var http     = require("http"),
    path     = require("path"),
    fs       = require("fs"),
    express  = require("express"),
    socketio = require("socket.io");

var app      = express();

var server   = module.exports = http.Server(app),
    io       = socketio(server);

app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, "views")));

app.get("/", function(req, res){
	res.render("index", {
		version: fs.readFileSync(path.join(__dirname, "VERSION_DEVEL"))
	});
});

require("./sockets")(socketio, io);