function Sockets(){
	socket.on("cookie", function(data){
		utils.cookie(data);
	});

	socket.on("countdown", function(count){
		queue_utils.countdown(count);
	});

	socket.on("reload", function(){
		window.location.reload();
	});

	socket.on("message", function(data){
		utils.message(data.message, data.err);
	});

	socket.on("refresh", function(data){
		queue_utils.clear_items(QUEUE_TYPE.QUEUE);

		for (item of data.queue){
			queue_utils.add_item({
				type: QUEUE_TYPE.QUEUE,
				link: item.link,
				title: item.title,
				submitter: item.user,
				secs: item.duration
			});
		}

		queue_utils.clear_items(QUEUE_TYPE.PLAYLIST);

		for (item of data.playlist){
			queue_utils.add_item({
				type: QUEUE_TYPE.PLAYLIST,
				link: item.link,
				title: item.title,
				submitter: item.user,
				secs: item.duration
			});
		}

		queue_utils.check_none(QUEUE_TYPE.QUEUE);
		queue_utils.check_none(QUEUE_TYPE.PLAYLIST);

		queue_utils.check_width();
	});

	return this;
}