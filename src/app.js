var http     = require("http"),
    path     = require("path"),
    fs       = require("fs"),
    express  = require("express"),
    socketio = require("socket.io"),
    cookie   = require("cookie-parser");

var app      = express();

var server   = module.exports = http.Server(app),
    io       = socketio(server);

app.set("view engine", "jade");

app.use(express.static(path.join(__dirname, "views")));
app.use(cookie());

app.use(function(req, res, next){
	res.locals.version = fs.readFileSync(path.join(__dirname, "VERSION_DEVEL"), "utf8");

	if (req.cookies.user){
		try {
			require("./utils").decrypt(req.cookies.user);
			res.locals.logged_in = true;
		} catch (e){ }
	}

	next();
});

app.get("/", function(req, res){
	res.render("index");
});

require("./sockets")(socketio, io)