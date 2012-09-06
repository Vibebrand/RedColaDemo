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
		imageContainer.css({"position":"absolute", "z-index": "1"});

		imageContainer.draggable({
			containment: self.roomContainer
		}).resizable({
			containment: self.roomContainer,
			alsoResize: imageContainer.find('img'),
			handles: 'ne, se, sw, nw'
			});

		imageContainer.bind("mousedown", function(){
			$(".image-container").css({"z-index":"1"});
			$(this).css({"z-index":"2"});
		});

		return imageContainer;
	}

}