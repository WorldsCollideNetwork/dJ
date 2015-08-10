var socket    = io.connect("localhost"),
    utils     = new Utils(),
    logged_in = $("body").hasClass("logged_in");

$(document).ready(function(){
	var queue = new Queue(socket),
	    look  = new Look();

	new Buttons();

	if (window.location.search != ""){
		// using single quotes instead of double quotes for json parsing
		window.params = JSON.parse('{"' + decodeURI(window.location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
	}

	look.first_run();
});