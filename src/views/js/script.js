var socket    = io.connect("localhost"),
    utils     = new Utils(),
    queue     = new Queue(socket);
    logged_in = $("body").hasClass("logged_in");

$(document).ready(function(){
	if (window.location.search != ""){
		// using single quotes instead of double quotes for json parsing
		window.params = JSON.parse('{"' + decodeURI(window.location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
	}

	new Buttons();
	new Sockets();
	new Look();
});