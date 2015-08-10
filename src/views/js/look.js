function Look(){
	this.first_run = function(){
		var $window  = $(window);
		    $wrapper = $("div.wrapper");

		var width    = $window.width(),
		    height   = $window.height();

		var that     = this;

		if (window.params && window.params.popup){
			$window.on("resize", function(event){
				that.wrapper_resize({
					width:  $(this).width(),
					height: $(this).height()
				});
			});

			that.wrapper_resize({
				width:  width,
				height: height
			});
		} else {
			$wrapper.draggable();
			$wrapper.resizable();

			$wrapper.on("resize", function(event, ui){
				that.wrapper_resize();
			});

			this.wrapper_resize();
		}

		// register events

		$("div.popup").on("click", function(event){
			that.popup();
		});
	};

	this.wrapper_resize = function(data){
		var $wrapper = $("div.wrapper");

		if (data){
			$wrapper.css("min-width",  data.width  + "px");
			$wrapper.css("min-height", data.height + "px");
			$wrapper.css("width",      data.width  + "px");
			$wrapper.css("height",     data.height + "px");
		}

		window.w_width  = $wrapper.width();
		window.w_height = $wrapper.height();
	};

	this.popup = function(){
		window.open(
			"http://localhost/?popup=1",
			$("title"),
			"width=" + window.w_width + ",height=" + window.w_height
		);
	};

	return this;
}