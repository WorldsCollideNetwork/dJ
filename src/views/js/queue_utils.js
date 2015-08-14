var QUEUE_TYPE = {
	QUEUE: 1,
	PLAYLIST: 2
};

function QueueUtils(queue, playlist){
	var count   = false,
	    count_i = undefined;

	function selector(type){
		switch (type){
			case QUEUE_TYPE.QUEUE:
				return queue + " > ul.item_list";
			case QUEUE_TYPE.PLAYLIST:
				return playlist + " > ul.item_list";
		}
	}

	this.time = function(secs){
		if (isNaN(secs)){
			secs = 0;
		}

		var hours  = Math.floor(secs / 3600),
		    remain = secs % 3600;

		var mins   = Math.floor(remain / 60),
		    remain = Math.floor(remain % 60);

		if (mins < 10){
			mins = "0" + mins;
		}

		if (remain < 10){
			remain = "0" + remain;
		}

		var time = [mins, remain].join(":");

		if (hours > 0){
			time = [hours, time].join(":");
		}

		return time;
	};

	this.clear_items = function(type){
		$(selector(type)).children().remove();
	};

	this.check_none = function(type){
		var $selector = $(selector(type));

		if ($selector.children().length == 0){
			$selector.hide();
			$selector.parent().find("div.none").show();
		} else {
			$selector.show();
			$selector.parent().find("div.none").hide();
		}
	};

	this.check_width = function(){
		var queue    = $(selector(QUEUE_TYPE.QUEUE)).children(),
		    playlist = $(selector(QUEUE_TYPE.PLAYLIST)).children();

		function callback(item){
			$(item).find("a.title").css("width", $(item).find("div.details").width());
		}

		for (var i = 0; i < queue.length; ++i){
			callback(queue[i]);
		}

		for (var i = 0; i < playlist.length; ++i){
			callback(playlist[i]);
		}
	};

	this.countdown = function(count){
		var $selector = $(selector(QUEUE_TYPE.QUEUE));

		if ($selector.children().length > 0){
			$($selector.children()[0]).find("div.duration span").text(this.time(count));
		}
	};

	this.add_item = function(data){
		var $selector    = $(selector(data.type)),
		    $item        = $("<li/>"),
		    $icon        = $("<div/>",  { "class": "icon"      }),
		    $details     = $("<div/>",  { "class": "details"   }),
		    $duration    = $("<div/>",  { "class": "duration"  });

		var $d_icon      = $("<div/>"),
		    $dd_icon     = $("<div/>"),
		    $i_icon      = $("<i/>",    { "class": "fa"        });

		var $d_details   = $("<div/>"),
		    $dd_details  = $("<div/>"),
		    $title       = $("<a/>",    { "class": "title"     }).text(data.title),
		    $submitter   = $("<span/>", { "class": "submitter" }).text(data.submitter);

		var $d_duration  = $("<div/>"),
		    $dd_duration = $("<div/>"),
		    $s_duration  = $("<span>").text(this.time(data.secs));

		$title.attr("href", data.link);
		$title.attr("title", data.title + "\n" + data.link);
		$title.attr("target", "_blank");

		$i_icon.addClass($selector.children().length == 0 ? "fa-play" : "fa-angle-up");
		$i_icon.css("font-size", $selector.children().length == 0 ? "" : "2.75rem");
		$dd_icon.append($i_icon);
		$d_icon.append($dd_icon);
		$icon.append($d_icon);

		$dd_details.append($title);
		$dd_details.append($submitter);
		$d_details.append($dd_details);
		$details.append($d_details);

		$dd_duration.append($s_duration);
		$d_duration.append($dd_duration);
		$duration.append($d_duration);

		$item.append($icon);
		$item.append($details);
		$item.append($duration);

		$selector.append($item);
	};

	return this;
}