var connect = d3.select("#connect_dots")
		.append("svg")
		.attr("height", "2000")
		.attr("width", "700")
        .attr("id", "connectdiv")
		.append("g")
		.attr("transform", "translate(0,0)");
    
    var cat_array = {};
    var subcat_array = {};
    var select_array = {};
    var color_array = {};
    var text_array = {};
    var counter = {};
    var plot_array = {};
    var pindex = 0;
    var index = 0;
    var maxlen = 0;
    var no_of_bubbles = 0;

      var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("height", 100)
    .style("width", 200)
    .style("top", -100)
    .style("left", -100)
    .style("transition-timing-function", "ease-in")
    .style("text-align", "center")
    .style("background-color", "white")
    .style("text", "black")
    .style("z-index", "15")
    .style("border-radius", "7px")
    .style("border", "1px solid black")
    .style("visibility", "fixed")
    .style("font-size", "14px")
    .style("font-family", "VERDANA")
    .style("margin-top","0px")
    .text("");

(function () {
    
	var width = 600, height = 500;
	var svg = d3.select("#market-bb")
		.append("svg")
        .attr("id", "market-vis")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)");
	
    var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collide", d3.forceCollide(function(d){
                if (d.head == "Market"){ 
                    return d.radius;                }
                else
                    return 0;
            }))
    
    d3.queue()
		.defer(d3.csv, "Health.csv")
		.await(ready)
		
	function ready (error, datapoints) {
		
		var circles = svg.selectAll(".circ")
			.data(datapoints)
			.enter().append("circle")
			.attr("class","notselected")
            .attr("id", function(d){
                return d.id;
            })
			.attr("r", function(d){
                if (d.head == "Market")
                    return d.radius;
                else
                    return 0;
            })
            .attr("cat", function(d){
                return d.head;
            })
            .attr("subcat", function(d){
                return d.subhead;
            })
            .attr("text", function(d){
                return d.fragment;
            })
            .attr("stroke","black")
            .attr("stroke-width","1")
			.attr("fill", function(d){
                if (d.subhead == 'trends')
                    return "#1abc9c";
                else if (d.subhead == 'customers')
                    return "#f39c12";
                else if (d.subhead == 'segments')
                    return "#3498db";
                else if (d.subhead == 'needs')
                    return "#9b59b6";
                else if (d.subhead == 'influencers')
                    return "#e74c3c";
            })
            .text(function(d){
                return d.head;
            })
            .on("mouseover", function(d){
                tooltip.text(d.fragment);
                tooltip.style("text", "black");
                return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-105+"px").style("left",(d3.event.pageX+10)-110+"px");})
        .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
        .on("click", function(){
            selector(event);        
        })
    
	//text code
        var label = svg.append("g")
				      .attr("class", "label")
				      .selectAll("text")
				      .data(datapoints)
				      .enter().append("text")
				      .text(function(d){
                          var strinit = d.fragment;
                          if (d.head == "Market")
                              return strinit.substr(0,1);
                          else 
                              return "";
                      })
        
    
        
	simulation.nodes(datapoints)
		.on('tick', ticked)
	
	function ticked() {
		circles
			.attr("cx", function(d) {return d.x })
			.attr("cy", function(d) {return d.y })
        
        label
	        .attr("x", function(d) { return d.x; })
	        .attr("y", function(d) { return d.y+2; });
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
            .force("x", d3.forceX(
                  function(d){
                if (d.subhead == 'trends')
                    return width/4;                 
                else if (d.subhead == 'customers')
                    return 3*width/4;
                else if (d.subhead == 'segments')
                    return width/2;
                else if (d.subhead == 'needs')
                    return width/4;
                else if (d.subhead == 'influencers')
                    return 3*width/4;
                else
                    return -500;
            }))
            .force("y", d3.forceY(function(d){
                if (d.subhead == 'trends')
                    return height/4;                   
                else if (d.subhead == 'customers')
                    return height/4;
                else if (d.subhead == 'segments')
                    return height/2;
                else if (d.subhead == 'needs')
                    return 3*height/4;
                else if (d.subhead == 'influencers')
                    return 3*height/4;
            }))
        
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#markbtn").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'trends')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'trends')
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
                                  if(d.subhead == 'customers')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'customers')
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
                                  if(d.subhead == 'segments')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'segments')
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
                                  if(d.subhead == 'needs')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'needs')
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
                                  if(d.subhead == 'influencers')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'influencers')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
   
    
})();


//
//
//DELIVERY CHART
//
//

