function Queue(socket){
	var queue_utils = new QueueUtils("div.queue", "div.playlist");

	this.add_request = function(link, title){
		socket.emit("add", {
			link: link,
			title: title
		});
	};

	var that = this;

	$(document).on("paste", function(event){
		var text = (event.originalEvent || event).clipboardData.getData('text/plain');

		if (text.endsWith(".mp3")){
			window.temp_url = text;
			utils.modal("title");
		} else {
			that.add_request(text);
		}

		event.preventDefault();
	});

	return this;
}