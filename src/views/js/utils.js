function Utils(){
	this.modal = function(name){
		var that = this;

		if ($("div.modal").length > 0 &&
		    $("div.modal.modal-" + name).length > 0 &&
		    $("div.modal.visible").length == 0){
			$("div.wrapper").addClass("modal");
			$("div.screen, div.modal.modal-" + name).addClass("visible");

			$("div.screen").on("click", function(event){
				that.clear_modal();
			});

			setTimeout(function(){
				if ($("div.modal.modal-" + name).find("input").length > 0){
					$($("div.modal.modal-" + name).find("input")[0]).focus();
				}
			}, 500);
		}
	};

	this.clear_modal = function(){
		for (var i = 0; i < $("div.modal").length; i++){
			var $item = $($("div.modal")[i]);

			if ($item.hasClass("visible")){
				$("div.wrapper").removeClass("modal");
				$("div.screen").removeClass("visible");
				$item.removeClass("visible").find("input").val("");

				break;
			}
		}
	};

	this.message = function(text, err){
		var clazz    = "message";

		if (err){
			clazz = "message error";
		}

		var $wrapper = $("div.wrapper > div.messages"),
		    $message = $("<div/>", { "class": clazz }).text(text);

		$wrapper.append($message);

		setTimeout(function(){
			$message.remove();
		}, 3000);
	};

	this.login = function(){
		var $username = $("input.username"),
		    $password = $("input.password");

		if ($username.val() != "" && $password.val() != ""){
			socket.emit("login", {
				username: $username.val(),
				password: $password.val()
			});
		}

		this.clear_modal();
	};

	this.colour = function(colour, shade){
		$("header, div.modal button").css("background-color", colour);
		$("div.modal button").css("box-shadow", "0px 3px 0px " + shade);
	};

	this.view = function(which){
		var current = $("div.current").attr("class").replace("current", "").replace(" ", "");

		switch (current){
			case "search":
				if (which == 1){
					$("div.current").animate({
						left: "-100%"
					}).removeClass("current");

					$("div.queue").animate({
						left: "0px"
					}).addClass("current");
				}

				break;
			case "queue":
				var next = which == 0 ? "search" : "playlist";

				$("div.current").animate({
					left: which == 0 ? "100%" : "-100%"
				}).removeClass("current");

				$("div." + next).animate({
					left: "0px"
				}).addClass("current");

				break;
			case "playlist":
				if (which == 0){
					$("div.current").animate({
						left: "100%"
					}).removeClass("current");

					$("div.queue").animate({
						left: "0px"
					}).addClass("current");
				}

				break;
		}
	};

	this.cookie = function(data){
		if (data.clear){
			document.cookie = data.name + "=dummy; Max-Age=0; path=/";
		} else {
			var date = new Date();

			date.setTime(date.getTime() + (60 * 60 * 24 * 365 * 20 * 1000));
			document.cookie = data.name + "=" + data.value + "; expires=" + date.toGMTString() + "; path=/";
		}
	};

	// source: http://stackoverflow.com/a/21125098
	this.get_cookie = function(){
		match = document.cookie.match(new RegExp(name + "=([^;]+)"));
		
		if (match){
			return match[1];
		} else {
			return undefined;
		}
	};

	// source: http://stackoverflow.com/a/5624139
	this.rgb = function(hex){
		var shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

		hex = hex.replace(shorthand, function(m, r, g, b){
			return r + r + g + g + b + b;
		});

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : undefined;
	};

	// source: http://stackoverflow.com/a/5624139
	this.hex = function(rgb){
		return "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
	};

	return this;
}