(function() {
	var width = 600,
	height = 500;	
	var svg = d3.select("#deliv-bb")
		.append("svg")
        .attr("id", "deliv-vis")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)")	
	
    var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collide", d3.forceCollide(function(d){
                if (d.head == "Delivery")
                    return 25;
                else
                    return 0;
            }))
    
    var radiusScale = d3.scaleSqrt().domain([10,90]).range([10,50])
    
	d3.queue()
		.defer(d3.csv, "Health.csv")
		.await(ready)
		
	function ready (error, datapoints) {
		
		var circles = svg.selectAll(".circ")
			.data(datapoints)
			.enter().append("circle")
			.attr("class", "notselected")
			.attr("r", function(d){
                if (d.head == "Delivery")
                    return 25;
                else
                    return 0;
            })
            .attr("cat", function(d){
                return d.head;
            })
            .attr("subcat", function(d){
                return d.subhead;
            })
            .attr("text", function(d){
                return d.fragment;
            })
            .attr("id", function(d){
                return d.id;
            })
            .attr("stroke","black")
            .attr("stroke-width","1")
			.attr("fill", function(d){
                if (d.subhead == 'trends')
                    return "#1abc9c";                   
                else if (d.subhead == 'services')
                    return "#f39c12";
                else if (d.subhead == 'application')
                    return "#3498db";
            })
            .on("mouseover", function(d){
                tooltip.text(d.fragment);
                tooltip.style("text", "black");
                return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-105+"px").style("left",(d3.event.pageX+10)-110+"px");})
        .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
        .on("click", function(){
            selector(event);        
        })
    
      var label = svg.append("g")
				      .attr("class", "label")
				      .selectAll("text")
				      .data(datapoints)
				      .enter().append("text")
				      .text(function(d){
                          var strinit = d.fragment;
                          if (d.head == "Delivery")
                              return strinit.substr(0,1);
                          else 
                              return "";
                      })
	
    
	simulation.nodes(datapoints)
		.on('tick', ticked)
	
	function ticked() {
		circles
			.attr("cx", function(d) {return d.x })
			.attr("cy", function(d) {return d.y })
        
        label
	        .attr("x", function(d) { return d.x; })
	        .attr("y", function(d) { return d.y+2; });
    }
	}
	d3.select("#delivcombine").on('click', function(){
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
   d3.select("#delivdistribute").on('click', function(){
        simulation
            .force("x", d3.forceX(
                  function(d){
                if (d.subhead == 'trends')
                    return width/4;                   
                else if (d.subhead == 'services')
                    return 3*width/4;
                else if (d.subhead == 'application')
                    return width/2;
                
                
            }))
            .force("y", d3.forceY(function(d){
                if (d.subhead == 'trends')
                    return height/4;                   
                else if (d.subhead == 'services')
                    return height/4;
                else if (d.subhead == 'application')
                    return 3*height/5;
               
                
            }))
        
            .alphaTarget(0.5)
            .restart()
    })
        d3.select("#trends1").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'trends')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'trends')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#service1").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'services')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'services')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#application").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'application')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'application')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    
    
})();
//
//
//OFFERINGS CHART
//
//

