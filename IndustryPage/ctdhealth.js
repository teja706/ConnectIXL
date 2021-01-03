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
    
    var newdiv1 = document.createElement('div');
	document.getElementById("connect_dots").appendChild(newdiv1);
    newdiv1.setAttribute("style", "background-color: #afbc21;width: 1000;height: 0;margin-top: -500px;");
    
    var newdiv2 = document.createElement('div');
	document.getElementById("connect_dots").appendChild(newdiv2); 
    newdiv2.setAttribute("style", "background-color: #850a09;width: 1000;height: 0;");
    
    var newdiv3 = document.createElement('div');
	document.getElementById("connect_dots").appendChild(newdiv3); 
    newdiv3.setAttribute("style", "background-color: gray;width: 1000;height: 0;");
    
    var newdiv4 = document.createElement('div');
	document.getElementById("connect_dots").appendChild(newdiv4); 
    newdiv4.setAttribute("style", "background-color: blue;width: 1000;height: 0;");
    
    var newdiv5 = document.createElement('div');
	document.getElementById("connect_dots").appendChild(newdiv5); 
    newdiv5.setAttribute("style", "background-color: pink;width: 1000;height: 0;");
    
      var tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltipsss")
    .style("position", "absolute")
    .style("min-height", 100)
    .style("min-width", 200)
    .style("top", -100)
    .style("left", -100)
    .style("transition-timing-function", "ease-in")
    .style("text-align", "center")
    .style("background-color", "#454545")
    .style("color", "azure")
    .style("z-index", "15")
    .style("border-radius", "7px")
    .style("border", "1px solid #aaa")
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
	var svg = d3.select("#delivchart")
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
	var svg = d3.select("#offchart")
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
	var svg = d3.select("#prodchart")
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
	var svg = d3.select("#bmodchart")
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
d3.select("#mainconnector").on('click', function(){
        var ol = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
        var att = document.createAttribute("r");                // Create a "class" attribute
        att.value = "30";
        var i;
    connect.append("div").attr("height", 200).attr("width", 200).attr("style", "background-color: black;position:fixed;")
    connect.selectAll("*").remove();

    //paragraph
    var para;
        para = "We will provide ";
        for(var nxx=0;nxx<no_of_bubbles;nxx++){
            if(cat_array[nxx] == 'Offering')
                para += "<h4 style='color: #ed4c67;display:inline;text-decoration: underline;'>"+text_array[nxx]+",</h4> ";}
        para += "to/for ";
        for(nxx=0;nxx<no_of_bubbles;nxx++){
            if(cat_array[nxx] == 'Market')
                para += "<h4 style='color: #afbc21;display:inline;text-decoration: underline;'>"+text_array[nxx]+",</h4> ";}
        para += "through ";
        for(nxx=0;nxx<no_of_bubbles;nxx++){
            if(cat_array[nxx] == 'Delivery')
                para += "<h4 style='color: #ffa312;display:inline;text-decoration: underline;'>"+text_array[nxx]+",</h4> ";}
        para += "using ";
        for(nxx=0;nxx<no_of_bubbles;nxx++){
            if(cat_array[nxx] == 'Production')
                para += "<h4 style='color: #aaa;display:inline;text-decoration: underline;'>"+text_array[nxx]+",</h4> ";}
        para += " and make money by ";
        for(nxx=0;nxx<no_of_bubbles;nxx++){
            if(cat_array[nxx] == 'Business Model')
                para += "<h4 style='color: #58b19f;display:inline;text-decoration: underline;'>"+text_array[nxx]+",</h4> ";}
        document.getElementById("contentpara").innerHTML = para;
    
    //final ctd code
     
    var xx;
    var mx=0,my=0,dx=0,dy=0,ox=0,oy=0,px=0,py=0,bmx=0,bmy=0;
    var lineender = 0;
    var lenny = 0;
    for (var o in select_array) {
    lenny++;}

    var currentindex=0    
    var constant = 0;
	for(xx=currentindex;xx<no_of_bubbles;xx++){
    if(cat_array[xx] == 'Market'){
        var selected_div = document.getElementById("market-vis");
        var selected_bubble = selected_div.getElementById(select_array[xx]);
        var selected_bubble_rad = selected_bubble.getAttribute("r");
        //selected_bubble_rad++;
        selected_bubble.setAttribute("r", selected_bubble_rad);
    
        var sim = d3.selectAll(".circ").filter(function(d,i){return i == select_array[xx];})
                    .transition().duration(1000)
        	.tween('radius', function(d) {
          	var that = d3.select(this);
          	var i = d3.interpolate(d.radius, selected_bubble_rad);
          	return function(t) {
              d.radius = i(t);
              that.attr('r', function(d) { return d.radius; });
              force.nodes(data)
            }
        	});
    }else if(cat_array[xx] == 'Delivery'){
        var selected_div = document.getElementById("deliv-vis");
        var selected_bubble = selected_div.getElementById(select_array[xx]);
        var selected_bubble_rad = selected_bubble.getAttribute("r");
        //selected_bubble_rad++;
        selected_bubble.setAttribute("r", selected_bubble_rad);
    }else if(cat_array[xx] == 'Offering'){
        var selected_div = document.getElementById("offer-vis");
        var selected_bubble = selected_div.getElementById(select_array[xx]);
        var selected_bubble_rad = selected_bubble.getAttribute("r");
        //selected_bubble_rad++;
        selected_bubble.setAttribute("r", selected_bubble_rad);
    }else if(cat_array[xx] == 'Production'){
        var selected_div = document.getElementById("prod-vis");
        var selected_bubble = selected_div.getElementById(select_array[xx]);
        var selected_bubble_rad = selected_bubble.getAttribute("r");
        //selected_bubble_rad++;
        selected_bubble.setAttribute("r", selected_bubble_rad);
    }else if(cat_array[xx] == 'Business Model'){
        var selected_div = document.getElementById("bmod-vis");
        var selected_bubble = selected_div.getElementById(select_array[xx]);
        var selected_bubble_rad = selected_bubble.getAttribute("r");
        //selected_bubble_rad++;
        selected_bubble.setAttribute("r", selected_bubble_rad);
    }
         console.log(select_array[xx]+" plotted");
        if(cat_array[xx] == 'Market'){
      var rect = connect.append("circle")
                        .attr("r", 25)
                        .attr("id", function(){
                            return select_array[xx];
                        })
                        .attr("bubblecontent", text_array[xx])
                        .attr("cy", function(){
                            if(cat_array[xx] == 'Market'){
                                mx+=1;
                                if (subcat_array[xx] == 'trends'){
                                    ol[0][0] += 1;
                                    return 100*ol[0][0]+constant;}         
                                else if (subcat_array[xx] == 'customers'){
                                    ol[0][1] += 1;
                                    return 100*ol[0][1]+constant;}
                                else if (subcat_array[xx] == 'segments'){
                                    ol[0][2] += 1;
                                    return 100*ol[0][2]+constant;}
                                else if (subcat_array[xx] == 'needs'){
                                    ol[0][3] += 1;
                                    return 100*ol[0][3]+constant;}
                                else if (subcat_array[xx] == 'influencers'){
                                    ol[0][4] += 1;
                                    return 100*ol[0][4]+constant;}
                            }
                        })
                        .attr("cx", function(){
                            if(cat_array[xx] == 'Market'){
                                mx+=1;
                                if (subcat_array[xx] == 'trends')
                                    return 200;                   
                                else if (subcat_array[xx] == 'customers')
                                    return 300;
                                else if (subcat_array[xx] == 'segments')
                                    return 400;
                                else if (subcat_array[xx] == 'needs')
                                    return 500;
                                else if (subcat_array[xx] == 'influencers')
                                    return 600;
                            }
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", "1")
                        .attr("fill", color_array[xx])
                        .on("mouseover", function(){
                return tooltipster(event);})
            .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-105+"px").style("left",(d3.event.pageX+10)-110+"px");})
            .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
      }
    }
    constant += 5;
        var maxlen = Math.max(ol[0][0],ol[0][1],ol[0][2],ol[0][3],ol[0][4]);
        if((maxlen) == 0){
            maxlen = 1;
        }
        console.log(maxlen);
        var maxlenht = maxlen*100;
        lineender += maxlenht+10;
        newdiv1.setAttribute("style", "background-color: #afbc21;width: 650;height: "+maxlenht+";margin-top: -1950px;border-radius:10px;box-shadow: 5px 5px 5px #111111;")
    connect.append("text").attr("x", 10).attr("y", 100).text("Market").attr("fill", "white")   
    
    connect.append("text").attr("x", 170).attr("y", 65).text("Trends").attr("fill", "white")
    connect.append("text").attr("x", 270).attr("y", 65).text("Customers").attr("fill", "white")
    connect.append("text").attr("x", 370).attr("y", 65).text("Segments").attr("fill", "white")
    connect.append("text").attr("x", 470).attr("y", 65).text("Needs").attr("fill", "white")
    connect.append("text").attr("x", 570).attr("y", 65).text("Influencers").attr("fill", "white")
        for(temp=0;temp<5;temp++){
            ol[1][temp] = maxlen;
        }
    var currentindex=0    
	for(xx=currentindex;xx<no_of_bubbles;xx++){
        if(cat_array[xx] == 'Delivery'){
      var rect = connect.append("circle")
                        .attr("r", 25)
                        .attr("id", function(){
                            return select_array[xx];
                        })
                        .attr("bubblecontent", text_array[xx])
                        .attr("cy", function(){
                            
                                if (subcat_array[xx] == 'trends'){
                                    ol[1][0] += 1;
                                    return 100*ol[1][0]+constant;}         
                                else if (subcat_array[xx] == 'services'){
                                    ol[1][1] += 1;
                                    return 100*ol[1][1]+constant;}
                                else if (subcat_array[xx] == 'application'){
                                    ol[1][2] += 1;
                                    return 100*ol[1][2]+constant;}
                                })
                        .attr("cx", function(){
                            
                                if (subcat_array[xx] == 'trends')
                                    return 200;                   
                                else if (subcat_array[xx] == 'services')
                                    return 300;
                                else if (subcat_array[xx] == 'application')
                                    return 400; 
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", "1")
                        .attr("fill", color_array[xx])
                        .on("mouseover", function(){
                return tooltipster(event);})
            .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-105+"px").style("left",(d3.event.pageX+10)-110+"px");})
            .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
      }
    }
    constant += 5;
    var maxlen1 = Math.max(ol[1][0],ol[1][1],ol[1][2],ol[1][3],ol[1][4]);
    if((maxlen1 - maxlen) == 0){
            maxlen1 = maxlen + 1;
        }
    console.log(maxlen1);
    var maxlenht1 = maxlen1*100-maxlen*100;
    lineender += maxlenht1+10;
    newdiv2.setAttribute("style", "background-color: #f6851e;width: 650;height: "+maxlenht1+";margin-top: 5px;border-radius:10px;box-shadow: 5px 5px 5px #111111;")
    connect.append("text").attr("x", 10).attr("y", 105+maxlen*100).text("Delivery").attr("fill", "white")
    
    connect.append("text").attr("x", 170).attr("y", 70+maxlenht).text("Trends").attr("fill", "white")
    connect.append("text").attr("x", 270).attr("y", 70+maxlenht).text("Services").attr("fill", "white")
    connect.append("text").attr("x", 370).attr("y", 70+maxlenht).text("Application").attr("fill", "white")
         for(temp=0;temp<5;temp++){
            ol[2][temp] = maxlen1;
        }
    var currentindex=0
	for(xx=currentindex;xx<no_of_bubbles;xx++){
        if(cat_array[xx] == 'Offering'){
            rect = connect.append("circle")
                        .attr("r", 25)
                        .attr("id", function(){
                            return select_array[xx];
                        })
                        .attr("bubblecontent", text_array[xx])
                        .attr("cy", function(){
                                if (subcat_array[xx] == 'trends'){
                                    ol[2][0] += 1;
                                    return 100*ol[2][0]+constant;}         
                                else if (subcat_array[xx] == 'occasion'){
                                    ol[2][1] += 1;
                                    return 100*ol[2][1]+constant;}
                                else if (subcat_array[xx] == 'Location'){
                                    ol[2][2] += 1;
                                    return 100*ol[2][2]+constant;}
                                else if (subcat_array[xx] == 'Channels'){
                                    ol[2][3] += 1;
                                    return 100*ol[2][3]+constant;}
                        })
                        .attr("cx", function(){
                            
                                if (subcat_array[xx] == 'trends')
                                    return 200;                   
                                else if (subcat_array[xx] == 'occasion')
                                    return 300;
                                else if (subcat_array[xx] == 'Location')
                                    return 400;
                                else if (subcat_array[xx] == 'Channels')
                                    return 500;
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", "1")
                        .attr("fill", color_array[xx])
                        .on("mouseover", function(){
                return tooltipster(event);})
            .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-105+"px").style("left",(d3.event.pageX+10)-110+"px");})
            .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
      }
    }
    constant += 5;
    var maxlen2 = Math.max(ol[2][0],ol[2][1],ol[2][2],ol[2][3],ol[2][4]);
    if((maxlen2 - maxlen1) == 0){
            maxlen2 = maxlen1 + 1;
        }
    console.log(maxlen2);
    var maxlenht2 = maxlen2*100-maxlen1*100;
    lineender += maxlenht2+10;
    newdiv3.setAttribute("style", "background-color: #850a09;width: 650;height: "+maxlenht2+";margin-top: 5px;border-radius:10px;box-shadow: 5px 5px 5px #111111;")
    connect.append("text").attr("x", 10).attr("y", 110+maxlen1*100).text("Offerings").attr("fill", "white")
    connect.append("text").attr("x", 170).attr("y", 75+maxlen1*100).text("Trends").attr("fill", "white")
    connect.append("text").attr("x", 270).attr("y", 75+maxlen1*100).text("Occasion").attr("fill", "white")
    connect.append("text").attr("x", 370).attr("y", 75+maxlen1*100).text("Location").attr("fill", "white")
    connect.append("text").attr("x", 470).attr("y", 75+maxlen1*100).text("Channels").attr("fill", "white")

          for(temp=0;temp<5;temp++){
            ol[3][temp] = maxlen2;
        }
    var currentindex=0;    
	for(xx=currentindex;xx<no_of_bubbles;xx++){
        if(cat_array[xx] == 'Production'){
      rect = connect.append("circle")
                        .attr("r", 25)
                        .attr("id", function(){
                            return select_array[xx];
                        })
                        .attr("bubblecontent", text_array[xx])
                        .attr("cy", function(){
                            
                                if (subcat_array[xx] == 'trends'){
                                    ol[3][0] += 1;
                                    return 100*ol[3][0]+constant;}         
                                else if (subcat_array[xx] == 'technologies'){
                                    ol[3][1] += 1;
                                    return 100*ol[3][1]+constant;}
                                else if (subcat_array[xx] == 'physical assets'){
                                    ol[3][2] += 1;
                                    return 100*ol[3][2]+constant;}
                                else if (subcat_array[xx] == 'competencies'){
                                    ol[3][3] += 1;
                                    return 100*ol[3][3]+constant;}
                        })
                        .attr("cx", function(){
                                if (subcat_array[xx] == 'trends')
                                    return 200;                   
                                else if (subcat_array[xx] == 'technologies')
                                    return 300;
                                else if (subcat_array[xx] == 'physical assets')
                                    return 400;
                                else if (subcat_array[xx] == 'competencies'){
                                    return 500;}  
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", "1")
                        .attr("fill", color_array[xx])
                        .on("mouseover", function(){
                return tooltipster(event);})
            .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-105+"px").style("left",(d3.event.pageX+10)-110+"px");})
            .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
      }
    }
    constant += 5;
    var maxlen3 = Math.max(ol[3][0],ol[3][1],ol[3][2],ol[3][3],ol[3][4]);
    if((maxlen3 - maxlen2) == 0){
            maxlen3 = maxlen2 + 1;
        }
    console.log(maxlen3);
    var maxlenht3 = maxlen3*100-maxlen2*100;
    lineender += maxlenht3+10;
    newdiv4.setAttribute("style", "background-color: #003b48;width: 650;height: "+maxlenht3+";margin-top: 5px;border-radius:10px;box-shadow: 5px 5px 5px #111111;")
    connect.append("text").attr("x", 10).attr("y", 115+maxlen2*100).text("Production").attr("fill", "white")
    connect.append("text").attr("x", 170).attr("y", 80+maxlen2*100).text("Trends").attr("fill", "white")
    connect.append("text").attr("x", 270).attr("y", 80+maxlen2*100).text("Techniologies").attr("fill", "white")
    connect.append("text").attr("x", 370).attr("y", 80+maxlen2*100).text("Phy. Assets").attr("fill", "white")
    connect.append("text").attr("x", 470).attr("y", 80+maxlen2*100).text("Competencies").attr("fill", "white")
           for(temp=0;temp<5;temp++){
            ol[4][temp] = maxlen3;
        }
    var currentindex=0    
	for(xx=currentindex;xx<no_of_bubbles;xx++){
        if(cat_array[xx] == 'Business Model'){
      rect = connect.append("circle")
                        .attr("r", 25)
                        .attr("id", function(){
                            return select_array[xx];
                        })
                        .attr("bubblecontent", text_array[xx])
                        .attr("cy", function(){
                            
                                if (subcat_array[xx] == 'trends'){
                                    ol[4][0] += 1;
                                    return 100*ol[4][0]+constant;}         
                                else if (subcat_array[xx] == 'partners and networks'){
                                    ol[4][1] += 1;
                                    return 100*ol[4][1]+constant;}
                                else if (subcat_array[xx] == 'enterprise model'){
                                    ol[4][2] += 1;
                                    return 100*ol[4][2]+constant;}
                                else if (subcat_array[xx] == 'pricing strategy'){
                                    ol[4][3] += 1;
                                    return 100*ol[4][3]+constant;}
                        })
                        .attr("cx", function(){
                            
                                if (subcat_array[xx] == 'trends')
                                    return 200;                   
                                else if (subcat_array[xx] == 'partners and networks')
                                    return 300;
                                else if (subcat_array[xx] == 'enterprise model')
                                    return 400;
                                else if (subcat_array[xx] == 'pricing strategy'){
                                    return 500;}
                                
                            
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", "1")
                        .attr("fill", color_array[xx])
                        .on("mouseover", function(){
                return tooltipster(event);})
            .on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)-105+"px").style("left",(d3.event.pageX+10)-110+"px");})
            .on("mouseout", function (){return tooltip.style("visibility", "hidden");})
      }
    }
    constant += 5;
    var maxlen4 = Math.max(ol[4][0],ol[4][1],ol[4][2],ol[4][3],ol[4][4]);
    if((maxlen4 - maxlen3) == 0){
            maxlen4 = maxlen3 + 1;
        }
    console.log(maxlen4);
    var maxlenht4 = maxlen4*100-maxlen3*100;
    lineender += maxlenht4+10;
    newdiv5.setAttribute("style", "background-color: #006c64;width: 650;height: "+maxlenht4+";margin-top: 5px;border-radius:10px;box-shadow: 5px 5px 5px #111111;")
    connect.append("text").attr("x", 10).attr("y", 120+maxlen3*100).text("B. Model").attr("fill", "white")
    connect.append("text").attr("x", 170).attr("y", 85+maxlen3*100).text("Trends").attr("fill", "white")
    connect.append("text").attr("x", 270).attr("y", 85+maxlen3*100).text("Partners").attr("fill", "white")
    connect.append("text").attr("x", 370).attr("y", 85+maxlen3*100).text("Network").attr("fill", "white")
    connect.append("text").attr("x", 470).attr("y", 85+maxlen3*100).text("Pricing").attr("fill", "white")               
    /////////////
    //Line code//
    /////////////
    for(xx=0;xx<=no_of_bubbles;xx++){
    if(xx<lenny-1){
        var seldiv = document.getElementById('connectdiv');
        var bub1 = seldiv.getElementById(select_array[xx]);
        var bub2 = seldiv.getElementById(select_array[xx+1]);
        var b1cx = bub1.getAttribute("cx");
        var b1cy = bub1.getAttribute("cy");
        var b2cx = bub2.getAttribute("cx");
        var b2cy = bub2.getAttribute("cy");
     var line = connect.append("line")
                        .attr("y1", function(){
                            return b1cy;
                        })
                        .attr("x1", function(){
                            return b1cx;
                        })
                        .attr("y2", function(){
                            return b2cy;
                        })
                        .attr("x2", function(){
                            return b2cx;
                        })
                        .attr("stroke-width", 2)
                        .attr("stroke", "black");
    }
    }
    
    var text = connect.append("text")
                        .attr("y", function(){
                            if(cat_array[xx] == 'Market'){
                                return 140;}
                            else if(cat_array[xx] == 'Delivery'){
                                return 240;}
                            else if(cat_array[xx] == 'Offering'){
                                return 340;}
                            else if(cat_array[xx] == 'Production'){
                                return 440;}
                            else if(cat_array[xx] == 'Business Model'){
                                return 540;}
                        })
                        .attr("x", function(){
                            if(cat_array[xx] == 'Market'){
                                mx+=1;
                                if (subcat_array[xx] == 'trends')
                                    return 100;                   
                                else if (subcat_array[xx] == 'customers')
                                    return 200;
                                else if (subcat_array[xx] == 'segments')
                                    return 300;
                                else if (subcat_array[xx] == 'needs')
                                    return 400;
                                else if (subcat_array[xx] == 'influencers')
                                    return 500;
                            }
                            else if(cat_array[xx] == 'Delivery'){
                                dx+=1;
                                if (subcat_array[xx] == 'trends')
                                    return 100;
                                else if (subcat_array[xx] == 'ocassions')
                                    return 200;
                                else if (subcat_array[xx] == 'Location')
                                    return 300;
                                else if (subcat_array[xx] == 'Channels')
                                    return 400;
                            }
                            else if(cat_array[xx] == 'Offering'){
                                ox+=1;
                                if (subcat_array[xx] == 'trends')
                                    return 100;
                                else if (subcat_array[xx] == 'products')
                                    return 200;
                                else if (subcat_array[xx] == 'services')
                                    return 300;}
                            else if(cat_array[xx] == 'Production'){
                                px+=1;
                                if (subcat_array[xx] == 'trends')
                                    return 100;
                                else if (subcat_array[xx] == 'technologies')
                                    return 200;
                                else if (subcat_array[xx] == 'physical assets')
                                    return 300;
                                else if (subcat_array[xx] == 'competencies')
                                    return 400;}
                            else if(cat_array[xx] == 'Business Model'){
                                bmx+=1;
                                if (subcat_array[xx] == 'trends')
                                    return 100;                   
                                else if (subcat_array[xx] == 'partners')
                                    return 200;
                                else if (subcat_array[xx] == 'network')
                                    return 300;
                                else if (subcat_array[xx] == 'pricing')
                                    return 400;
                            }
                        })
                        .text(text_array[xx])
                        .attr("fill", "white")
                        .attr("width", 300)
        currentindex+=1;
    
    var finalline = connect.append("line")
                            .attr("x1", "130")
                            .attr("y1", "50")
                            .attr("x2", "130")
                            .attr("y2", lineender+20)
                            .attr("stroke", "#232323")
                            .attr("stroke-width", "5")
                            .attr("z-index", 25);
    
    var xbyz = document.getElementById('connectdiv');
    var lamama = xbyz.getElementById(select_array[0]);
    var lababa = lamama.getAttribute('cx');
})

