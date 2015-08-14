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
	res.locals.port = require("./CONFIG.json").port;
	res.locals.version = fs.readFileSync(path.join(__dirname, "VERSION_DEVEL"), "utf8");

	if (req.get("User-Agent").indexOf("Firefox") > -1){
		res.locals.firefox = true;
	}

	if (req.cookies.user && require("./utils").decrypt(req.cookies.user)){
		// special debugging privileges
		if (require("./utils").decrypt(req.cookies.user) == "Winneon"){
			res.locals.own = true;
		}

		res.locals.logged_in = true;
	}

	if (req.cookies.staff){
		res.locals.staff = true
	}

	next();
});

app.get("*", function(req, res){
	var url = req.url.split("?")[0];

	if (url == "/"){
		res.render("index");
	} else {
		url = url.replace("/", "");

		if (res.locals.own){
			res.render(url);
		} else {
			res.redirect("/");
		}
	}
});

require("./sockets")(socketio, io)