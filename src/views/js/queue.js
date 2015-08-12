var queue_utils = new QueueUtils("div.queue", "div.playlist");

function Queue(socket){
	this.add_request = function(link, title){
		socket.emit("add", {
			link: link,
			title: title
		});
	};

	this.drop_request = function(){
		socket.emit("drop");
	};

	this.veto_request = function(){
		socket.emit("veto");
	};

	return this;
}