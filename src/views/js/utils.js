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

			setTimeout(function(){
				$("div.modal.modal-" + name).find("input").focus();
			}, 1500);
		}
	};

	this.clear_modal = function(name){
		$("div.wrapper").removeClass("modal");
		$("div.screen, div.modal.modal-" + name).removeClass("visible");

		$("div.modal.modal-" + name).find("input").val("");
	};

	this.login = function(){
		var $username = $("input.username"),
		    $password = $("input.password");

		if ($username.val() != "" && $password.val() != ""){
			socket.emit("login", {
				username: $username.val(),
				password: $password.val()
			});
		}
	};

	return this;
}