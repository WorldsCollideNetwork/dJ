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
		// popup button

		$("div.popup").on("click", function(event){
			popup();
		});
		
		// custom title modal

		function callback(){
			var title    = undefined,
			    temp_url = undefined,
			    $input   = $("input.title");

			if ($input.val() != ""){
				title = $input.val();
			}

			queue.add_request(window.temp_url, title);
			utils.clear_modal("title");
		}

		$("input.title").on("keydown", function(event){
			if (event.which == 13){
				callback();
			}
		});

		$("button[name='add request']").on("click", function(event){
			callback();
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