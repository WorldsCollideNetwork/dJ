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

		queue_utils.check_width();
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
		// colour picker

		function change(colour){
			utils.cookie({
				name: "colour",
				value: colour
			});

			var rgb = utils.rgb(colour);

			rgb.r = rgb.r >= 20 ? rgb.r - 20 : 0;
			rgb.g = rgb.g >= 20 ? rgb.g - 20 : 0;
			rgb.b = rgb.b >= 20 ? rgb.b - 20 : 0;

			utils.cookie({
				name: "shade",
				value: utils.hex(rgb)
			});

			utils.colour(colour, utils.hex(rgb));
		}

		$("input.spectrum").spectrum({
			color: $("span.colour").text(),
			flat: true,
			showButtons: false,
			showInput: true,
			move: function(data){
				change(data.toHexString());
			}
		});

		$("input.sp-input").on("keyup", function(event){
			var colour = $(this).val();

			if (utils.rgb(colour)){
				change(colour);
			}
		});

		$wrapper.draggable();
		$wrapper.resizable();

		$wrapper.on("resize", function(event, ui){
			wrapper_resize();
		});

		wrapper_resize();
	}

	utils.colour($("span.colour").text(), $("span.shade").text());

	return this;
}