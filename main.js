$(document).ready(function(){

	importfile("Classes/Controllers/RoomViewController.js");
	importfile("Classes/Services/ImageService.js");


	window.setTimeout(function(){
		loadImports(main);
	},50);

	var main = function(){
		var roomViewController = new RoomViewController();
		var imageService = new ImageService();

		
		roomViewController.imageService = imageService;
		imageService.imageDelegate = roomViewController;

		roomViewController.createContent();
	}	
});