function selector(evt){
        var i,flag=0;
        var evtid = evt.target.id;

        for(i=0;i<no_of_bubbles;i++){
            if(select_array[i] == evtid){
                flag=1;
                break;
            }
        }
    var selected_cat = document.getElementById(evtid).getAttribute("cat");
    console.log(selected_cat);
        if(flag==0){
    if(selected_cat == 'Market'){
        var selected_div = document.getElementById("market-vis");
        var selected_bubble = selected_div.getElementById(evtid);
        var selected_bubble_rad = selected_bubble.setAttribute("stroke-width","3");
    }else if(selected_cat == 'Delivery'){
        var selected_div = document.getElementById("deliv-vis");
        var selected_bubble = selected_div.getElementById(evtid);
        var selected_bubble_rad = selected_bubble.setAttribute("stroke-width","3");
    }else if(selected_cat == 'Offering'){
        var selected_div = document.getElementById("offer-vis");
        var selected_bubble = selected_div.getElementById(evtid);
        var selected_bubble_rad = selected_bubble.setAttribute("stroke-width","3");
    }else if(selected_cat == 'Production'){
        var selected_div = document.getElementById("prod-vis");
        var selected_bubble = selected_div.getElementById(evtid);
        var selected_bubble_rad = selected_bubble.setAttribute("stroke-width","3");
    }else if(selected_cat == 'Business Model'){
        var selected_div = document.getElementById("bmod-vis");
        var selected_bubble = selected_div.getElementById(evtid);
        var selected_bubble_rad = selected_bubble.setAttribute("stroke-width","3");
    }       
            select_array[no_of_bubbles] = evtid;
            color_array[no_of_bubbles] = evt.target.getAttribute("fill");
            text_array[no_of_bubbles] = evt.target.getAttribute("text");
            cat_array[no_of_bubbles] = evt.target.getAttribute("cat");
            subcat_array[no_of_bubbles] = evt.target.getAttribute("subcat");
            no_of_bubbles += 1;
        }
        else if(flag==1){
            if(selected_cat == 'Market'){
        var selected_div = document.getElementById("market-vis");
        var selected_bubble = selected_div.getElementById(evtid);
        var selected_bubble_rad = selected_bubble.setAttribute("stroke-width","1");
    }else if(selected_cat == 'Delivery'){
        var selected_div = document.getElementById("deliv-vis");
        var selected_bubble = selected_div.getElementById(evtid);
        var selected_bubble_rad = selected_bubble.setAttribute("stroke-width","1");
    }else if(selected_cat == 'Offering'){
        var selected_div = document.getElementById("offer-vis");
        var selected_bubble = selected_div.getElementById(evtid);
        var selected_bubble_rad = selected_bubble.setAttribute("stroke-width","1");
    }else if(selected_cat == 'Production'){
        var selected_div = document.getElementById("prod-vis");
        var selected_bubble = selected_div.getElementById(evtid);
        var selected_bubble_rad = selected_bubble.setAttribute("stroke-width","1");
    }else if(selected_cat == 'Business Model'){
        var selected_div = document.getElementById("bmod-vis");
        var selected_bubble = selected_div.getElementById(evtid);
        var selected_bubble_rad = selected_bubble.setAttribute("stroke-width","1");
    }    
            no_of_bubbles -= 1;
            for(var j=i;j<no_of_bubbles;j++){
                select_array[j]=select_array[j+1];
                color_array[j]=color_array[j+1];
                text_array[j]=text_array[j+1];
                cat_array[j]=cat_array[j+1];
                subcat_array[j]=subcat_array[j+1];
            }
        }
    }
    function tooltipster(evt){
                var evtid = evt.target.id;
                var docdiv = document.getElementById("connectdiv");
                fragcat = document.getElementById(evtid).getAttribute("cat");
                fragsubcat = document.getElementById(evtid).getAttribute("subcat");
                var doccontent = docdiv.getElementById(evtid).getAttribute("bubblecontent");
                document.getElementById("tooltipsss").innerHTML = "<table><tr><th>Fragment Data</th></tr><tr><td>Category</td><td>"+fragcat+"</td></tr><tr><td>Sub category</td><td>"+fragsubcat+"</td></tr><tr><td>Data</td><td>"+doccontent+"</td></tr></table>";
                console.log(document.getElementById("tooltipsss"));
                
                tooltip.style("text", "black");
                tooltip.style("visibility", "visible");
    }