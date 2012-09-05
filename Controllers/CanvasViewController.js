var  CanvasViewController = function(){
	var self = this;

	self.images ={};
	self.imageCount = 0;
	self.loadedImages = 0;

	self.createContent = function(){
		imagesLinks = {
				          darthVader: "http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg",
				          yoda: "http://www.html5canvastutorials.com/demos/assets/yoda.jpg"
				       };

		self.loadImages(imagesLinks);
	}
	self.loadImages = function(imagesLinks){
		self.imageCount = Object.keys(imagesLinks).length
		
		for(src in imagesLinks){
			self.images[src] = new Image()
			self.images[src].src = imagesLinks[src];

			self.images[src].onload = function(){
				self.loadedImages ++;
				if(self.loadedImages >= self.imageCount)
					self.initStage();
			}
		}

	}

	self.initStage = function(){
		var stage = new Kinetic.Stage({
          container: "container",
          width: 578,
          height: 400
        });
        var darthVaderGroup = new Kinetic.Group({
          x: 270,
          y: 100,
          draggable: true
        });
       var yodaGroup = new Kinetic.Group({
          x: 100,
          y: 110,
          draggable: true
        });
        layer = new Kinetic.Layer();


        layer.add(darthVaderGroup);
        layer.add(yodaGroup);
        stage.add(layer);

        var darthVaderImg = new Kinetic.Image({
          x: 0,
          y: 0,
          image: self.images.darthVader,
          width: 200,
          height: 138,
          name: "image"
        });

        var yodaImg = new Kinetic.Image({
          x: 0,
          y: 0,
          image: self.images.yoda,
          width: 93,
          height: 104,
          name: "image"
        });

        

        darthVaderGroup.add(darthVaderImg);
        self.addAnchor(darthVaderGroup, 0, 0, "topLeft");
        self.addAnchor(darthVaderGroup, 200, 0, "topRight");
        self.addAnchor(darthVaderGroup, 200, 138, "bottomRight");
        self.addAnchor(darthVaderGroup, 0, 138, "bottomLeft");

        yodaGroup.add(yodaImg);
        self.addAnchor(yodaGroup, 0, 0, "topLeft");
        self.addAnchor(yodaGroup, 93, 0, "topRight");
        self.addAnchor(yodaGroup, 93, 104, "bottomRight");
        self.addAnchor(yodaGroup, 0, 104, "bottomLeft");



        darthVaderGroup.on("dragstart", function() {
          this.moveToTop();
        });

        yodaGroup.on("dragstart", function() {
          this.moveToTop();
        });

        stage.draw();
	}

	self.addAnchor = function(group, x, y, name){
		var stage = group.getStage();
        var layer = group.getLayer();

        
        var anchor = new Kinetic.Circle({
          x: x,
          y: y,
          stroke: "#666",
          fill: "#ddd",
          strokeWidth: 2,
          radius: 8,
          name: name,
          draggable: true
        });

        anchor.on("dragmove", function() {
          self.update(group, this);
          layer.draw();
        });
        anchor.on("mousedown touchstart", function() {
          group.setDraggable(false);
          this.moveToTop();
        });
        anchor.on("dragend", function() {
          group.setDraggable(true);
          layer.draw();
        });
   
        anchor.on("mouseover", function() {
          var layer = this.getLayer();
          document.body.style.cursor = "pointer";
          this.setStrokeWidth(4);
          layer.draw();
        });
        anchor.on("mouseout", function() {
          var layer = this.getLayer();
          document.body.style.cursor = "default";
          this.setStrokeWidth(2);
          layer.draw();
        });

        group.add(anchor);

	}

	self.update = function(group, activeAnchor){

		var topLeft = group.get(".topLeft")[0];
        var topRight = group.get(".topRight")[0];
        var bottomRight = group.get(".bottomRight")[0];
        var bottomLeft = group.get(".bottomLeft")[0];
        var image = group.get(".image")[0];

        

        switch (activeAnchor.getName()) {
          case "topLeft":
            topRight.attrs.y = activeAnchor.attrs.y;
            bottomLeft.attrs.x = activeAnchor.attrs.x;
            break;
          case "topRight":
            topLeft.attrs.y = activeAnchor.attrs.y;
            bottomRight.attrs.x = activeAnchor.attrs.x;
            break;
          case "bottomRight":
            bottomLeft.attrs.y = activeAnchor.attrs.y;
            topRight.attrs.x = activeAnchor.attrs.x;
            break;
          case "bottomLeft":

            bottomRight.attrs.y = activeAnchor.attrs.y;
            topLeft.attrs.x = activeAnchor.attrs.x;

           console.log(bottomRight.attrs.y);
          console.log(topLeft.attrs.x);
            break;
        }

       
        var width = topRight.attrs.x - topLeft.attrs.x;
        var height = bottomLeft.attrs.y - topLeft.attrs.y;

        width = (width < 0 ? 0 : width );
        height = (height < 0 ? 0 : height);

        if(width > 0  && height > 0) {
          image.setSize(width, height);
          image.setPosition(topLeft.attrs.x, topLeft.attrs.y);
        }

	}



}