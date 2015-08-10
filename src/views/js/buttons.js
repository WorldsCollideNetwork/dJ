function Buttons(){
	$("a, li").on("click", function(event){
		var $this = $(this),
		    modal = $this.attr("modal");
		if (modal){
			utils.modal(modal);
		}
	});
	
	if (logged_in){

	}

	return this;
}