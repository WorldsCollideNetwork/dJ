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

	// register sockets

	socket.on("refresh", function(data){
		queue_utils.clear_items(QUEUE_TYPE.QUEUE);

		for (item of data.queue){
			queue_utils.add_item({
				type: QUEUE_TYPE.QUEUE,
				title: item.title,
				submitter: item.submitter,
				duration: item.duration
			});
		}

		queue_utils.clear_items(QUEUE_TYPE.PLAYLIST);

		for (item of data.playlist){
			queue_utils.add_item({
				type: QUEUE_TYPE.PLAYLIST,
				title: item.title,
				submitter: item.submitter,
				duration: item.duration
			});
		}
	});

	return this;
}