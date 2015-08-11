var socket = io("localhost:" + $("span.text").text());

socket.on("test", function(url){
	var audio = $("<audio/>", { src: url }),
	    cont  = true;

	console.log("Verifying MP3 data...");

	audio.on("canplaythrough", function(){
		var duration = $(this)[0].duration;

		console.log("MP3 data confirmed! Duration (in seconds): " + duration);
		socket.emit("test", false, duration);

		cont = false;
	});

	setTimeout(function(){
		if (cont){
			console.log("Unable to confirm MP3 data.");
			socket.emit("test", true);
		}
	}, 5000);
});