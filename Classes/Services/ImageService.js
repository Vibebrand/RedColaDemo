var ImageService = function() {
	var self = this;

	self.imageDelegate = null;
	self.folderImages = {
		"0":"Phone",
	}	

	self.obtainMenuImages = function(){
		$.each(self.folderImages, function(index,value){
			self.menuImages =  {  index :"Resources/Room/"+value+"/01.png" }
		});
		self.imageDelegate.assignMenuImages(self.menuImages);
	}
	self.obtainImage = function(imgID) {
		self.imageDelegate.assignImage(self.menuImages[imgID]);
	}
}