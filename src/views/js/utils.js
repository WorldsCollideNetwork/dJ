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
				if ($("div.modal.modal-" + name).find("input").length > 0){
					$($("div.modal.modal-" + name).find("input")[0]).focus();
				}
			}, 500);
		}
	};

	this.clear_modal = function(name){
		$("div.wrapper").removeClass("modal");
		$("div.screen, div.modal.modal-" + name).removeClass("visible");

		$("div.modal.modal-" + name).find("input").val("");
	};

	this.message = function(text, err){
		var clazz    = "message";

		if (err){
			clazz = "message error";
		}

		var $wrapper = $("div.wrapper"),
		    $message = $("<div/>", { "class": clazz }).text(text);

		$wrapper.prepend($message);

		setTimeout(function(){
			$message.remove();
		}, 3000);
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

		this.clear_modal("login");
	};

	return this;
}