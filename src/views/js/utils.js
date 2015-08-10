function Utils(){
	this.modal = function(name){
		if ($("div.modal").length > 0 && $("div.modal.modal-" + name).length > 0){
			$("div.wrapper").addClass("modal");
			$("div.screen, div.modal.modal-" + name).addClass("visible");

			$("div.screen").on("click", function(event){
				$("div.wrapper").removeClass("modal");
				$("div.screen, div.modal.modal-" + name).removeClass("visible");
			});
		}
	};

	return this;
}