(function() {
	var width = 600,
	height = 500;	
	var svg = d3.select("#offer-bb")
		.append("svg")
        .attr("id", "offer-vis")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)")	
	
    var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collide", d3.forceCollide(function(d){
                if (d.head == "Offering")
                    return 25;
                else
                    return 0;
            }))
    
    
    
    var radiusScale = d3.scaleSqrt().domain([10,90]).range([10,50])
    
	d3.queue()
		.defer(d3.csv, "Health.csv")
		.await(ready)
		
	function ready (error, datapoints) {
		
		var circles = svg.selectAll(".circ")
			.data(datapoints)
			.enter().append("circle")
			.attr("class", "artist")
			.attr("r", function(d){
                if (d.head == "Offering")
                    return 25;
                else
                    return 0;
            })
			.attr("fill", function(d){
                if (d.subhead == 'trends')
                    return "#1abc9c";                   
                else if (d.subhead == 'occasion')
                    return "#f39c12";
                else if (d.subhead == 'Location')
                    return "#3498db";
                else if (d.subhead == 'Channels')
                    return "#9b59b6";
            })
            .attr("cat", function(d){
                return d.head;
            })
            .attr("subcat", function(d){
                return d.subhead;
            })
            .attr("id", function(d){
                return d.id;
            })
            .attr("text", function(d){
                return d.fragment;
            })
            .on("click", function(){
                selector(event);        
            })
            .attr("stroke","black")
            .attr("stroke-width","1")
            .on("mouseover", function(d){
                tooltip.text(d.fragment);
                tooltip.style("text", "black");
                return tooltip.style("visibility", "visible");})
            .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-105+"px").style("left",(d3.event.pageX+10)-110+"px");})
            .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
    
      var label = svg.append("g")
				      .attr("class", "label")
				      .selectAll("text")
				      .data(datapoints)
				      .enter().append("text")
				      .text(function(d){
                          var strinit = d.fragment;
                          if (d.head == "Offering")
                              return strinit.substr(0,1);
                          else 
                              return "";
                      })
      
    
	simulation.nodes(datapoints)
		.on('tick', ticked)
	
	function ticked() {
		circles
			.attr("cx", function(d) {return d.x })
			.attr("cy", function(d) {return d.y })
        
        label
	        .attr("x", function(d) { return d.x; })
	        .attr("y", function(d) { return d.y+2; });
    }
	}
	d3.select("#offercombine").on('click', function(){
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
    
    d3.select("#offerdistribute").on('click', function(){
        simulation
            .force("x", d3.forceX(
                  function(d){
                if (d.subhead == 'trends')
                    return width/4;                   
                else if (d.subhead == 'occasion')
                    return 3*width/4;
                else if (d.subhead == 'Location')
                    return width/4;
                else if (d.subhead == 'Channels')
                    return 3*width/4;
                
            }))
            .force("y", d3.forceY(function(d){
                if (d.subhead == 'trends')
                    return height/4;                   
                else if (d.subhead == 'occasion')
                    return height/4;
                else if (d.subhead == 'Location')
                    return 3*height/4;
                else if (d.subhead == 'Channels')
                    return 3*height/4;
                
            }))
        
            .alphaTarget(0.5)
            .restart()
    })

 d3.select("#trends2").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'trends')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'trends')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#occasion").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'occasion')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'occasion')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#Location").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'Location')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'Location')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#channels2").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'Channels')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'Channels')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })   
})();
//
//
//PRODUCTION CHART
//
//

