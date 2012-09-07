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
		menuLink.mousedown("mousedown", function(){
			
		});
		menuLink.bind('mouseup', function(event){

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
			"z-index": "2"
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
		num = image.attr("src").split("/")[3].split(".")[0];
		folder = image.attr("src").split("/")[2];

		if(num.length == 2)
			num = num[0] == "0" ?  parseInt(num[1]) :  parseInt(num);
		
		num = num-1;
		num = num < 1? 10: num;
		image.attr("src","Resources/Room/"+folder+"/"+self.addZero(num)+".png");
	}	
	self.turnImageLeft = function(image){
		num = image.attr("src").split("/")[3].split(".")[0];
		folder = image.attr("src").split("/")[2];

		if(num.length == 2)
			num = num[0] == "0" ?  parseInt(num[1]) :  parseInt(num);

		num++;
		num = num > 10 ? 1: num;
		image.attr("src","Resources/Room/"+folder+"/"+self.addZero(num)+".png");
	}

	self.onClickMenuLink = function(menuLink) {
		$(".image-container").css({"z-index":"1"});
		self.imageService.obtainImage(menuLink.data("id"))
	}

	self.assignImage = function (src) {
		image = self.createImage(src, 100,100);
		self.roomContainer.append(image);

		image.css({
			"top": 0,
			"left":0
		});
		image.find(".ui-resizable-handle").hide();
		image.trigger("mousedown");
	}

	self.addZero = function(num)
	{
		stringNum = String(num)
		if(stringNum.length < 2){
			return String("0"+""+stringNum)
		}else
			return stringNum;	
	}
}