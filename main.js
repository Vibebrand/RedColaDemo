$(document).ready(function(){

	importfile("Controllers/CanvasViewController.js");

	window.setTimeout(function(){
		loadImports(main);
	},50);

	var main = function(){
		var canvasViewController = new CanvasViewController();

		canvasViewController.createContent();
	}	
});