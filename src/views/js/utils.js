function Utils(){
	this.modal = function(name){
		var that = this;

		if ($("div.modal").length > 0 &&
		    $("div.modal.modal-" + name).length > 0 &&
		    $("div.modal.visible").length == 0){
			$("div.wrapper").addClass("modal");
			$("div.screen, div.modal.modal-" + name).addClass("visible");

			$("div.screen").on("click", function(event){
				that.clear_modal(name);
			});
		}
	};

	this.clear_modal = function(name){
		$("div.wrapper").removeClass("modal");
		$("div.screen, div.modal.modal-" + name).removeClass("visible");
	};

	this.login = function(){
		socket.emit("login", {
			username: $("input.username").val(),
			password: $("input.password").val()
		});
	};

	return this;
}