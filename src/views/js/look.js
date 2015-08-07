function Look(){
	return {
		first_run: function(params){
			var $wrapper = $("div.wrapper");

			var width    = $(window).width(),
			    height   = $(window).height();

			if (params && params.popup){
				$wrapper.css("min-width",  width  + "px");
				$wrapper.css("min-height", height + "px");
				$wrapper.css("width",      width  + "px");
				$wrapper.css("height",     height + "px");
			} else {
				$wrapper.draggable();
				$wrapper.resizable();
			}
		}
	};
}