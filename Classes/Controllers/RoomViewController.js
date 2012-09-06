var RoomViewController = function() {
	var self = this;
	self.imageService = null;

	self.createContent = function(){
		self.roomContainer = $(".room-container");
		self.menuContainer = $(".menu-container");
		self.imageService.obtainMenuImages();
	}

	self.assignMenuImages = function(menuImages){
		$.each(menuImages, function(index,value){
			menuLink = self.createMenuLink(value,  index);
			self.menuContainer.append(menuLink);
		});
	}

	self.createMenuLink = function(src, index){
		menuLink = $("<div></div>");
		menuLink.attr("class","menuLink-container");
		menuImage = $("<img>/");
		menuImage.attr("src",src);
		menuLink.append(menuImage);
		menuLink.data("id",index);
		menuLink.bind('click', function(){
			self.onClickMenuLink($(this));
		});
		return menuLink;
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
			$(".image-container").find(".ui-resizable-handle").hide();
			$(this).css({"z-index":"2"});
			$(this).find(".ui-resizable-handle").show();
		});

		return imageContainer;
	}
	self.onClickMenuLink = function(menuLink) {
		self.imageService.obtainImage(menuLink.data("id"))
	}

	self.assignImage = function (src) {
		image = self.createImage(src, 100,100);
		self.roomContainer.append(image);

		image.css({
			"top": (self.roomContainer.height()/2) -image.height(),
			"left":(self.roomContainer.width()/2) -image.width()
		});

		image.find(".ui-resizable-handle").hide();
	}
}