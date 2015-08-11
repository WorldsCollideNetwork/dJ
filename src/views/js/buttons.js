function Buttons(){
	// navigation bar buttons
	$("a, li").on("click", function(event){
		var $this = $(this),
		    modal = $this.attr("modal");
		if (modal){
			utils.modal(modal);
		}
	});

	if (logged_in){
		$("li[name='search']").on("click", function(event){

		});

		$("li[name='drop']").on("click", function(event){
			
		});

		$("li[name='veto']").on("click", function(event){
			
		});
	}

	// modal buttons

	if (logged_in){
		// custom title modal

		$("input.title").on("keydown", function(event){
			if (event.which == 13){
				queue.add_request(window.temp_url, $(this).val());
				utils.clear_modal("title");
				
				window.temp_url = undefined;
			}
		});
	} else {
		// login modal

		$("input.username, input.password").on("keydown", function(event){
			if (event.which == 13){
				utils.login();
			}
		});

		$("button[name='login']").on("click", function(event){
			utils.login();
		});
	}

	return this;
}