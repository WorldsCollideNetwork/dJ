function Sockets(){
	socket.on("cookie", function(data){
		if (data.clear){
			document.cookie = data.name + "=dummy; Max-Age=0; path=/";
		} else {
			document.cookie = data.name + "=" + data.value + "; " + data.expires + "; path=/";
		}
	});

	socket.on("reload", function(){
		window.location.reload();
	});

	socket.on("refresh", function(data){
		queue_utils.clear_items(QUEUE_TYPE.QUEUE);

		for (item of data.queue){
			queue_utils.add_item({
				type: QUEUE_TYPE.QUEUE,
				title: item.title,
				submitter: item.user,
				secs: item.duration
			});
		}

		queue_utils.clear_items(QUEUE_TYPE.PLAYLIST);

		for (item of data.playlist){
			queue_utils.add_item({
				type: QUEUE_TYPE.PLAYLIST,
				title: item.title,
				submitter: item.user,
				secs: item.duration
			});
		}

		queue_utils.check_none(QUEUE_TYPE.QUEUE);
		queue_utils.check_none(QUEUE_TYPE.PLAYLIST);
	});

	return this;
}