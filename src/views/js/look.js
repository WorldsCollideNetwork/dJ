function Look(){
	function wrapper_resize(data){
		var $wrapper = $("div.wrapper");

		if (data){
			$wrapper.css("min-width",  data.width  + "px");
			$wrapper.css("min-height", data.height + "px");
			$wrapper.css("width",      data.width  + "px");
			$wrapper.css("height",     data.height + "px");
		}

		window.w_width  = $wrapper.width();
		window.w_height = $wrapper.height();
	}

	var $window  = $(window);
	    $wrapper = $("div.wrapper");

	var width    = $window.width(),
	    height   = $window.height();

	if (window.params && window.params.popup){
		$window.on("resize", function(event){
			wrapper_resize({
				width:  $(this).width(),
				height: $(this).height()
			});
		});

		wrapper_resize({
			width:  width,
			height: height
		});
	} else {
		$wrapper.draggable();
		$wrapper.resizable();

		$wrapper.on("resize", function(event, ui){
			wrapper_resize();
		});

		wrapper_resize();
	}

	return this;
}