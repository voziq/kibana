import d3 from 'd3';
import _ from 'lodash';
import $ from 'jquery';
//import { ContainerTooSmall } from 'ui/errors';
import { Chart } from '../../vis_type_vislib/public/vislib/visualizations/_chart';
import { esFilters } from '../../data/public';


   
    /**
     * Bubble chart visualization
     *
     * @class AreaChart
     * @constructor
     * @extends Chart
     * @param handler {Object} Reference to the Handler Class Constructor
     * @param el {HTMLElement} HTML element to which the chart will be appended
     * @param chartData {Object} Elasticsearch query results for this specific
     * chart
     */
    export class BubbleChart extends Chart {
		
        constructor(handler, chartEl, chartData, deps) {
            super(handler, chartEl, chartData, deps);
			
            var charts = this.handler.data.getVisData();
            $(this).html("");
        }

        _validateContainerSize(width, height) {
            var minWidth = 200;
            var minHeight = 200;

            if (width <= minWidth || height <= minHeight) {
              //  throw new ContainerTooSmall();
            }
        };
        addPathEvents(element) {
            var events = this.events;
            return element
                .call(events.addHoverEvent())
                .call(events.addMouseoutEvent())
                .call(events.addClickEvent());
        };

        /**
         * Renders d3 visualization
         *
         * @method draw
         * @returns {Function} Creates the area chart
         */
		 
		
        draw() {
			// var Private;
		 //Private=this.handler.data.data.series[0].values[0].xRaw.table.Private;		
			
var filter=this.chartData.filterManager;
			
            // Attributes
			
            const self = this;
			var options = self.handler.visConfig._values;
            var color = this.handler.data.getColorFunc();			
            //font-family:Helvetica,Arial,sans-serif;
            var tooltip = this.tooltip;
            return function(selection) {
                selection.each(function(data) {
		
				
                    if (data.series.length != 0 && data.series[0].label != "Count") {
                        var graph = data.series; //self.convertData(data);		  
                        //convert label first letter to uppercase
					
                        function uppercase(e) {						
                            for (var r = e.split(" "), p = [], t = 0; t < r.length; t++) p.push(r[t].charAt(0).toUpperCase() + r[t].slice(1));
                            return p.join(" ")
                        }
                        var width = $(this).width();
                        var height = $(this).height();
					
                        self._validateContainerSize(width, height);
                        var diameter = 500,
                            format = d3.format(",d");
                        //d3.scale.category20c();

                        var bubble = d3.layout.pack()
                            .sort(null)
                            .size([width, height])
                            .padding(1.5);

                        var svg = d3.select(this).append("svg")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("align", "center")
                            .attr("class", "bubble");
					
                        var node = svg.selectAll(".node")
                            .data(bubble.nodes(classes(graph))
                                .filter(function(d) {
							
                                    return !d.children;
                                }))
                            .enter().append("g")
                            .on("click", function(d) {
                               if (data != undefined) {	

									var fieldName = data.series_data[0].aggConfig.params.field.name;
									
									if(fieldName.includes(".csv")){
										fieldName = fieldName.replace(".csv", ".terms");
									}
									if(fieldName.includes(".raw")){
										fieldName = fieldName.replace(".raw", ".split");
									}
									
								/*  	//console.dir(fieldName);
                                    filterGen.add( // The field to filter for, we can get it from the config			
                                    		data.series_data[0].aggConfig.params.field, //data.series[0].values[0].aggConfig.vis.aggs.bySchemaName['group'][0].params.field,
                                        // The value to filter for, we will read out the bucket key from the tag
                                        d.label.replace(/,/g,''),
                                        // Whether the filter is negated. If you want to create a negated filter pass '-' here
                                        null,
                                        // The index pattern for the filter
                                       data.series_data[0].aggConfig.aggConfigs.indexPattern.id);  */
									   
									   
									                       const newFilters=esFilters.generateFilters(
      filter,
      data.series_data[0].aggConfig.params.field,
     d.label.replace(/,/g,''),
      null,
      data.series_data[0].aggConfig.aggConfigs.indexPattern.id); 
	  filter.addFilters(newFilters);

                                }

                            })
                            //.attr("class", "node")
                            .attr("style", "cursor: pointer;")
                            .attr("transform", function(d) {
								
                                return "translate(" + d.x + "," + d.y + ")";
                            });
							
                        var gnode = node.append("circle")
                            .attr("r", function(d) {
								
                                return d.r;
                            })
                            .style("opacity", "1")
                            .style("fill", function(d) {
								
                                return color(d.rawK);
                            });
                        if (options.labels.show) {
                            node.append("text")
                                .attr("dy", ".3em")
                                .style("text-anchor", "middle")
                                .style("fill", "white")
                                .text(function(d) {
                                    return d.label.substring(0, d.r / 4);
                                });
                        }


                        if (options.addTooltip) {
                            node.call(tooltip.render());
                        }

                        function classes(root) {
							
                            var classes = [];
                            var obj = root;
							
                            for (var pop in obj) {
                            	if(obj[pop].label !==""){
                                classes.push({
                                    packageName: obj[pop].label,
                                    label: obj[pop].label,
                                    value: obj[pop].values[0].y,
                                    rawK: obj[pop].label,
                                    seriesType: obj
                                });

                            }
                            }

                            return {
                                children: classes
                            };
                        }
                        d3.select(self.frameElement).style("height", height + "px");
                        //self.addPathEvents(gnode);
                    }
                });
            };
        };
    }

   