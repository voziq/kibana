import d3 from 'd3';
import _ from 'lodash';
import $ from 'jquery';
//import { ContainerTooSmall } from 'ui/vislib/errors';
import { Chart } from '../../vis_type_vislib/public/vislib/visualizations/_chart';
import { esFilters } from '../../data/public';
//import { getFilterGenerator } from 'ui/filter_manager';
//import { FilterManagerProvider } from 'plugins/ui/filter_manager';

/*export function ScatterBubbleChart(Private) {*/
    //const Chart = Private(VislibVisualizationsChartProvider);
    //const filterManager = Private(FilterManagerProvider);

    /**
     * Scatterbubble Chart Visualization
     *
     * @class JWordcloudChart
     * @constructor
     * @extends Chart
     * @param handler {Object} Reference to the Handler Class Constructor
     * @param el {HTMLElement} HTML element to which the chart will be appended
     * @param chartData {Object} Elasticsearch query results for this specific chart
     */
 export class ScatterBubbleChart extends Chart {
        constructor(handler, chartEl, chartData, deps) {
            super(handler, chartEl, chartData, deps);
            var charts = this.handler.data.getVisData();
            $(this).html("");
        }

        addPathEvents(element) {
            var events = this.events;

            return element
                .call(events.addHoverEvent())
                .call(events.addMouseoutEvent())
                .call(events.addClickEvent());
        };

        _validateContainerSize(width, height) {
            var minWidth = 200;
            var minHeight = 200;

            if (width <= minWidth || height <= minHeight) {
               // throw new ContainerTooSmall();
            }
        }; 

        /**
         * Renders d3 visualization
         *
         * @method draw
         * @returns {Function} Creates the pie chart 
         */
        draw() {
            const self = this;
            var attr = self.handler.visConfig._values;
            var color = this.handler.data.getColorFunc();
			var tooltip = this.tooltip;
			//const filterGen = getFilterGenerator(this.chartData.queryFilter);
			var filters=this.chartData.filterManager;
			
            return function(selection) {
                selection.each(function(data) {
                    var sources = null;
					var node = [];
					var labels = [];
                    try {
                        sources = data.series_data[0];
						
                    } catch (e) {
                        return;
                    }
                    var sizeScale = d3.scale.linear().domain([Math.min.apply(Math, sources.nodes.map(function(o) { return o.size;})),Math.max.apply(Math, sources.nodes.map(function(o) { return o.size;}))]).range([attr.node.min,attr.node.max]);
                    var width = $(this).width();
                    var height = $(this).height();
                    
					var rawnodes = sources.nodes;
                    var reg = sources.groups;
                    
                    var mx = sources.mx;
                    var my = sources.my;
                    var lx = sources.lx;
                    var ly = sources.ly;
					var sx = 0;
					var sy = 0;
                    var xmedian = sources.xmedian;
                    var ymedian = sources.ymedian;
                    var maxcount = sources.maxcount;
                    var xlabel = sources.xlabel;
                    var ylabel = sources.ylabel;
					var xArray = sources.xArray;
					var yArray = sources.yArray;
					var margin = {
                        t: 30,
                        r: 20,
                        b: 20,
                        l: 40
                    };
					var w = width - margin.l - margin.r,
                        h = height - margin.t - margin.b;
					self._validateContainerSize(width, height);
                    if(attr.setXExtents) {
                        lx = attr.xAxis.min;
                        mx = attr.xAxis.max;
                    }
                    if (attr.setYExtents) {
                        ly = attr.yAxis.min;
                        my = attr.yAxis.max;
                    }
					if(attr.defaultExtents){
						lx = d3.min(xArray);
						ly = d3.min(yArray);
						lx=lx-((mx-lx)/20);
						ly=ly-((my-ly)/20);
						mx=mx+((mx-lx)/20);
						my=my+((my-ly)/20);
						/*sx = (mx/20);
						sy = 2*(my/20);
						lx = lx-sx;
						if(lx<0){
							lx = 0;
						} 
						mx = mx+sx;
						ly = ly-sy;
						if(ly<0){
							ly = 0;
						} 
						my = my+sy;*/
					}
					rawnodes.map(function (rnode) {
						var tx=(lx-sx);
						var ty=(ly-sy);
						if(lx==0){
							tx=lx;
						}
						
						if(ly==0){
							ty=ly;
						}
						if(rnode.xval>=tx && rnode.xval<=(mx+sx) && rnode.yval>=ty && rnode.yval<=(my+sy)){
							node.push(rnode);
						}
					});
                   /*var rows = 1;
					var ds = 40;	
					var chd = 0;	 
					var maxsize = 0;
                    var breakat;
                    var wi = 0;
                    for(var z=0;z<reg.length;z++){
                    	wi = (z-maxsize)*110;
                    	if(wi >= w){
                    		if(rows==1){
                    			breakat = z;
                    		}
                    		rows= rows +1;
                    		maxsize = z +1;
                    	}
                    }
                    var fxdsize = breakat;		
                    chd = rows*ds; 
					var lrows = Math.ceil(reg.length/fxdsize);
                    if(lrows !=0){		
                    		chd = lrows*ds;
                    } 
					if(!attr.showLegend){
                    	chd = 0;
                    } 
					var xper = (20 * mx) / 100;
                    var yper = (20 * my) / 100;
                    var xperm = (20 * lx) / 100;
                    var yperm = (30 * ly) / 100; */
					
					var x = d3.scale.linear().range([0, w]),
                        y = d3.scale.linear().range([h - 20, 0]); //h - 60=>814-60=765//-chd
                   var svg = d3.select(this).append("svg")
                        .attr("width", w + margin.l + margin.r)
                        .attr("height", h + margin.t + margin.b);

                    // set axes, as well as details on their ticks
                   if(attr.defaultExtents){
               var xAxis = d3.svg.axis()
                   .scale(x)
                   .ticks(10)
                   //.tickSubdivide(true)						
                   //.tickSize(6, 3, 0)
                   .orient("bottom");

               var yAxis = d3.svg.axis()
                   .scale(y)
                   .ticks(10)						
                   //.tickSubdivide(true)
                   //.tickSize(6, 3, 0)
                   .orient("left");
					}else{
						// set axes, as well as details on their ticks
               var xAxis = d3.svg.axis()
                   .scale(x)
                   .ticks(20)
                   .tickSubdivide(true)						
                   .tickSize(6, 3, 0)
                   .orient("bottom");

               var yAxis = d3.svg.axis()
                   .scale(y)
                   .ticks(20)						
                   .tickSubdivide(true)
                   .tickSize(6, 3, 0)
                   .orient("left");
					}

                    // sort data alphabetically by region, so that the colors match with legend
                    node.sort(function(a, b) {
                        return d3.ascending(a.group, b.group);
                    })
                    var x0 = Math.max(-d3.min(node, function(d) {
                        return d.xval;
                    }), d3.max(node, function(d) {
                        return d.xval;
                    }));
					
                    x.domain([lx, mx]);
                    y.domain([ly, my]);

                   // var groups = svg.append("g").attr("transform", "translate(" + margin.l + "," + margin.t + ")");
                    var elem = svg.selectAll("circle")
                        .data(node);
						
                    var elemEnter = elem.enter()
                        .append("g")
                        .attr("transform", "translate(" + margin.l + "," + margin.t + ")");
                    // style the circles, set their locations based on data
                    var circles =
                        elemEnter.append("circle").style("opacity", .5)
                        .attr("class", "circles")
                        .attr({
                            cx: function(d) {
								//var rx =  x(d.xval);
								//console.log("rx...",rx);
								//var tx = x(+d.xval);
								//console.log("d...",d);
								//console.log("tx...",tx);
                                return x(+d.xval);
                            },
                            cy: function(d) {
                                return y(+d.yval);
                            },
                            r: function(d) {
                                //return (3 + (30 * (d.size / maxcount) * height / 450)) + 15;
                            	if(attr.setMaxMinExtents)
                            		{
                            	return sizeScale(d.size);
                            		}else{
                            			return (3 + (30 * (d.size / maxcount) * height / 450)) + 15;
                            		}
                            },
                            id: function(d) {
                                return d.subgroup;
                            }
                        })
                        .style("fill", function(d) {
                            return color(d.group);
                        })

                        .on("click", function(d) {
                            $(".tipsy").remove();
							var fieldName = sources.aggConfig.params.field.name;
                                    if(fieldName.includes(".csv")){
										fieldName = fieldName.replace(".csv", ".terms");
									}
									if(fieldName.includes(".raw")){
										fieldName = fieldName.replace(".raw", ".split");
									}
							 /* 	filterGen.add(
                                // The field to filter for, we can get it from the config
                            		sources.aggConfig.params.field, //data.series[0].values[0].aggConfig.vis.aggs.bySchemaName['group'][0].params.field,
                                // The value to filter for, we will read out the bucket key from the tag
                                d.subgroup,
                                // Whether the filter is negated. If you want to create a negated filter pass '-' here
                                null,
                                // The index pattern for the filter
                                sources.aggConfig.aggConfigs.indexPattern.id);  */
								
								const newFilters=esFilters.generateFilters(
      filters,
      sources.aggConfig.params.field,
      d.subgroup,
      null,
      sources.aggConfig.aggConfigs.indexPattern.id);
	  filters.addFilters(newFilters);

                        });

                    if (attr.showLabels) {
                        elemEnter.append("text")
                            .attr("x", function(d) {
                                return x(+d.xval);
                            })
                            .attr("y", function(d) {
                                return y(+d.yval);
                            })
                            .attr("dy", ".3em")
                            .style("text-anchor", "middle")
                            .style("cursor", "pointer")
                            .style("font-size", attr.setLabelSize+"px")
                            .text(function(d) {
                                return d.subgroup; //.substring(0, (30 * (d.size / maxcount) * height / 450) / 3)
                            })
                            .on("click", function(d) {
                                $(".tipsy").remove();
								var fieldName = sources.aggConfig.params.field.name;
                                    if(fieldName.includes(".csv")){
										fieldName = fieldName.replace(".csv", ".terms");
									}
									if(fieldName.includes(".raw")){
										fieldName = fieldName.replace(".raw", ".split");
									}
								 /* 	filterGen.add(
                                    // The field to filter for, we can get it from the config
                                		sources.aggConfig.params.field, //data.series[0].values[0].aggConfig.vis.aggs.bySchemaName['group'][0].params.field,
                                    // The value to filter for, we will read out the bucket key from the tag
                                    d.subgroup,
                                    // Whether the filter is negated. If you want to create a negated filter pass '-' here
                                    null,
                                    // The index pattern for the filter
                                    sources.aggConfig.aggConfigs.indexPattern.id); */ 
									
															const newFilters=esFilters.generateFilters(
      filters,
      sources.aggConfig.params.field,
      d.subgroup,
      null,
      sources.aggConfig.aggConfigs.indexPattern.id);
	  filters.addFilters(newFilters);

                            });
                        if (attr.addTooltip) {
                            elemEnter.call(tooltip.render());
                        }
                    }
                    // what to do when we mouse over a bubble
                    var mouseOn = function() {
                        var circle = d3.select(this);
                        // transition to increase size/opacity of bubble
                        circle.transition()
                            .duration(800).style("opacity", 1)
                            .attr("r", function(d) {
                                //return (3 + (30 * (d.size / maxcount) * height / 450)) + 15;
                            	//return sizeScale(d.size);
                            	if(attr.setMaxMinExtents)
                        		{
                        	return sizeScale(d.size);
                        		}else{
                        			return (3 + (30 * (d.size / maxcount) * height / 450)) + 15;
                        		}
                            }).ease("elastic");

                        // append lines to bubbles that will be used to show the precise data points.
                        // translate their location based on margins
                        svg.append("g")
                            .attr("class", "guide")
                            .append("line")
                            .attr("x1", circle.attr("cx"))
                            .attr("x2", circle.attr("cx"))
                            .attr("y1", +circle.attr("cy") + 26)
                            .attr("y2", height - margin.t - margin.b - 10) //-chd
                            .attr("transform", "translate(40,20)")
                            .style("stroke", circle.style("fill"))
                            .transition().delay(200).duration(400).styleTween("opacity",
                                function() {
                                    return d3.interpolate(0, .5);
                                })

                        svg.append("g")
                            .attr("class", "guide")
                            .append("line")
                            .attr("x1", +circle.attr("cx") - 16)
                            .attr("x2", 0)
                            .attr("y1", circle.attr("cy"))
                            .attr("y2", circle.attr("cy"))
                            .attr("transform", "translate(40,30)")
                            .style("stroke", circle.style("fill"))
                            .transition().delay(200).duration(400).styleTween("opacity",
                                function() {
                                    return d3.interpolate(0, .5);
                                });

                        // function to move mouseover item to front of SVG stage, in case
                        // another bubble overlaps it
                        d3.selection.prototype.moveToFront = function() {
                            return this.each(function() {
                                this.parentNode.appendChild(this);
                            });
                        };

                        // skip this functionality for IE9, which doesn't like it
                    };
                    // what happens when we leave a bubble?
                    var mouseOff = function() {
                        var circle = d3.select(this);

                        // go back to original size and opacity
                        circle.transition()
                            .duration(800).style("opacity", .5)
                            .attr("r", function(d) {
                                //return (3 + (30 * (d.size / maxcount) * height / 450)) + 15;
                                //return sizeScale(d.size);
                            	if(attr.setMaxMinExtents)
                        		{
                        	return sizeScale(d.size);
                        		}else{
                        			return (3 + (30 * (d.size / maxcount) * height / 450)) + 15;
                        		}
                            }).ease("elastic");
                        // fade out guide lines, then remove them
                        d3.selectAll(".guide").transition().duration(100).styleTween("opacity",
                                function() {
                                    return d3.interpolate(.5, 0);
                                })
                            .remove()
                    };
					// draw axes and axis labels
                    svg.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + margin.l + "," + (height - margin.t - margin.b + 10) + ")") //(h - 60 + margin.t) //(864 -60+ 30 =814)// - chd
                        .call(xAxis);
                    svg.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + margin.l + "," + margin.t + ")")
                        .call(yAxis);
                    svg.append("text")
                        .attr("class", "x label")
                        .attr("text-anchor", "end")
                        .attr("x", w + 50)
                        .attr("y", height - margin.t - margin.b) //h - margin.t - 5 // 864-30-5=829//- chd
                        .text(xlabel);
                    svg.append("text")
                        .attr("class", "y label")
                        .attr("text-anchor", "end")
                        .attr("x", -20)
                        .attr("y", 45)
                        .attr("dy", ".75em")
                        .attr("transform", "rotate(-90)")
                        .text(ylabel); 
                    // run the mouseon/out functions
                    circles.on("mouseover", mouseOn);
                    circles.on("mouseout", mouseOff);
                    if (attr.addTooltip) {
                        circles.call(tooltip.render());
                    }

                    if (attr.setGoals) {
                        var goalx = svg.append("g").attr("class", "y axis");
                        var goaly = svg.append("g").attr("class", "y axis");
                        goalx.append("line").attr("x1", x(attr.xGoal)).attr("x2", x(attr.xGoal)).attr("y1", y(0)).attr("y2", y(my)) //-chd
                            .attr("transform", "translate(40,30)").transition().delay(200).duration(400)
                            .style("fill", "none")
                            .style("stroke", "red")
                            .style("stroke-width", 4)
                            .style("stroke-dasharray", ("3, 3"))
                            .styleTween("opacity", function() {
                                return d3.interpolate(0, .5);
                            });
                        goaly.append("line").attr("x1", x(mx)).attr("x2", x(0)).attr("y1", y(attr.yGoal)).attr("y2", y(attr.yGoal)) //-chd
                            .attr("transform", "translate(40,30)")
                            .style("fill", "none")
                            .style("stroke", "red")
                            .style("stroke-width", 4)
                            .style("stroke-dasharray", ("3, 3"))

                            .transition().delay(200).duration(400).styleTween("opacity", function() {
                                return d3.interpolate(0, .5);
                            });
                        /**
                        if checked setGoalLabels then appending labels for Goal axis*/
                        if (attr.setGoalLabels) {
                            goaly.append("text")
                                .attr("class", "x label")
                                .attr("x", 12) //x(attr.xGoal)
                                .attr("y", y(attr.yGoal) - 6)
                                .attr("transform", "translate(40,30)")
                                .text(attr.yGoalLabel);
                            goalx.append("text")
                                .attr("class", "y label")
                                .attr("xlink:href", "#gy")
                                .attr("dy", ".35em")
                                .attr("x", -(height - margin.b - margin.l)) //-727
                                .attr("y", 50 + x(attr.xGoal))
                                .attr("transform", "rotate(270)")
                                .text(attr.xGoalLabel);
                        }

                    }
                    if (attr.showMid) {
                        // draw axes and axis labels
                        var xMid = svg.append("g").attr("class", "y axis");
                        var yMid = svg.append("g").attr("class", "y axis");
                        xMid.append("line").attr("x1", x(mx / 2)).attr("x2", x(mx / 2)).attr("y1", y(0)).attr("y2", y(my)) //-chd
                            .attr("transform", "translate(40,30)").transition().delay(200).duration(400)
                            .style("fill", "none")
                            .style("stroke", "grey")
                            .style("stroke-width", 4)
                            .style("stroke-dasharray", ("3, 3"))
                            .styleTween("opacity", function() {
                                return d3.interpolate(0, .5);
                            });
                        yMid.append("line").attr("x1", x(mx)).attr("x2", x(0)).attr("y1", y(my / 2)).attr("y2", y(my / 2)) //-chd
                            .attr("transform", "translate(40,30)")
                            .style("fill", "none")
                            .style("stroke", "grey")
                            .style("stroke-width", 4)
                            .style("stroke-dasharray", ("3, 3"))

                            .transition().delay(200).duration(400).styleTween("opacity", function() {
                                return d3.interpolate(0, .5);
                            });
                        /**
                        if checked setMidLabels then appending labels for Mid axis*/
                        if (attr.setMidLabels) {
                            yMid.append("text")
                                .attr("class", "x label")
                                .attr("x", 12) //x(attr.xGoal)
                                .attr("y", y(my / 2) - 6)
                                .attr("transform", "translate(40,30)")
                                .text(attr.yMidLabel);
                            xMid.append("text")
                                .attr("class", "y label")
                                .attr("xlink:href", "#gy")
                                .attr("dy", ".35em")
                                .attr("x", -(height - margin.b - margin.l)) //-727
                                .attr("y", 50 + x(mx / 2))
                                .attr("transform", "rotate(270)")
                                .text(attr.xMidLabel);
                        }

                    }

                    if (attr.showAvg) {
                        var total = 0;
                        var totaly = 0;
                        var avgX = svg.append("g").attr("class", "y axis");
                        var avgY = svg.append("g").attr("class", "y axis");
                        node.forEach(function(el) {
                            //var key = el.id;
                            //obj[key] = obj[key] || { count: 0, total: 0, avg: 0 };
                            //obj[key].count++;
                            total += el.xval;
                            totaly += el.yval;
                        });
                        if(node.length !=0)
						{ 
                        avgX.append("line").attr("x1", x(total / node.length)).attr("x2", x(total / node.length)).attr("y1", y(0)).attr("y2", y(my)) //-chd
                            .attr("transform", "translate(40,30)").transition().delay(200).duration(400)
                            .style("fill", "none")
                            .style("stroke", "green")
                            .style("stroke-width", 4)
                            .style("stroke-dasharray", ("3, 3"))
                            .styleTween("opacity", function() {
                                return d3.interpolate(0, .5);
                            });
                        avgY.append("line").attr("x1", x(mx)).attr("x2", x(0)).attr("y1", y(totaly / node.length)).attr("y2", y(totaly / node.length)) //-chd
                            .attr("transform", "translate(40,30)")
                            .style("fill", "none")
                            .style("stroke", "green")
                            .style("stroke-width", 4)
                            .style("stroke-dasharray", ("3, 3"))
                            .transition().delay(200).duration(400).styleTween("opacity", function() {
                                return d3.interpolate(0, .5);
                            });

                        if (attr.setAvgLabels) {
                            avgY.append("text")
                                .attr("class", "x label")
                                .attr("x", 12) //x(attr.xGoal)
                                .attr("y", y(totaly / node.length) - 6)
                                .attr("transform", "translate(40,30)")
                                .text(attr.yAvgLabel);
                            avgX.append("text")
                                .attr("class", "x label")
                                .attr("xlink:href", "#gy")
                                .attr("dy", ".35em")
                                .attr("x", -(height - margin.b - margin.l)) //-727
                                .attr("y", 50 + x(total / node.length))
                                .attr("transform", "rotate(270)")
                                .text(attr.xAvgLabel);
                        }
						}
                   }
                    if (attr.showMedian) {
                        var medX = svg.append("g").attr("class", "y axis");
                        var medY = svg.append("g").attr("class", "y axis");
                        medX.append("line").attr("x1", x(xmedian)).attr("x2", x(xmedian)).attr("y1", y(0)).attr("y2", y(my)) //-chd
                            .attr("transform", "translate(40,30)").transition().delay(200).duration(400)
                            .style("fill", "none")
                            .style("stroke", "blue")
                            .style("stroke-width", 4)
                            .style("stroke-dasharray", ("3, 3"))
                            .styleTween("opacity", function() {
                                return d3.interpolate(0, .5);
                            });
                        medY.append("line").attr("x1", x(mx)).attr("x2", x(0)).attr("y1", y(ymedian)).attr("y2", y(ymedian)) //-chd
                            .attr("transform", "translate(40,30)")
                            .style("fill", "none")
                            .style("stroke", "blue")
                            .style("stroke-width", 4)
                            .style("stroke-dasharray", ("3, 3"))

                            .transition().delay(200).duration(400).styleTween("opacity", function() {
                                return d3.interpolate(0, .5);
                            });
                        if (attr.setMedianLabels) {
                            medY.append("text")
                                .attr("class", "x label")
                                .attr("x", 12) //x(attr.xGoal)
                                .attr("y", y(ymedian) - 6)
                                .attr("transform", "translate(40,30)")
                                .text(attr.yMedianLabel);
                            medX.append("text")
                                .attr("class", "x label")
                                .attr("xlink:href", "#gy")
                                .attr("dy", ".35em")
                                .attr("x", -(height - margin.b - margin.l)) //-727
                                .attr("y", 50 + x(xmedian))
                                .attr("transform", "rotate(270)")
                                .text(attr.xMedianLabel);
                        }
                    }

				
                    

                    //self.addPathEvents(g1);

                    return svg;
                });
            };
        };
    }

/*    return ScatterbubbleChart;
};*/