(function() {
	var width = 800,
	height = 700;
	var counter = 0;	
	var svg = d3.select("#marketchart")
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)")	
	var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collide", d3.forceCollide( function(d) {
                return radiusScale(d.sales)+2
            }))
    
    var defs = svg.append("defs");
    
    var radiusScale = d3.scaleSqrt().domain([10,90]).range([10,50])
    
	d3.queue()
		.defer(d3.csv, "indmarket.csv")
		.await(ready)
		
	function ready (error, datapoints) {
		
		var circles = svg.selectAll(".artist")
			.data(datapoints)
			.enter().append("circle")
			.attr("class", "artist")
			.attr("r", function(d) {
                return radiusScale(d.sales)
            })
			.attr("fill", function(d){
                if (d.type == 1)
                    return "#1abc9c";                   
                else if (d.type == 2)
                    return "#f39c12";
                else if (d.type == 3)
                    return "#3498db";
                else if (d.type == 4)
                    return "#9b59b6";
                else if (d.type == 5)
                    return "#e74c3c";
            }) 
            .on("mouseover", function(d){
                tooltip.text(d.name);
                tooltip.style("text", "black");
                return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-85+"px").style("left",(d3.event.pageX+10)-110+"px");})
        .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
        .on("click", function () {counter+=1;})
	
      var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("height", 80)
    .style("width", 200)
    .style("transition-timing-function", "ease-in")
    .style("text-align", "center")
    .style("background-color", "white")
    .style("text", "red")
    .style("z-index", "10")
    .style("border-radius", "7px")
    .style("border", "1px solid black")
    .style("visibility", "hidden")
    .style("font-size", "20px")
    .style("font-family", "VERDANA")
    .style("margin-top","0px")
    .text("YELLO");
        
        
        
	simulation.nodes(datapoints)
		.on('tick', ticked)
	
	function ticked() {
		circles
			.attr("cx", function(d) {return d.x })
			.attr("cy", function(d) {return d.y })
    }
	}
	d3.select("#combine").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                 return width / 2;
                                  }))
             .force("y", d3.forceY(function (d){
                                 return width / 2;
                                  }))
            .alphaTarget(0.05)
            .restart()
    })
    d3.select("#distribute").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.type == '1')
                                    return 150;
                                  else if(d.type == '2')
                                    return 650;
                                  else if(d.type == '3')
                                    return 400;
                                  else if(d.type == '4')
                                    return 150;
                                  else if(d.type == '5')
                                    return 650;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.type == '1')
                                    return 150;
                                  else if(d.type == '2')
                                    return 150;
                                  else if(d.type == '3')
                                    return 350;
                                  else if(d.type == '4')
                                    return 550;
                                  else if(d.type == '5')
                                    return 550;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#markbtn").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.type == '1')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.type == '1')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#custbtn").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.type == '2')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.type == '2')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#needbtn").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.type == '3')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.type == '3')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#expebtn").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.type == '4')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.type == '4')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#other1btn").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.type == '5')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.type == '5')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
})();
(function() {
	var width = 800,
	height = 700;
		
	var svg = d3.select("#delivchart")
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)")	
	var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collide", d3.forceCollide( function(d) {
                return radiusScale(d.sales)+2
            }))
    
    var defs = svg.append("defs");
    
    var radiusScale = d3.scaleSqrt().domain([10,90]).range([10,50])
    
    defs.append("pattern")
        .attr("id", "realbubble")
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", "realbubble.png");
    
	d3.queue()
		.defer(d3.csv, "sales.csv")
		.await(ready)
		
	function ready (error, datapoints) {
		
		var circles = svg.selectAll(".artist")
			.data(datapoints)
			.enter().append("circle")
			.attr("class", "artist")
			.attr("r", function(d) {
                return radiusScale(d.sales)
            })
			.attr("fill", "url(#realbubble)") 
            .on("mouseover", function(d){
                tooltip.text(d.name)
                return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-85+"px").style("left",(d3.event.pageX+10)-110+"px");})
        .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
	
      var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("height", 80)
    .style("width", 200)
    .style("transition-timing-function", "ease-in")
    .style("text-align", "center")
    .style("background-color", "white")
    .style("text", "red")
    .style("z-index", "10")
    .style("border-radius", "7px")
    .style("border", "1px solid black")
    .style("visibility", "hidden")
    .style("font-size", "20px")
    .style("font-family", "VERDANA")
    .style("margin-top","0px")
    .style("color", "black")
    .text("YELLO");
        
        
        
	simulation.nodes(datapoints)
		.on('tick', ticked)
	
	function ticked() {
		circles
			.attr("cx", function(d) {return d.x })
			.attr("cy", function(d) {return d.y })
    }
	}
	
})();
(function() {
	var width = 800,
	height = 700;
		
	var svg = d3.select("#offchart")
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)")	
	var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collide", d3.forceCollide( function(d) {
                return radiusScale(d.sales)+2
            }))
    
    var defs = svg.append("defs");
    
    var radiusScale = d3.scaleSqrt().domain([10,90]).range([10,50])
    
    defs.append("pattern")
        .attr("id", "realbubble")
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", "realbubble.png");
    
	d3.queue()
		.defer(d3.csv, "sales.csv")
		.await(ready)
		
	function ready (error, datapoints) {
		
		var circles = svg.selectAll(".artist")
			.data(datapoints)
			.enter().append("circle")
			.attr("class", "artist")
			.attr("r", function(d) {
                return radiusScale(d.sales)
            })
			.attr("fill", "url(#realbubble)") 
            .on("mouseover", function(d){
                tooltip.text(d.name)
                return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-85+"px").style("left",(d3.event.pageX+10)-110+"px");})
        .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
	
      var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("height", 80)
    .style("width", 200)
    .style("transition-timing-function", "ease-in")
    .style("text-align", "center")
    .style("background-color", "white")
    .style("text", "red")
    .style("z-index", "10")
    .style("border-radius", "7px")
    .style("border", "1px solid black")
    .style("visibility", "hidden")
    .style("font-size", "20px")
    .style("font-family", "VERDANA")
    .style("margin-top","0px")
    .text("YELLO");
        
        
        
	simulation.nodes(datapoints)
		.on('tick', ticked)
	
	function ticked() {
		circles
			.attr("cx", function(d) {return d.x })
			.attr("cy", function(d) {return d.y })
    }
	}
	
})();
(function() {
	var width = 800,
	height = 700;
		
	var svg = d3.select("#bmodchart")
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)")	
	var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collide", d3.forceCollide( function(d) {
                return radiusScale(d.sales)+2
            }))
    
    var defs = svg.append("defs");
    
    var radiusScale = d3.scaleSqrt().domain([10,90]).range([10,50])
    
    defs.append("pattern")
        .attr("id", "realbubble")
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", "realbubble.png");
    
	d3.queue()
		.defer(d3.csv, "sales.csv")
		.await(ready)
		
	function ready (error, datapoints) {
		
		var circles = svg.selectAll(".artist")
			.data(datapoints)
			.enter().append("circle")
			.attr("class", "artist")
			.attr("r", function(d) {
                return radiusScale(d.sales)
            })
			.attr("fill", "url(#realbubble)") 
            .on("mouseover", function(d){
                tooltip.text(d.name)
                return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-85+"px").style("left",(d3.event.pageX+10)-110+"px");})
        .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
	
      var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("height", 80)
    .style("width", 200)
    .style("transition-timing-function", "ease-in")
    .style("text-align", "center")
    .style("background-color", "white")
    .style("text", "red")
    .style("z-index", "10")
    .style("border-radius", "7px")
    .style("border", "1px solid black")
    .style("visibility", "hidden")
    .style("font-size", "20px")
    .style("font-family", "VERDANA")
    .style("margin-top","0px")
    .text("YELLO");
        
        
        
	simulation.nodes(datapoints)
		.on('tick', ticked)
	
	function ticked() {
		circles
			.attr("cx", function(d) {return d.x })
			.attr("cy", function(d) {return d.y })
    }
	}
	
})();
(function() {
	var width = 800,
	height = 700;
		
	var svg = d3.select("#prodchart")
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)")	
	var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collide", d3.forceCollide( function(d) {
                return radiusScale(d.sales)+2
            }))
    
    var defs = svg.append("defs");
    
    var radiusScale = d3.scaleSqrt().domain([10,90]).range([10,50])
    
    defs.append("pattern")
        .attr("id", "realbubble")
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", "realbubble.png");
    
	d3.queue()
		.defer(d3.csv, "indmarket.csv")
		.await(ready)
		
	function ready (error, datapoints) {
		
		var circles = svg.selectAll(".artist")
			.data(datapoints)
			.enter().append("circle")
			.attr("class", "artist")
			.attr("r", function(d) {
                return radiusScale(d.sales)
            })
			.attr("fill", "url(#realbubble)") 
            .on("mouseover", function(d){
                tooltip.text(d.name)
                return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-85+"px").style("left",(d3.event.pageX+10)-110+"px");})
        .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
	
      var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("height", 80)
    .style("width", 200)
    .style("transition-timing-function", "ease-in")
    .style("text-align", "center")
    .style("background-color", "white")
    .style("text", "red")
    .style("z-index", "10")
    .style("border-radius", "7px")
    .style("border", "1px solid black")
    .style("visibility", "hidden")
    .style("font-size", "20px")
    .style("font-family", "VERDANA")
    .style("margin-top","0px")
    .text("YELLO");
        
        
        
	simulation.nodes(datapoints)
		.on('tick', ticked)
	
	function ticked() {
		circles
			.attr("cx", function(d) {return d.x })
			.attr("cy", function(d) {return d.y })
    }
	}

})();


