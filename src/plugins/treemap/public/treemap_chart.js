import d3 from 'd3';
import _ from 'lodash';
import $ from 'jquery';
//import { ContainerTooSmall } from 'ui/vislib/errors';
import { Chart } from '../../vis_type_vislib/public/vislib/visualizations/_chart';
//import { getFilterGenerator } from 'ui/filter_manager';
import { esFilters } from '../../data/public';
import * as d3Chromatic from './d3-scale-chromatic.v0.3.min';
import * as d4 from './d3';
/*
 * export function VislibVisualizationsTreemapProvider(Private) { const Chart =
 * Private(VislibVisualizationsChartProvider); const filterManager =
 * Private(FilterManagerProvider);
 */
    /**
	 * Treemap Chart Visualization
	 * 
	 * @class TreeMapChart
	 * @constructor
	 * @extends Chart
	 * @param handler
	 *            {Object} Reference to the Handler Class Constructor
	 * @param el
	 *            {HTMLElement} HTML element to which the chart will be appended
	 * @param chartData
	 *            {Object} Elasticsearch query results for this specific chart
	 */
    // _.class(TreemapChart).inherits(Chart);
 const d3ChromaticScale = d3Chromatic;
 var self =this;
 export  class TreemapChart extends Chart {
 
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


getScales=function(minRange, maxRange, min, max){
   var scales=[];             // Prepare some variables
   var ranges = maxRange+1 - minRange,   // Amount of elements to be
											// returned.
    range  = (max-min)/ranges;        // Difference between min and max
    for(var i = 0; i < ranges; i++){
        scales.push({
            range: i+minRange,        // Current range number
            min: (min + range * i).toFixed(2),
            max: (min + range * (i+1)).toFixed(2),
			colorValue: this.colorScale(i)
        });
    }
    
    return scales;
}

getScalesRanges = function (minRange, maxRange, colorRangeValues) {
    var scales = [];
    var ranges = colorRangeValues.length;
    // range = (max - min) / ranges;
    for (var i = 0; i < ranges; i++) {
        scales.push({
            range: i,
            min: colorRangeValues[i].from,
            max: colorRangeValues[i].to,
            colorValue: this.colorScale(i)
        })
    }
    return scales
};

inCustomRange = function(x,colorRangeValues){
	var val = false;	
	for (var i = 0; i < colorRangeValues.length; i++) {
	if((x - colorRangeValues[i].from) * (x - colorRangeValues[i].to) <= 0)
{
	return (x - colorRangeValues[i].from) * (x - colorRangeValues[i].to) <= 0;
}
}
return val;
}

inRange=function(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}

getcolorFuncValue=function(val,scaleValues){
for(var i=0;i<scaleValues.length;i++){
if(this.inRange(val,scaleValues[i].min,scaleValues[i].max)){
return scaleValues[i].colorValue;
}
}
}


        /**
		 * Renders d3 visualization
		 * 
		 * @method draw
		 * @returns {Function} Creates the pie chart
		 */
        draw() {
			
			
            self = this;
            var color = this.handler.data.getColorFunc();
            var tooltip = this.tooltip;
			var options = self.handler.visConfig._values;
			//const filterGen = getFilterGenerator(this.chartData.queryFilter);
			
			var filter=this.chartData.filterManager;
            // convert label first letter to uppercase
            function uppercase(e) {
                for (var r = e.split(" "), p = [], t = 0; t < r.length; t++) p.push(r[t].charAt(0).toUpperCase() + r[t].slice(1));
                return p.join(" ")
            }
			
			//console.dir("self");
			//console.dir(self);

            return function(selection) {
                selection.each(function(data) {
				
					var sources = [];
					var lengthValue="";
                    sources = data.series_data;
					// color related code
				
					sources.map((function (o) {
						
						
						if(options.groupColors){
							lengthValue = sources.length * o.children.length
						}else{
							lengthValue = Math.max.apply(Math, sources.map((function (q) {
                                return q.children.length;
                            })));
						}
					
						if (!options.invertColors) {
                            if (options.colorSchema === "Yellow to Red") {
                                self.colorScale = d4.scaleSequential(d3ChromaticScale["interpolateYlOrRd"]).domain([-1, lengthValue])
                            } else if (options.colorSchema === "Green to Red") {
                                self.colorScale = d4.scaleLinear().domain([-1, lengthValue]).range(["lightgreen", "red"]).interpolate(d4.interpolateRgb)
                            } else if (options.colorSchema === "Greens") {
                                self.colorScale = d4.scaleLinear().domain([-1, lengthValue]).range(["lightgreen", "darkgreen"]).interpolate(d4.interpolateRgb)
                            } else if (options.colorSchema === "Blues") {
                                self.colorScale = d4.scaleLinear().domain([-1, lengthValue]).range(["lightblue", "darkblue"]).interpolate(d4.interpolateRgb)
                            } else if (options.colorSchema === "Greys") {
                                self.colorScale = d4.scaleLinear().domain([-1, lengthValue]).range(["#C0C0C0", "#404040"]).interpolate(d4.interpolateRgb)
                            }
							else if (options.colorSchema === "Reds") {
                                self.colorScale = d4.scaleLinear().domain([-1, lengthValue]).range(["#ff0000", "#8b0000"]).interpolate(d4.interpolateRgb)
                            }
                        } else {
							
							
                            if (options.colorSchema === "Yellow to Red") {
                                self.colorScale = d4.scaleSequential(d3ChromaticScale["interpolateYlOrRd"]).domain([lengthValue, -1])
                            } else if (options.colorSchema === "Green to Red") {
                                self.colorScale = d4.scaleLinear().domain([lengthValue, -1]).range(["lightgreen", "red"]).interpolate(d4.interpolateRgb)
                            } else if (options.colorSchema === "Greens") {
                                self.colorScale = d4.scaleLinear().domain([lengthValue, -1]).range(["lightgreen", "darkgreen"]).interpolate(d4.interpolateRgb)
                            } else if (options.colorSchema === "Blues") {
                                self.colorScale = d4.scaleLinear().domain([lengthValue, -1]).range(["lightblue", "darkblue"]).interpolate(d4.interpolateRgb)
                            } else if (options.colorSchema === "Greys") {
                                self.colorScale = d4.scaleLinear().domain([lengthValue, -1]).range(["#C0C0C0", "#404040"]).interpolate(d4.interpolateRgb)
                            }
							else if (options.colorSchema === "Reds") {
                                self.colorScale = d4.scaleLinear().domain([lengthValue, -1]).range(["#ff0000", "#8b0000"]).interpolate(d4.interpolateRgb)
                            }
                        }
									
			
													
													o.scaleValues="";
													if (o.colorValue != undefined) {
														if(options.setColorRange && options.groupColors){
															o.scaleValues = self.getScales(0, lengthValue - 1, Math.min.apply(Math,sources.map((function(q){
																			return Math.min.apply(Math,q.children.map((function(v){																					
																				return v.colorValue;
																			})))
																		}))), Math.max.apply(Math,sources.map((function(q){
																			return Math.max.apply(Math,q.children.map((function(v){																					
																				return v.colorValue;
																			})))
																		}))));																			
																	
                                                        o.children.map((function (p) {
                                                                p.scaleValues = "";
                                                                p.scaleValues = self.getScales(0, lengthValue - 1, Math.min.apply(Math,sources.map((function(q){
																			return Math.min.apply(Math,q.children.map((function(v){																					
																				return v.colorValue;
																			})))
																		}))), Math.max.apply(Math,sources.map((function(q){
																			return Math.max.apply(Math,q.children.map((function(v){																					
																				return v.colorValue;
																			})))
																		}))))
                                                            }))
														}else{
                                                        o.scaleValues = self.getScales(0, lengthValue - 1, Math.min.apply(Math, sources.map((function (p) {
                                                                            return p.colorValue
                                                                        }))), Math.max.apply(Math, sources.map((function (p) {
                                                                            return p.colorValue
                                                                        }))));
                                                        o.children.map((function (p) {
                                                                p.scaleValues = "";
                                                                p.scaleValues = self.getScales(0, lengthValue - 1, Math.min.apply(Math, o.children.map((function (p) {
                                                                                    return p.colorValue
                                                                                }))), Math.max.apply(Math, o.children.map((function (p) {
                                                                                    return p.colorValue
                                                                                }))))
                                                            }))
														}
                                                    } else {
														if(options.setColorRange && options.groupColors){
															o.scaleValues = self.getScales(0, lengthValue - 1, Math.min.apply(Math,sources.map((function(q){
																			return Math.min.apply(Math,q.children.map((function(v){																					
																				return v.size;
																			})))
																		}))), Math.max.apply(Math,sources.map((function(q){
																			return Math.max.apply(Math,q.children.map((function(v){																					
																				return v.size;
																			})))
																		}))));																			
																	
                                                        o.children.map((function (p) {
                                                                p.scaleValues = "";
                                                                p.scaleValues = self.getScales(0, lengthValue - 1, Math.min.apply(Math,sources.map((function(q){
																			return Math.min.apply(Math,q.children.map((function(v){																					
																				return v.size;
																			})))
																		}))), Math.max.apply(Math,sources.map((function(q){
																			return Math.max.apply(Math,q.children.map((function(v){																					
																				return v.size;
																			})))
																		}))))
                                                            }))
														}else{
                                                        o.scaleValues = self.getScales(0, lengthValue - 1, Math.min.apply(Math, sources.map((function (p) {
                                                                            return p.size
                                                                        }))), Math.max.apply(Math, sources.map((function (p) {
                                                                            return p.size
                                                                        }))));																			
																	
                                                        o.children.map((function (p) {
                                                                p.scaleValues = "";
                                                                p.scaleValues = self.getScales(0, lengthValue - 1, Math.min.apply(Math, o.children.map((function (p) {																						
                                                                                    return p.size
																}))), Math.max.apply(Math, o.children.map((function (p) {
                                                                                    return p.size
																}))))
                                                            }))
														}
                                                    }
												}));																
					
                    var maxFontSize = 40,
                        minFontSize = 20;
                    var width = $(this).width();
                    var height = $(this).height();
                    var root = [];
                    root.push({
                        "name": "flare",
                        "children": sources
                    });

                    /**
					 * width legend auto response code
					 */
                    var margin = {
                        t: 30,
                        r: 20,
                        b: 20,
                        l: 40
                    };

                    var w = width - margin.l - margin.r,
                        h = height - margin.t - margin.b;
                    self._validateContainerSize(width, h);

                    if(options.treemapSortOption == 'descending'){
                    var treemap = d3.layout.treemap().size([width, height]).sticky(true).sort(function(a,b) {
                        return a.value - b.value;
                    }).value((function (d) {
                                                            return d.size
                                                        }));
                    }
                    else{
						var treemap = d3.layout.treemap().size([width, height]).sticky(true).value((function (d) {
                                return d.size
                            }));
					}

                    var div = d3.select(this).append("div")
						.style("position", "relative")//
                        .style("width", width + "px")// (w + margin.l +
														// margin.r)
                        .style("height", height + "px")// (height - 10) //-
														// 20//- chd
                        /*
						 * .style("left", margin.l + "px") .style("top",
						 * margin.t + "px")
						 */;								

                    for (var i = 0; i < root.length; i++) {						
                        var node = div.datum(root[i]).selectAll(".node")
                            .data(treemap)
                            .enter().append("div")
                            .attr("class", "node")
                            .call(position)                            
                            .style("background", function(d) {
                            	if (d.gvalue) {
                                    this.style.border = "solid 3px black"
									this.style.pointerEvents = "none";
                                        this.style.zIndex = "1";
                                }
								
								
								// this.getcolorFuncValue(row[colorSchemaMetric])
								/*if (!options.showGroupLabels && options.setColorRange) {
														if (d.gvalue) {
														this.style.width = 0;
														this.style.height = 0;														
														}
													}
														else{
															if (d.gvalue && options.setColorRange) {
                                                                        this.style.pointerEvents = "none";
                                                                        this.style.zIndex = "1";
																		this.style.border = "solid 2px gray";
                                                                    }else if(options.setColorRange){
                                                                    	if(options.groupColors){
                                                                            this.style.border = "solid 1px white"
    																		}else{
    																		this.style.border = "solid 0px gray"	
    																		}
																	}
														}*/
                            	if (d.scaleValues != undefined && options.setColorRange) {
                                    if (d.colorValue != undefined) {
                                      
                                        return d.children ? null : self.getcolorFuncValue(d.colorValue, d.scaleValues)
                                    } else {
                                     
                                        return d.children ? null : self.getcolorFuncValue(d.value, d.scaleValues)
                                    }
                                } else {
									
									
                                    return d.children ? null : color(d.parent.name)
                                }
                                
                            })
                            .on("click", function(d) {
								
                                if (data.series_data.length != 0) {
									/*
									 * var fieldName =
									 * data.series_data[0].fieldname;
									 * if(fieldName.includes(".csv")){ fieldName =
									 * fieldName.replace(".csv", ".terms"); }
									 * if(fieldName.includes(".raw")){ fieldName =
									 * fieldName.replace(".raw", ".split"); }
									 */
									
                                const newFilters=esFilters.generateFilters(
      filter,
      d.fieldname,
      d.name,
      null,
      data.series_data[0].aggConfig.aggConfigs.indexPattern.id);
	  filter.addFilters(newFilters);
    
                                	/*filterGen.add(
                                        // The field to filter for, we can get
										// it from the config
                                    	d.fieldname,
                                    	// data.series_data[1].aggConfig.vis.aggs.bySchemaName['group'][0].params.field,
                                       // data.series_data[0].aggConfig.vis.aggs.bySchemaName['segment'][0].params.field,
                                        // The value to filter for, we will read
										// out the bucket key from the tag
                                        d.name,
                                        // Whether the filter is negated. If you
										// want to create a negated filter pass
										// '-' here
                                        null,
                                        // The index pattern for the filter
                                        // data.series_data[0].index.id);
                                        data.series_data[0].aggConfig.aggConfigs.indexPattern.id);*/
                                }
                            });
							
                        /*if (options.showLabels && options.showGroup2Labels) {
                            node.text(function(d) {
								if(d.gvalue){																	 
											this.style.display="table";																	
											}
                                return d.children ? null : d.name;
                            }).style("font-size",parseInt(options.setGroup2LabelSize)+"px");
                        }*/
						
                                                        node.append("text")
														.call(position)														
														.attr("text-anchor", "middle").attr("dy", ".3em").text((function (d) {															
															if(options.showLabels && options.showGroupLabels && d.gvalue) {
																
                                                                this.style.display = "table-cell";
                                                                this.style.verticalAlign = "middle";
                                                                this.style.fontSize = parseInt(options.setGroupLabelSize) + Math.sqrt(Math.min(this.style.height.replace("px", ""), this.style.width.replace("px", ""))) + "px";
                                                                this.style.textAlign = "center";
                                                                this.style.opacity = .5;
                                                                this.style.color = "black";
                                                                this.style.textShadow = "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff";
                                                                return d.name
                                                            }else{
															if(options.showLabels && options.showGroup2Labels) {
																if(!d.gvalue) {
																this.style.display = "table-cell";
                                                                this.style.verticalAlign = options.setGroup2Position;
																this.style.textAlign = "center";
																this.style.fontSize = parseInt(options.setGroup2LabelSize)+"px";
																return d.name
																}
															}
															}
                                                            }))
                                                    
															
                        d3.selectAll("input").on("change", function change() {
                            var value = this.value === "count" ?function() {return 1;} :function(d) {return d.size;};
                            node.data(treemap.value(value).nodes)
                                .transition()
                                .duration(1500)
                                .call(position);
                        });
                        if (options.addTooltip) {
                            node.call(tooltip.render());
                        } 


                        var colorlabels = [];
                        for (var i = 0; i < sources.length; i++) {
                            colorlabels.push(sources[i].name);
                        }
                        // self.addPathEvents(div);

                    }

                    function position() {
                        this.style("left", function(d) {
                                return d.x + "px";
                            })
                            .style("top", function(d) {
                                return d.y + "px";
                            })
                            .style("width", function(d) {

                                return Math.max(0, d.dx) + "px";
                            })
                            .style("height", function(d) {
                                return Math.max(0, d.dy) + "px";
                            }).style("color", "white");
                    }
                });

            };
        };
    };
   /*
	 * return TreemapChart; };
	 */