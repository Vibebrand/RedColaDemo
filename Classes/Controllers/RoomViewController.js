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
		menuImage = $("<img />");
		menuImage.attr("alt","dragImaage");
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

		closeBtn = $("<button></button>");
		closeBtn.attr("class","close-button");
		closeBtn.text("x");
		image = $("<img />");
		image.attr("alt","dragImaage");
		image.attr("src",imageUrl);
		image.height(height);
		image.width(width);
		imageContainer.append(image);
		imageContainer.append(closeBtn);
		closeBtn.hide();
		closeBtn.bind("click", function(){
			$(this).parents(".image-container").remove();
		});

		imageContainer.css({"position":"absolute", "z-index": "1"});

		imageContainer.draggable({
			containment: self.roomContainer
		}).resizable({
			containment: self.roomContainer,
			alsoResize: imageContainer.find('img'),
			handles: 'ne, se, sw, nw'
			});

		self.roomContainer.bind("mousedown", function(event){
			if(!$(event.target).hasClass("ui-resizable-handle") &&
				!$(event.target).hasClass("image-container") &&
				!$(event.target).parents(".image-container").hasClass("image-container")
				)
			{
				$(".image-container").find(".ui-resizable-handle").hide();
				$(".image-container").find(".close-button").hide();
			}

		})

		imageContainer.bind("mousedown", function(){
			$(".image-container").css({"z-index":"1"});
			$(".image-container").find(".ui-resizable-handle").hide();
			$(".image-container").find(".close-button").hide();
			$(this).css({"z-index":"2"});
			$(this).find(".ui-resizable-handle").show();
			$(this).find(".close-button").show();

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