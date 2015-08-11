var socket = io("localhost:" + $("span.port").text());

socket.on("test", function(url){
	var audio = $("<audio/>", { src: url }),
	    inter = 0;

	console.log("Verifying MP3 data...");

	var interval = setInterval(function(){
		var duration = audio[0].duration;

		if (duration){
			console.log("MP3 data confirmed! Duration (in seconds): " + duration);
			socket.emit("test", false, duration);

			clearInterval(interval)
		} else if (inter == 5){
			console.log("Unable to confirm MP3 data.");
			socket.emit("test", true);

			clearInterval(interval)
		} else {
			++inter;
		}
	}, 1000);
});