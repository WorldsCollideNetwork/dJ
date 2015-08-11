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
				var duration = data.items[0].contentDetails.duration.replace("PT", "");

				duration = duration.replace("H", " * 3600) + (");
				duration = duration.replace("M", " * 60) + (");

				if (duration.indexOf("S") > -1){
					duration = duration.replace("S", " * 1)");
				} else {
					duration = duration + "0)";
				}

				callback(false, {
					title: data.items[0].snippet.title,
					link: "https://www.youtube.com/watch?v=" + data.items[0].id,
					duration: eval("(" + duration)
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
					link: data.permalink_url,
					duration: Math.round(data.duration / 1000)
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
					link: data.raw.url,
					duration: data.raw.duration
				});
			}
		});
	} else if (data.link.indexOf(".mp3", data.link.length - 4) > -1){
		require("./utils").test_mp3(data.link, function(duration){
			console.log(duration);
			if (duration == null || duration == undefined || duration == NaN){
				callback(true);
			} else {
				callback(false, {
					title: data.title && data.title != "" ? data.title : data.link,
					link: data.link,
					duration: Math.round(duration)
				});
			}
		});
	} else {
		callback(true);
	}
}

module.exports = Info;