var socket = io("localhost");

socket.on("test", function(url){
	var audio = $("<audio/>", { src: url }),
	    cont  = true;

	console.log("Verifying MP3 data...");

	audio.on("canplaythrough", function(){
		var duration = $(this)[0].duration;

		console.log("MP3 data confirmed! Duration (in seconds): " + duration);
		socket.emit("test", duration);

		cont = false;
	});

	setTimeout(function(){
		if (cont){
			console.log("Unable to confirm MP3 data.");
			socket.emit("test", NaN);
		}
	}, 5000);
});