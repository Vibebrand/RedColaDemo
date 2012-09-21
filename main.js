$(document).ready(function(){

	importfile("Classes/Controllers/PhotoViewController.js");
	importfile("Classes/Services/ImageService.js");


	window.setTimeout(function(){
		loadImports(main);
	},50);

	var main = function(){
		var photoViewController = new PhotoViewController();
		var imageService = new ImageService();

		
		photoViewController.imageService = imageService;
		imageService.imageDelegate = photoViewController;

		photoViewController.createContent();
	}	
});