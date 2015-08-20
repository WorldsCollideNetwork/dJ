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
		// popup button
		$("div.popup").on("click", function(event){
			window.open(
				"http://" + window.location.hostname + "/?popup=1",
				$("title").text(),
				"width=" + window.w_width + ",height=" + window.w_height
			);
		});

		// colour button

		$("div.colour > i").on("click", function(event){
			$("div.colour > div.sp-container").toggleClass("visible");
		});

		$(document).on("click", function(event){
			if (event.target.className != "fa fa-paint-brush"){
				var picker = $("div.colour > div.sp-container");
				if (picker.is(":visible")) picker.removeClass("visible");
			}
		});

		// logout dropdown
		$("a[name='Logout']").on("click", function(event){
			socket.emit("logout");
		});

		// force client reload dropdown
		$("a[name='Force Reload']").on("click", function(event){
			socket.emit("reload");
		});

		// search button
		$("li[name='search']").on("click", function(event){
			// TODO add search calls
		});
		
		// add button
		$("li[name='add']").on("click", function(event){
			utils.modal("add");
		});

		// drop button
		$("li[name='drop']").on("click", function(event){
			queue.drop_request();
		});

		// veto button
		$("li[name='veto']").on("click", function(event){
			queue.veto_request();
		});

		// adding via pasting event
		$(document).on("paste", function(event){
			if (!$("body").hasClass("no_paste") && event.target.localName != "input"){
				var text = (event.originalEvent || event).clipboardData.getData('text/plain');

				if (text.endsWith(".mp3")){
					window.temp_url = text;
					utils.modal("title");
				} else {
					queue.add_request(text);
				}

				event.preventDefault();
			}	
		});
	}

	// modals

	// exit modal key
	$(document).on("keydown", function(event){
		if (event.which == 27 && $("div.wrapper").hasClass("modal")){
			utils.clear_modal();
		}
	});

	if (logged_in){
		// add modal

		function add_callback(){
			var $link  = $("div.modal-add input.link"),
			    $title = $("div.modal-add input.title");

			if ($link.val() != ""){
				var title = undefined;

				if ($title.val() != ""){
					title = $title.val();
				}
				
				queue.add_request($link.val(), title);
			}

			utils.clear_modal();
		}

		$("div.modal-add input.link, div.modal-add input.title").on("keydown", function(event){
			if (event.which == 13){
				add_callback();
			}
		});

		$("div.modal-add button[name='add request']").on("click", function(event){
			add_callback();
		});

		// custom title modal

		function title_callback(){
			var title    = undefined,
			    $input   = $("div.modal-title input.title");

			if ($input.val() != ""){
				title = $input.val();
			}

			queue.add_request(window.temp_url, title);
			utils.clear_modal();
		}

		$("div.modal-title input.title").on("keydown", function(event){
			if (event.which == 13){
				title_callback();
			}
		});

		$("div.modal-title button[name='add request']").on("click", function(event){
			title_callback();
		});
	} else {
		// login modal

		$("div.modal-login input.username, div.modal-login input.password").on("keydown", function(event){
			if (event.which == 13){
				utils.login();
			}
		});

		$("div.modal-login button[name='login']").on("click", function(event){
			utils.login();
		});
	}

	return this;
}