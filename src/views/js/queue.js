function Queue(socket){
	var queue_utils = new QueueUtils("div.queue", "div.playlist");

	this.add_request = function(link){
		socket.emit("add", link);
	};

	$(document).on("paste", function(event){
		event.preventDefault();

		var text = (event.originalEvent || event).clipboardData.getData('text/plain');
		this.add_request(link);
	});

	return this;
}