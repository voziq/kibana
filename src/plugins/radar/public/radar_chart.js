import d3 from 'd3';
import _ from 'lodash';
import $ from 'jquery';
//import { ContainerTooSmall } from 'ui/errors';
import { Chart } from '../../vis_type_vislib/public/vislib/visualizations/_chart';
import { esFilters } from '../../data/public';
//import { VislibVisualizationsChartProvider } from 'ui/vislib/visualizations/_chart';
//import { FilterManagerProvider } from 'ui/filter_manager';
//import { FilterBarQueryFilterProvider } from 'ui/filter_manager/query_filter';
//import { getFilterGenerator } from 'ui/filter_manager';


    //const queryFilter = FilterBarQueryFilterProvider;
  //const filterGen = getFilterGenerator(queryFilter);

//export function VislibVisualizationsRadarProvider($rootScope, Private) {
	
  //  const Chart = Private(VislibVisualizationsChartProvider);
    //const filterManager = Private(FilterManagerProvider);
	
	

    /**
     * Radar Chart Visualization
     *
     * @class RadarChart
     * @constructor
     * @extends Chart
     * @param handler {Object} Reference to the Handler Class Constructor
     * @param el {HTMLElement} HTML element to which the chart will be appended
     * @param chartData {Object} Elasticsearch query results for this specific chart
     */
    export class RadarChart extends Chart {

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
              //  throw new ContainerTooSmall();
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
		
				var filters=this.chartData.filterManager;
			 return function(selection) {
                selection.each(function(data) {
                    //var graph = self.convertData(data);
					
					
                    var graph = data.series_data;
					var colorlabels = data.colorLabels;
					if(attr.setDocCount){
						let count = parseInt(attr.docCount.docMinCount);
						var filteredGraph = [];
						graph.map(function(path) {
							var tempPathArray = path;
							tempPathArray = tempPathArray.filter(function(node) {
							return node.value>=count;
							});
							filteredGraph.push(tempPathArray);
						});
						/* console.log("filteredGraph....");
						console.dir(filteredGraph); */
						graph = filteredGraph;  
					}
					/* var color =  d3.scale.ordinal()
					.domain(colorlabels)
					.range(['#00A1F1',
							'#7CBB00',
							'#F59F0D',
							'#F65314',
							'#041659',
							'#57156D',
							'#D80B8F',
							'#075447',//'#00B294',
							'#009E49',
							'#AA0B1E'
							]); */
					
					 var maxDataValue = d3.max(graph, function(i) {
							return d3.max(i.map(function(o) {
								return o.value;
							}))
						});
					//console.log("maxDataValue...",maxDataValue);
					var minDataValue = d3.min(graph, function(i) {
						return d3.min(i.map(function(o) {
							return o.value;
						}))
					});
					//console.log("minDataValue...",minDataValue);
					 ////////////////////////////////////////////////////////////// 
                    ////////////////////////// Data ////////////////////////////// 
                    ////////////////////////////////////////////////////////////// 
					var width = $(this).width();
                    var height = $(this).height();

                    self._validateContainerSize(width, height);
					var margin = {
                            top: 100,
                            right: 100,
                            bottom: 100,
                            left: 100
                        },
                        width = width - margin.left - margin.right, //Math.min(width, window.innerWidth) - margin.left - margin.right,
                        height = height - margin.top - margin.bottom; //Math.min(height, window.innerHeight) - margin.top - margin.bottom;

                    var minval = 0;
					//max in the data
                    var maxValue = Math.round(maxDataValue * 10) / 10;
					var radinterval = 0;
                    var Interval = 0;
                    var labelInterval = 0;

                    var cfg = {
                        w: width, //Width of the circle
                        h: height, //Height of the circle
                        margin: margin, //The margins of the SVG
                        levels: 5, //How many levels or inner circles should there be drawn
                        maxValue: 0, //What is the value that the biggest circle will represent
                        // minValue: 0,
                        labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
                        wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
                        opacityArea: 0.35, //The opacity of the area of the blob
                        dotRadius: 4, //The size of the colored circles of each blog//4
                        opacityCircles: 0.1, //The opacity of the circles of each blob
                        strokeWidth: 2, //The width of the stroke around each blob
                        roundStrokes: true, //If true the area and stroke will follow a round path (cardinal-closed)
                        color: color
                        // color: d3.scale.category10()	//Color function
                    };
					 if (attr.defaultYExtents) {
						 minval = Math.floor(minDataValue * 10) / 10;
					 }
					
					
                    var config = data.c_config;
                    var radarlegend = [];
                    radarlegend = data.colorLabels;//data.series;
                    var msize = radarlegend.length;
					var filteredMetrics = [];
                    var maxFontSize = 40,
                        minFontSize = 20;
                     var RadarDrawChart = function RadarChart(id, data, options) {
						 /* const radiusStep = ((self.chartData.radiusMaxVal - self.chartData.radiusMinVal) || (self.chartData.radiusMaxVal * 100)) / Math.pow(config.vis.params.radiusRatio, 2);
						  *///Put all of the options into a variable called cfg
                        if ('undefined' !== typeof options) {
                            for (var i in options) {
                                if ('undefined' !== typeof options[i]) {
                                    cfg[i] = options[i];
                                }
                            } //for i
                        } //if
						
                        //if supplied the radial min is set
                        if (attr.setRadialMin) {
                            minval = attr.radial.min;
							maxValue = attr.radial.max;
							for (var k = 0; k < data.length; k++) {
								var metric = data[k];
								var filteredpoints = [];
								for (var l = 0; l < metric.length; l++) {
									var point = metric[l];
									if (attr.radial.min <= point.value && point.value <= attr.radial.max) {
										filteredpoints.push(point);
									}
								}
								if (filteredpoints.length != 0) {
									filteredMetrics.push(filteredpoints);
								}
							}
							data = filteredMetrics;
						 }
						if (minval >= maxValue) {
                                minval = maxValue;
                                cfg.levels = 0;
                                Interval = 0;
                            } else {
                                Interval = (maxValue - minval) / cfg.levels;
							}
						
                            /* if(minval<maxValue && (maxValue-minval)<5 && (maxValue-minval)>0){
                            	 cfg.levels = maxValue-minval;
                            } */
                        var radius = Math.min(cfg.w / 2, cfg.h / 2); //Radius of the outermost circle
                        //Scale for the radius
                        var rScale = d3.scale.linear()
                            .range([0, radius])
                            .domain([minval, maxValue]);
                        //scale for axis & label
                        radinterval = rScale(maxValue * 1.1) - rScale(minval * 1.1);
                        labelInterval = rScale(maxValue * cfg.labelFactor) - rScale(minval * cfg.labelFactor);
                        if (data.length != 0) {
                            var allAxis = (data[0].map(function(i, j) {
                                    return i.axis
                                })), //Names of each axis
                                total = allAxis.length, //The number of different axes
                                Format = d3.format('%'), //Percentage formatting
                                angleSlice = Math.PI * 2 / total; //The width in radians of each "slice"

                            /////////////////////////////////////////////////////////
                            //////////// Create the container SVG and g /////////////
                            /////////////////////////////////////////////////////////

                            //Remove whatever chart with the same id/class was present before
                            d3.select(id).select("svg").remove();

                            //Initiate the radar chart SVG
                            var svg = d3.select(id).append("svg")
                                .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
                                .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
                                .attr("class", "radar" + id);
                            //Append a g element		
                            var g = svg.append("g")
                                .attr("transform", "translate(" + ((cfg.w / 2) + cfg.margin.left) + "," + ((cfg.h / 2) + cfg.margin.top) + ")");

                            /////////////////////////////////////////////////////////
                            ////////// Glow filter for some extra pizzazz ///////////
                            /////////////////////////////////////////////////////////

                            //Filter for the outside glow
                            var filter = g.append('defs').append('filter').attr('id', 'glow'),
                                feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur'),
                                feMerge = filter.append('feMerge'),
                                feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
                                feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

                            /////////////////////////////////////////////////////////
                            /////////////// Draw the Circular grid //////////////////
                            /////////////////////////////////////////////////////////

                            //Wrapper for the grid & axes
                            var axisGrid = g.append("g").attr("class", "axisWrapper");							
											var arr = [];
											var textArr=[];
											for (var i = 5; i >= 1; i--) {
												if (attr.setRadialMin || attr.defaultYExtents) {
													arr.push(Math.round((maxValue - Interval * i) * 10) / 10)
													textArr.push(Math.round((maxValue - Interval * i) * 10) / 10)
												} else {
													arr.push(Math.round(maxValue * i / 5 * 10) / 10)
													textArr.push(Math.round(maxValue * i / 5 * 10) / 10)

												}
											}
											if (attr.setMarkerValue) {
												arr.push(attr.docmarker.docMarkerCount)
											}
											
											arr.sort(function (a, b) {
												return b - a
											});
											
											var vrScale = d3.scale.linear().domain([textArr[0],textArr[textArr.length-1]]).range([(radius / cfg.levels * 5), (radius / cfg.levels * 1)]);
											
											if (attr.setMarkerValue) {											
											axisGrid.append("circle")
                                .attr("class", "gridCircle")
								.attr("id","testMobile")
                                .attr("r",vrScale(attr.docmarker.docMarkerCount))
                                .style("fill", "#CDCDCD")
								.style("stroke", "black")
                               // .style("stroke", "#CDCDCD")
								.style('opacity', cfg.opacityCircles)
                                //.style("fill-opacity", cfg.opacityCircles)
                                .style("filter", "url(#glow)")
								.style("stroke-width", "3");
								//axisGrid.append("text").attr("class", "axisLabel").attr("x", 4).attr("y", -vrScale(attr.docMarkerCount)).attr("dy", "0.4em").style("font-size", "10px").attr("fill", "#737373").text(attr.docMarkerCount);
								}
							
                            //Draw the background circles
                            axisGrid.selectAll(".levels")
                                .data(d3.range(1, (cfg.levels + 1)).reverse())
                                .enter()
                                .append("circle")
                                .attr("class", "gridCircle")
                                .attr("r", function(d, i) {
                                    return radius / cfg.levels * d;
                                })
                                .style("fill", "#CDCDCD")
								.style("stroke", "black")
                               // .style("stroke", "#CDCDCD")
								.style('opacity', cfg.opacityCircles)
                                //.style("fill-opacity", cfg.opacityCircles)
                                .style("filter", "url(#glow)");
                            //Text indicating at what % each level is
                            axisGrid.selectAll(".axisLabel")
                                .data(d3.range(1, (cfg.levels + 1)).reverse())
                                .enter().append("text")
                                .attr("class", "axisLabel")
                                .attr("x", 4)
                                .attr("y", function(d) {
                                    return -d * radius / cfg.levels;
                                })
                                .attr("dy", "0.4em")
                                .style("font-size", "10px")
                                //.style("font-size",14*(width/500)+"px")
                                .attr("fill", "#737373")
                                .text(function(d, i) {
                                    if (attr.setRadialMin || attr.defaultYExtents) {
                                        return Math.round((maxValue - (Interval * i)) * 10) / 10;
                                    } else {
                                        return Math.round((maxValue * d / cfg.levels) * 10) / 10;
                                    }
                                });

								
								if (attr.setMarkerValue) {							
								axisGrid.append("text").attr("class", "axisLabel").attr("x", 4).attr("y", -vrScale(attr.docmarker.docMarkerCount)).attr("dy", "0.4em").style("font-size", "10px").attr("fill", "#737373").text(attr.docmarker.docMarkerCount);
								}
								
                            /////////////////////////////////////////////////////////
                            //////////////////// Draw the axes //////////////////////
                            /////////////////////////////////////////////////////////

                            //Create the straight lines radiating outward from the center
                            var axis = axisGrid.selectAll(".axis")
                                .data(allAxis)
                                .enter()
                                .append("g")
                                .attr("class", "axis");
                            //Append the lines
                            axis.append("line")
                                .attr("x1", 0)
                                .attr("y1", 0)
                                .attr("x2", function(d, i) {
                                    if (attr.setRadialMin || attr.defaultYExtents) {
                                        return (Math.floor(radinterval * 10) / 10) * Math.cos(angleSlice * i - Math.PI / 2);
                                    } else {
                                        return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);
                                    }
                                })
                                .attr("y2", function(d, i) {
                                    if (attr.setRadialMin || attr.defaultYExtents) {
                                        return (Math.floor(radinterval * 10) / 10) * Math.sin(angleSlice * i - Math.PI / 2);
                                    } else {
                                        return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);
                                    }
                                })
                                .attr("class", "line")
                                .style("stroke", "white")
                                .style("stroke-width", "2px");
								
                            if (attr.labels.show) {
                                //Append the labels at each axis
                                axis.append("text")
                                    .attr("class", "legend")
                                    .style("font-size", "11px")
                                    .style("font-family", "Helvetica,Arial,sans-serif")
                                    //.style("font-size",15*(width/500)+"px")
                                    .attr("text-anchor", "middle")
                                    .attr("style", "cursor: pointer;")
                                    .attr("dy", "0.35em")
                                    .attr("x", function(d, i) {
                                        if (attr.setRadialMin || attr.defaultYExtents) {
                                            return (Math.floor(labelInterval * 10) / 10) * Math.cos(angleSlice * i - Math.PI / 2);
                                        } else {
                                            return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2);
                                        }
                                    })
                                    .attr("y", function(d, i) {
                                        if (attr.setRadialMin || attr.defaultYExtents) {
                                            if (cfg.levels == 0) {
                                                return 10;
                                            } else {
                                                return (Math.floor(labelInterval * 10) / 10) * Math.sin(angleSlice * i - Math.PI / 2);
                                            }
                                        } else {
                                            return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2);
                                        }
                                    })
                                    .text(function(d) {
                                        return d
                                    })
                                    .on("click", function(d) {
									
								 	var fieldName = config.params.field.name;
                                    /* if(fieldName.includes(".raw")){
										fieldName = fieldName.replace(".raw", ".split");
									}  */
                                        //filterManager.add(config.aggConfigs.bySchemaName['segment'][0].params.field,d,null,config.aggConfigs.indexPattern.id);
										
										
										 const newFilters=esFilters.generateFilters(
      filters,
      config.params.field.name,
      d,
      null,
      config.aggConfigs.indexPattern.id);
	  filters.addFilters(newFilters);
										
                                    })
                                    .call(wrap, cfg.wrapWidth);
                            }

                            /////////////////////////////////////////////////////////
                            ///////////// Draw the radar chart blobs ////////////////
                            /////////////////////////////////////////////////////////

                            //The radial line function
                            var radarLine = d3.svg.line.radial()
                                .interpolate("linear-closed")
                                .radius(function(d) {
                                    return rScale(d.value);
                                })
                                .angle(function(d, i) {
                                    return i * angleSlice;
                                });

                            if (cfg.roundStrokes) {
                                radarLine.interpolate("cardinal-closed");
                            }

                            //Create a wrapper for the blobs	
                            var blobWrapper = g.selectAll(".radarWrapper")
                                .data(data)
                                .enter().append("g")
                                .attr("class", "radarWrapper");
                            //Append the backgrounds	
                            blobWrapper
                                .append("path")
                                .attr("class", "radarArea")
                                .attr("d", function(d, i) {
                                    return radarLine(d);
                                })
                                .style("fill", function(d, i) {
									return cfg.color(colorlabels[i].label);
                                })
                                .style("fill-opacity", cfg.opacityArea)
                                .on('mouseover', function(d, i) {
                                    //Dim all blobs
                                    d3.select(this).selectAll(".radarArea")
                                        .transition().duration(200)
                                        .style("fill-opacity", 0.05);
                                    //Bring back the hovered over blob
                                    d3.select(this)
                                        .transition().duration(200)
                                        .style("fill-opacity", 0.7);
                                })
                                .on('mouseout', function() {
                                    //Bring back all blobs
                                    d3.selectAll(".radarArea") //.select(this)
                                        .transition().duration(200)
                                        .style("fill-opacity", cfg.opacityArea);
                                }); 
                            //Create the outlines	
                            blobWrapper.append("path")
                                .attr("class", "radarStroke")
                                .attr("d", function(d, i) {
                                    return radarLine(d);
                                })
                                .style("stroke-width", cfg.strokeWidth + "px")
                                .style("stroke", function(d, i) {
									 return cfg.color(colorlabels[i].label);
                                })
                                .style("fill", "none")
								.style('opacity', '1')
                                .style("filter", "url(#glow)");

                            //Append the circles
                            blobWrapper.selectAll(".radarCircle")
                                .data(function(d, i) {
                                    return d;
                                })
                                .enter().append("circle")
                                .attr("class", "radarCircle")
                                .attr("r",function(d,i){
									return Math.sqrt(attr.radiusRatio)+Math.sqrt(((d.radiVal*100)/self.chartData.radiusMaxVal)*height/600);
									})//cfg.dotRadius
                                .attr("cx", function(d, i) {
                                    return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
                                })
                                .attr("cy", function(d, i) {
                                    return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
                                })
                                .style("fill", function(d, i, j) {
									 return cfg.color(colorlabels[j].label);
                                })
								.style('opacity', '1');
                                //.style("fill-opacity", 0.8);

                            /////////////////////////////////////////////////////////
                            //////// Append invisible circles for tooltip ///////////
                            /////////////////////////////////////////////////////////

                            //Wrapper for the invisible circles on top
                            var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
                                .data(data)
                                .enter().append("g")
                                .attr("class", "radarCircleWrapper");

                            //Append a set of invisible circles on top for the mouseover pop-up
                            blobCircleWrapper.selectAll(".radarInvisibleCircle")
                                .data(function(d, i) {
                                    return d;
                                })
                                .enter().append("circle")
                                .attr("class", "radarInvisibleCircle")
                                .attr('fill', 'none')
                                .attr('stroke', function lineStroke(d, i,j) {
									return cfg.color(colorlabels[j].label);//cfg.color(d.label);
                                })
                                .attr('stroke-width', 0)
                                .attr("style", "cursor: pointer;")
								.attr("r", function(d,i){
									return Math.sqrt(attr.radiusRatio)+Math.sqrt(((d.radiVal*100)/self.chartData.radiusMaxVal)*height/600);
									})
								//.attr("r", cfg.dotRadius * 3) //1.5
                                .attr("cx", function(d, i) {
                                    return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
                                })
                                .attr("cy", function(d, i) {
                                    return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);

                                }) 
                                .style("fill", "none")
								//.style('opacity', '1')
                                .style("pointer-events", "all");

                            if (attr.addTooltip) {
                                g.selectAll(".radarInvisibleCircle").call(tooltip.render());
                            }

                             //Wraps SVG text	
                            function wrap(text, width) {
                                text.each(function() {
                                    var text = d3.select(this),
                                        words = text.text().split(/\s+/).reverse(),
                                        word,
                                        line = [],
                                        lineNumber = 0,
                                        lineHeight = 1.4, // ems
                                        y = text.attr("y"),
                                        x = text.attr("x"),
                                        dy = parseFloat(text.attr("dy")),
                                        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

                                    while (word = words.pop()) {
                                        line.push(word);
                                        tspan.text(line.join(" "));
                                        if (tspan.node().getComputedTextLength() > width) {
                                            line.pop();
                                            tspan.text(line.join(" "));
                                            line = [word];
                                            tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                                        }
                                    }
                                });
                            } //wrap	
                        }
                    } //RadarChart
                    var radarChartOptions = {
                        w: width,
                        h: height,
                        margin: margin,
                        maxValue: 0.5,
                        levels: cfg.levels, //5,
                        roundStrokes: true,
                        color: color
                    };
                    RadarDrawChart(this, graph, radarChartOptions);
                });
            };

        };
    };
    //return RadarChart;
//};