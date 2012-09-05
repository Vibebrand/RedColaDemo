var RoomViewController = function() {
	var self = this;
	self.roomContainer = null;
	self.actualImage = null;


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
		imageContainer.css({
			'border':'1px solid black', 
			'height' : height, 
			'width': width,
			'position': 'absolute',
			'index-z': '1'
		});
		imageContainer.append(image);

		$(document).bind('mouseup', function(){
			$(document).unbind('mousemove');
		});

		imageContainer.bind('mousedown', function(event){
			self.actualImage = $(this);
			event.preventDefault();
			$(document).unbind('mousemove');
			$(document).bind('mousemove',function(event){
				self.moveImageContainer(event);
			});

			return false;
		});
		return imageContainer;
	}
	self.moveImageContainer = function(event){
		$(".image-container").css({'z-index': '1'});
		self.actualImage.css({'z-index': '2'});
		self.validateHorizontal(event);
		self.validateVertical(event);
	}
	self.validateVertical = function(event){
		distanceY = event.pageY - self.roomContainer.offset().top;
		limitY = self.roomContainer.height() + self.roomContainer.offset().top;
		if(event.pageY - self.actualImage.height()/2 <= 
			self.roomContainer.offset().top - self.actualImage.height()/2){
			self.actualImage.css({'margin-top': -self.actualImage.height()/2});
			return true
		}
		if(event.pageY <= limitY){
			self.actualImage.css({'margin-top': distanceY - self.actualImage.height()/2});
			return true;
		}	
		if(event.pageY > limitY){
			self.actualImage.css({'margin-top': limitY -self.roomContainer.offset().top - self.actualImage.height()/2});
			return true;
		}
	}
	self.validateHorizontal = function(event){
		limitX = self.roomContainer.width() + self.roomContainer.offset().left;
		distanceX = event.pageX-self.roomContainer.offset().left;
		if(event.pageX - self.actualImage.width()/2 <= 
			self.roomContainer.offset().left-self.actualImage.width()/2){
			self.actualImage.css({'margin-left': -self.actualImage.width()/2});
			return true;
		}
		if(event.pageX <= limitX){
			self.actualImage.css({'margin-left': distanceX - self.actualImage.width()/2});
			return true;
		}
		if(event.pageX > limitX){
			self.actualImage.css({'margin-left': limitX -self.roomContainer.offset().left - self.actualImage.width()/2});
			return true;
		}
	}
}