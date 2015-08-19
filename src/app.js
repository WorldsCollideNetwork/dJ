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

	if (req.cookies.colour){
		res.locals.colour = req.cookies.colour;
	} else {
		res.locals.colour = "#F44336";
	}

	if (req.cookies.shade){
		res.locals.shade = req.cookies.shade;
	} else {
		res.locals.shade = "#D02B2B";
	}

	// options

	var options = [];

	if (req.cookies.user && require("./utils").decrypt(req.cookies.user)){
		// special debugging privileges
		if (require("./utils").decrypt(req.cookies.user) == "Winneon"){
			options.push("own");
		}

		options.push("logged_in");
	}

	if (req.get("User-Agent") && req.get("User-Agent").indexOf("Firefox") > -1){
		options.push("firefox");
	}

	if (req.cookies.staff){
		options.push("staff");
	}

	if (req.query.popup){
		options.push("popup");
	}

	res.locals.string = options.join(" ");
	res.locals.options = options;

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