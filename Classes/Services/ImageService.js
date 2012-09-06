var ImageService = function() {
	var self = this;

	self.imageDelegate = null;

	self.menuImages = {
		"0": "http://www.diariothc.com/wp-content/uploads/2010/02/ball-chair.jpg",
		"1":"http://decoracion2.com/imagenes/2009/05/blofield3-300x169.png",
		"2": "http://decoracion2.com/wp-content/uploads/mueble-papel.png"
		};

	self.obtainMenuImages = function(){
		self.imageDelegate.assignMenuImages(self.menuImages);
	}
	self.obtainImage = function(imgID) {
		self.imageDelegate.assignImage(self.menuImages[imgID]);
	}
}