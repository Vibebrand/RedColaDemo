var ImageService = function() {
	var self = this;

	self.imageDelegate = null;
	self.folderImages = {
		"0":"Phone",
		"1":"Chair",
		"2":"PS3"
	};

	self.obtainMenuImages = function(){
		$.each(self.folderImages, function(index,value){
			self.menuImages =  {  index :"Resources/Draggables/"+value+"/01.png" };
		});
		self.imageDelegate.assignMenuImages(self.menuImages);
	};
	self.obtainImage = function(imgID) {
		self.imageDelegate.assignImage(self.menuImages[imgID]);
	};
}