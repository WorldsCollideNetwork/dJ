var youtube = require("youtube-api"),
    vimeo   = require("n-vimeo").video,
    request = require("request");

youtube.authenticate({
	type: "key",
	key: "AIzaSyAhURyXN3_fuGxfnDUlMrLQc7JBKo0W168"
});

function Info(data, callback){
	function parse_youtube_url(url){
		var id  = undefined,
		    pos = undefined;

		try {
			if (url.indexOf("youtu.be") > -1){
				id = url.split(".be/")[1];
			} else {
				id = url.split("v=")[1];
				pos = id.indexOf("&");

				if (pos > -1){
					id = id.substring(0, pos);
				}
			}
		} catch (e){
			id = "";
		}

		return id;
	}

	function parse_vimeo_url(url){
		var id  = undefined,
		    pos = undefined;

		try {
			id = url.split(".com/")[1];
			pos = id.indexOf("/");

			if (pos > -1){
				id = id.substring(0, pos);
			}
		} catch (e){
			id = "";
		}

		return id;
	}

	if (data.link.indexOf("youtube.com") > -1 || data.link.indexOf("youtu.be") > -1){
		youtube.videos.list({
			part: "snippet,contentDetails",
			id: parse_youtube_url(data.link)
		}, function(err, data){
			if (err || data.items.length == 0){
				callback(true);
			} else {
				callback(false, {
					title: data.items[0].snippet.title,
					link: "https://www.youtube.com/watch?v=" + data.items[0].id
				});
			}
		});
	} else if (data.link.indexOf("soundcloud.com") > -1){
		request({
			url: "https://api.soundcloud.com/resolve.json?url=" + data.link + "&client_id=bc8f8976a90b8ccc960c84989861c3dc",
			json: true
		}, function(err, res, data){
			if (err || res.statusCode != 200 || data.kind != "track"){
				callback(true);
			} else {
				callback(false, {
					title: data.title,
					link: data.permalink_url
				});
			}
		});
	} else if (data.link.indexOf("vimeo.com") > -1){
		vimeo(parse_vimeo_url(data.link), function(err, data){
			if (err){
				callback(true);
			} else {
				callback(false, {
					title: data.raw.title,
					link: data.raw.url
				});
			}
		});
	} else if (data.link.indexOf(".mp3", data.link.length - 4) > -1){
		callback(false, {
			title: data.title && data.title != "" ? data.title : data.link,
			link: data.link
		});
	} else {
		callback(true);
	}
}

module.exports = Info;