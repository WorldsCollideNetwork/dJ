function dJ(){
	this.add = function(data){
		require("./info")(data, function(err, info){
			console.log(err);
			console.log(info);
		});
	};

	return this;
}

module.exports = dJ();