(function() {
	var width = 600,
	height = 500;	
	var svg = d3.select("#prod-bb")
		.append("svg")
        .attr("id", "prod-vis")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)")	
	
    var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collide", d3.forceCollide(function(d){
                if (d.head == "Production")
                    return 25;
                else
                    return 0;
            }))
    
    
    
    var radiusScale = d3.scaleSqrt().domain([10,90]).range([10,50])
    
	d3.queue()
		.defer(d3.csv, "Health.csv")
		.await(ready)
		
	function ready (error, datapoints) {
		
		var circles = svg.selectAll(".circ")
			.data(datapoints)
			.enter().append("circle")
			.attr("class", "artist")
			.attr("r", function(d){
                if (d.head == "Production")
                    return 25;
                else
                    return 0;
            })
			.attr("fill", function(d){
                if (d.subhead == 'trends')
                    return "#1abc9c";                   
                else if (d.subhead == 'technologies')
                    return "#f39c12";
                else if (d.subhead == 'physical assets')
                    return "#3498db";
                else if (d.subhead == 'competencies')
                    return "#9b59b6";
                
            })
            .attr("cat", function(d){
                return d.head;
            })
            .attr("subcat", function(d){
                return d.subhead;
            })
            .attr("id", function(d){
                return d.id;
            })
            .attr("text", function(d){
                return d.fragment;
            })
            .on("click", function(){
                selector(event);        
            })
            .attr("stroke","black")
            .attr("stroke-width","1")
            .on("mouseover", function(d){
                tooltip.text(d.fragment);
                tooltip.style("text", "black");
                return tooltip.style("visibility", "visible");})
            .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-105+"px").style("left",(d3.event.pageX+10)-110+"px");})
            .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
        
	  var label = svg.append("g")
				      .attr("class", "label")
				      .selectAll("text")
				      .data(datapoints)
				      .enter().append("text")
				      .text(function(d){
                          var strinit = d.fragment;
                          if (d.head == "Production")
                              return strinit.substr(0,1);
                          else 
                              return "";
                      })
      
        
	simulation.nodes(datapoints)
		.on('tick', ticked)
	
	function ticked() {
		circles
			.attr("cx", function(d) {return d.x })
			.attr("cy", function(d) {return d.y })
        
        label
	        .attr("x", function(d) { return d.x; })
	        .attr("y", function(d) { return d.y+2; });
    }
	}
	d3.select("#prodcombine").on('click', function(){
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
    d3.select("#proddistribute").on('click', function(){
        simulation
            .force("x", d3.forceX(
                  function(d){
                if (d.subhead == 'trends')
                    return width/4;                   
                else if (d.subhead == 'technologies')
                    return 3*width/4;
                else if (d.subhead == 'physical assets')
                    return width/4;
                else if (d.subhead == 'competencies')
                    return 3*width/4;
            }))
            .force("y", d3.forceY(function(d){
                if (d.subhead == 'trends')
                    return height/4;                   
                else if (d.subhead == 'technologies')
                    return height/4;
                else if (d.subhead == 'physical assets')
                    return 3*height/4;
                else if (d.subhead == 'competencies')
                    return 3*height/4;
                
            }))
        
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#trends3").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'trends')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'trends')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#tech").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'technologies')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'technologies')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#phyassets").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'physical assets')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'physical assets')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#competen").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'competencies')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'competencies')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    
})();
//
//
//BMOD CHART
//
//
(function() {
	var width = 600,
	height = 500;	
	var svg = d3.select("#bmod-bb")
		.append("svg")
        .attr("id", "bmod-vis")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)")	
	
    var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collide", d3.forceCollide(function(d){
                if (d.head == "Business Model")
                    return 25;
                else
                    return 0;
            }))
        
    var radiusScale = d3.scaleSqrt().domain([10,90]).range([10,50])
    
	d3.queue()
		.defer(d3.csv, "Health.csv")
		.await(ready)
		
	function ready (error, datapoints) {
		
		var circles = svg.selectAll(".circ")
			.data(datapoints)
			.enter().append("circle")
			.attr("class", "artist")
			.attr("r", function(d){
                if (d.head == "Business Model" )
                    return 25;
                else
                    return 0;
            })
			.attr("fill", function(d){
                if (d.subhead == 'trends')
                    return "#1abc9c";                   
                else if (d.subhead == 'partners and networks')
                    return "#f39c12";
                else if (d.subhead == 'enterprise model')
                    return "#3498db";
                else if (d.subhead == 'pricing strategy')
                    return "#9b59b6";
                
            })
            .attr("cat", function(d){
                return d.head;
            })
            .attr("subcat", function(d){
                return d.subhead;
            })
            .attr("id", function(d){
                return d.id;
            })
            .attr("text", function(d){
                return d.fragment;
            })
            .attr("stroke","black")
            .attr("stroke-width","1")
            .attr("counter", function(d){
                        return 20;
            })
            .on("click", function(){
                selector(event);        
            })
            .on("mouseover", function(d){
                tooltip.text(d.fragment);
                tooltip.style("text", "black");
                return tooltip.style("visibility", "visible");})
            .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-105+"px").style("left",(d3.event.pageX+10)-110+"px");})
            .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
        
	  var label = svg.append("g")
				      .attr("class", "label")
				      .selectAll("text")
				      .data(datapoints)
				      .enter().append("text")
				      .text(function(d){
                          var strinit = d.fragment;
                          if (d.head == "Business Model")
                              return strinit.substr(0,1);
                          else 
                              return "";
                      })
           
        
	simulation.nodes(datapoints)
		.on('tick', ticked)
	
	function ticked() {
		circles
			.attr("cx", function(d) {return d.x })
			.attr("cy", function(d) {return d.y })
        
        label
	        .attr("x", function(d) { return d.x; })
	        .attr("y", function(d) { return d.y+2; });
            
    }
	}
	d3.select("#bmodcombine").on('click', function(){
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
    d3.select("#bmoddistribute").on('click', function(){
        simulation
            .force("x", d3.forceX(
                  function(d){
                if (d.subhead == 'trends')
                    return width/4;                   
                else if (d.subhead == 'partners and networks')
                    return 3*width/4;
                else if (d.subhead == 'enterprise model')
                    return width/4;
                else if (d.subhead == 'pricing strategy')
                    return 3*width/4;
                
            }))
            .force("y", d3.forceY(function(d){
                if (d.subhead == 'trends')
                    return height/4;                   
                else if (d.subhead == 'partners and networks')
                    return height/4;
                else if (d.subhead == 'enterprise model')
                    return 3*height/4;
                else if (d.subhead == 'pricing strategy')
                    return 3*height/4;
                
            }))
        
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#trends4").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'trends')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'trends')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#partners").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'partners and networks')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'partners and networks')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#network").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'enterprise model')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'enterprise model')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    d3.select("#pricing").on('click', function(){
        simulation
            .force("x", d3.forceX(function (d){
                                  if(d.subhead == 'pricing strategy')
                                    return width / 2;
                                  else
                                    return 1000;
                                  }))
            .force("y", d3.forceY(function (d){
                                  if(d.subhead == 'pricing strategy')
                                    return height / 2;
                                  else
                                    return 1000;
                                  }))
            .alphaTarget(0.5)
            .restart()
    })
    
})();

