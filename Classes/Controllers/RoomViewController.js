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

		image = $("<img />");
		image.attr("alt","dragImaage");
		image.attr("src",imageUrl);
		
		turnRight = $("<div></div>");
		turnLeft = $("<div></div>");

		turnRight.attr("class","turnRight-button");
		turnLeft.text("⇠");
		turnRight.text("⇢");
		turnLeft.attr("class","turnLeft-button");
		
		closeBtn = $("<button></button>");
		closeBtn.attr("class","close-button");
		closeBtn.text("x");

		imageContainer.append(image);
		imageContainer.append(turnRight);
		imageContainer.append(turnLeft);
		imageContainer.append(closeBtn);



		turnRight.bind('click',function(){
			self.turnImageRigth($(this).parents(".image-container").find("img"));
		});
		turnLeft.bind('click',function(){
			self.turnImageLeft($(this).parents(".image-container").find("img"));
		});

		closeBtn.hide();
		turnRight.hide();
		turnLeft.hide();
		closeBtn.bind("click", function(){
			$(this).parents(".image-container").remove();
		});
		imageContainer.css({
			"height": height,
			"width": width,
			"position":"absolute", 
			"z-index": "1"
		});
		image.css({
			"height": height-30,
			"width": width-30,
			"margin-top": (height - (height-30))/2 +"px",
			"margin-left": (width - (width-30))/2 +"px"
		});
		imageContainer.draggable({
			containment: self.roomContainer
		}).resizable({
			containment: self.roomContainer,
			alsoResize: imageContainer.find('img'),
			handles: 'ne, se, sw, nw',
			minHeight: 50,
      		minWidth: 50
			});

		self.roomContainer.bind("mousedown", function(event){
			if(!$(event.target).hasClass("ui-resizable-handle") &&
				!$(event.target).hasClass("image-container") &&
				!$(event.target).parents(".image-container").hasClass("image-container")
				)
			{
				$(".image-container").find(".ui-resizable-handle").hide();
				$(".image-container").find(".close-button").hide();
				$(".image-container").find("div[class^='turn']").hide();
			}
		})
		imageContainer.bind("mousedown", function(){
			$(".image-container").css({"z-index":"1"});
			$(".image-container").find(".ui-resizable-handle").hide();
			$(".image-container").find(".close-button").hide();
			$(".image-container").find("div[class^='turn']").hide();
			$(this).css({"z-index":"2"});
			$(this).find(".ui-resizable-handle").show();
			$(this).find(".close-button").show();
			$(this).find("div[class^='turn']").show();
		});

		return imageContainer;
	}

	self.turnImageRigth = function(image){
		number = parseInt(image.attr("src").split("/")[3].split(".")[0]);
		folder = image.attr("src").split("/")[2];

		number --;

		number = number < 1 ? 36: number;

		image.attr("src","Resources/Room/"+folder+"/"+number+".png");
	}
	self.turnImageLeft = function(image){
		number = parseInt(image.attr("src").split("/")[3].split(".")[0]);
		folder = image.attr("src").split("/")[2];

		number++;

		number = number > 36 ? 1: number;

		image.attr("src","Resources/Room/"+folder+"/"+number+".png");
	}

	self.onClickMenuLink = function(menuLink) {
		self.imageService.obtainImage(menuLink.data("id"))
	}

	self.assignImage = function (src) {
		image = self.createImage(src, 200,200);
		self.roomContainer.append(image);

		image.css({
			"top": (self.roomContainer.height()/2) -image.height()/2,
			"left":(self.roomContainer.width()/2) -image.width()/2
		});

		image.find(".ui-resizable-handle").hide();
	}
}