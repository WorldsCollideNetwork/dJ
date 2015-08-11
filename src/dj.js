var youtube = require("youtube-api");

youtube.authenticate({
	type: "key",
	key: "AIzaSyAhURyXN3_fuGxfnDUlMrLQc7JBKo0W168"
});

function dJ(){
	this.add = function(data){
		youtube.videos.list({
			part: "snippet,contentDetails",
			id: data.link
		}, function(err, data){
			if (err){
				console.log(err);
			} else {
				console.log(data.items[0]);
			}
		});
	};

	return this;
}

module.exports = new dJ();