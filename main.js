$(document).ready(function(){

	importfile("Controllers/RoomViewController.js");

	window.setTimeout(function(){
		loadImports(main);
	},50);

	var main = function(){
		var roomViewController = new RoomViewController();

		roomViewController.createContent();
	}	
});