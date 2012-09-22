var PhotoViewController = function() {
	var self = this;
	self.imageService = null;
	self.position = {};
	self.actualLink = null;
	self.actualTimer = null;

	self.createContent = function(){
		self.roomContainer = $(".room-container");
		self.menuContainer = $(".menu-container");
		self.imageService.obtainMenuImages();
	};

	self.assignMenuImages = function(menuImages){
		console.log(menuImages);
		$.each(menuImages, function(index,value){
			menuLink = self.createMenuLink(value,  index);
			self.menuContainer.append(menuLink);
			menuLink.find('img').lazyload();
		});

		self.createMenuButton();
	};

	self.createMenuButton = function(){
		menuBtn = $("<div></div>");
		menuBtn.attr("class","menu-button");
		menuBtn.text("<");
		self.menuContainer.after(menuBtn);

		menuBtn.bind("click", function(){
			self.toggleMenu($(this));
		});
	};
	self.toggleMenu = function(button){
		if(self.menuContainer.is(":visible")){
			self.menuContainer.animate({"width": "0px"},300, function(){
				$(this).hide();
			});
			button.text(">").animate({"margin-left": "0px"},300);
		}else{
			self.menuContainer.show().animate({'width':'120px','display':'block'},300);
			button.text("<").animate({"margin-left": "130px"},300);
		}
	};

	self.createMenuLink = function(src, index){
		menuLink = $("<div></div>");
		menuLink.attr("class","menuLink-container");
		menuImage = $("<img />");
		menuImage.attr("alt","dragImaage");
		menuImage.attr("src",src);
		menuLink.append(menuImage);
		menuLink.data("id",index);
		menuImage.draggable({
			containment: self.roomContainer,
			helper: "clone"
		});
		menuLink.bind('mousedown',function(){
			self.actualLink = $(this);
		});
		menuLink.bind('mouseup',function(){

			self.position = 
			{
				"left" : $(".ui-draggable-dragging").css("left"),
				"top" : $(".ui-draggable-dragging").css("top")
			};

			self.roomContainer.unbind("mousemove");
			self.imageService.obtainImage($(this).data("id"));
		});
		
		return menuLink;
	};
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

		rotateBtn = $("<div></div>");
		rotateBtn.attr("class","rotate-button");
		rotateBtn.text("↻");

		imageContainer.append(image);
		imageContainer.append(turnRight);
		imageContainer.append(turnLeft);
		imageContainer.append(closeBtn);
		imageContainer.append(rotateBtn);

		closeBtn.hide();
		turnRight.hide();
		turnLeft.hide();
		rotateBtn.hide();

		imageContainer.css({
			"height": height,
			"width": width
		});

		image.css({
			"height": height-30,
			"width": width-30,
			"margin-top": (height - (height-30))/2 +"px",
			"margin-left": (width - (width-30))/2 +"px"
		});

		turnRight.bind("mousedown",function(){
			self.actualTurnButton = $(this);
			self.actualTimer = setTimeout(function(){
				self.turnImageRigth(self.actualTurnButton.parents(".image-container").find("img"));
				self.actualTimer = setTimeout(arguments.callee, 70);
			},70);
		});
		turnLeft.bind("mousedown",function(){
			self.actualTurnButton = $(this);
			self.actualTimer = setTimeout(function(){
				self.turnImageLeft(self.actualTurnButton.parents(".image-container").find("img"));
				self.actualTimer = setTimeout(arguments.callee, 70);
			},70);
		});
		closeBtn.bind("click", function(){
			$(this).parents(".image-container").remove();
		});
		

		rotateBtn.bind('mousedown', function(){
			$('.image-container').draggable( 'disable' );
			self.actualImage = $(this).parents('.image-container');
			$(document).bind('mousemove.rotate', function(event){
				self.disableSelection();
				self.rotate(event, self.actualImage);
			});
		});

		$(document).bind('mouseup', function(){
			$(document).unbind('.rotate');
			$('.image-container').draggable( 'enable' );
			self.enableSelection();
		});
		
		$(document).bind("mouseup",function(){
			clearTimeout(self.actualTimer);
		});
		imageContainer.draggable({containment: self.roomContainer}).resizable({
			containment: self.roomContainer,
			alsoResize: imageContainer.find('img'),
			handles: 'ne, se, sw, nw',
			minHeight: 50,
      		minWidth: 50,
      		maxHeight: 400,
      		maxWidth: 400
			});
		self.roomContainer.bind("mousedown", function(event){
			if(!$(event.target).hasClass("ui-resizable-handle") &&
				!$(event.target).hasClass("image-container") &&
				!$(event.target).parents(".image-container").hasClass("image-container")
				)
			{
				$(".image-container").find(".ui-resizable-handle").hide();
				$(".image-container").find(".close-button").hide();
				$(".image-container").find(".rotate-button").hide();
				$(".image-container").find("div[class^='turn']").hide();
			}
		});
		imageContainer.bind("mousedown", function(){
			$(".image-container").css({"z-index":"1"});
			$(".image-container").find(".ui-resizable-handle").hide();
			$(".image-container").find(".close-button").hide();
			$(".image-container").find("div[class^='turn']").hide();
			$(this).css({"z-index":"2"});
			$(this).find(".ui-resizable-handle").show();
			$(this).find(".close-button").show();
			$(this).find(".rotate-button").show();
			$(this).find("div[class^='turn']").show();
		});

		return imageContainer;
	};

	self.disableSelection = function(){
		$("body").css({
			 '-moz-user-select': '-moz-none',
   			'-khtml-user-select': 'none',
   			'-webkit-user-select': 'none',
   			'-ms-user-select': 'none',
   			'user-select': 'none'
		});
	}
	self.enableSelection = function(){
		$("body").removeAttr("style");
	}	

	self.rotate = function(event, image){
		
		var offset = image.offset();
        var center_x = (offset.left) + (image.width()/2);
        var center_y = (offset.top) + (image.height()/2);
        var mouse_x = event.pageX; 
        var mouse_y = event.pageY;
        var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
        var degree = (radians * (180 / Math.PI) * -1) + 90; 

        var origin = image.height()/2+"px "+image.width()/2+"px";
     	self.rotateElement(image, degree, (image.width()/2), origin);
    };
    self.rotateElement = function(element, degree, origin){
    	element.css({
    		 '-moz-transform': 'rotate('+degree+'deg)',
    		 '-webkit-transform': 'rotate('+degree+'deg)',
    		 '-o-transform': 'rotate('+degree+'deg)',
    		 '-ms-transform': 'rotate('+degree+'deg)',

    		webkitTransformOrigin: origin,	
			transformOrigin: origin
    	});
    }

	self.turnImageRigth = function(image){
		num = image.attr("src").split("/")[3].split(".")[0];
		folder = image.attr("src").split("/")[2];

		if(num.length == 2)
			num = num[0] == "0" ?  parseInt(num[1]) :  parseInt(num);
		
		num = num-1;
		num = num < 1? 10: num;
		image.attr("src","Resources/Draggables/"+folder+"/"+self.addZero(num)+".png");
	};
	self.turnImageLeft = function(image){
		num = image.attr("src").split("/")[3].split(".")[0];
		folder = image.attr("src").split("/")[2];

		if(num.length == 2)
			num = num[0] == "0" ?  parseInt(num[1]) :  parseInt(num);

		num++;
		num = num > 10 ? 1: num;
		image.attr("src","Resources/Draggables/"+folder+"/"+self.addZero(num)+".png");
	};
	self.onClickMenuLink = function(menuLink) {
		$(".image-container").css({"z-index":"1"});
		self.imageService.obtainImage(menuLink.data("id"))
	};
	self.assignImage = function (src) {
		imageContainer = self.createImage(src, 130,130);
		self.roomContainer.append(imageContainer);
		if(self.position.left && self.position.top){
			imageContainer.css(self.position);
			imageContainer.css({"top": "-=15px", "left": "-=15px",'position': 'absolute'});
		}
		else
			imageContainer.css({"top": "200px", "left": "200px",'position': 'absolute'});

		imageContainer.find(".ui-resizable-handle").hide();
		imageContainer.find('img').lazyload();
	};
	self.addZero = function(num){
		stringNum = String(num)
		if(stringNum.length < 2){
			return String("0"+""+stringNum);
		}else
			return stringNum;	
	};
}