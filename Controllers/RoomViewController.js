var RoomViewController = function() {
	var self = this;

	self.createContent = function(){
		self.roomContainer = $(".room-container");
		image1 = self.createImage(
			"http://www.diariothc.com/wp-content/uploads/2010/02/ball-chair.jpg",
			"100px",
			"100px"
			);
		image2 = self.createImage(
			"http://www.diariothc.com/wp-content/uploads/2010/02/ball-chair.jpg",
			"100px",
			"100px"
			);
		self.roomContainer.append(image1);
		self.roomContainer.append(image2);
	}

	self.createImage = function(imageUrl,height,width){
		imageContainer = $("<div></div>");
		imageContainer.attr("class","image-container");
		image = $("<img/>");
		image.attr("src",imageUrl);
		image.height(height);
		image.width(width);
		imageContainer.append(image);
		imageContainer.css({"position":"absolute"});

		imageContainer.draggable().resizable({
			alsoResize: imageContainer.find('img'),
			handles: 'n, e, s, w, ne, se, sw, nw'
			});
		return imageContainer;
	}

}