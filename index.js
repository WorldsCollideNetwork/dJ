console.c_log = console.log.bind(console);
console.log = function(data){
	this.c_log("[" + require("./utils").timestamp() + "]: >", data)
};

var server = require("./app").listen(80, function(){
	var host = server.address().address,
	    port = server.address().port;

	console.log("LISTENING.");
	console.log("- ADDRESS: " + host);
	console.log("- PORT:    " + port);
});