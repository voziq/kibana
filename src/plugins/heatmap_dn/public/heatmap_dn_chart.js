import d3 from 'd3';
import _ from 'lodash';
import $ from 'jquery';
import { Chart } from '../../vis_type_vislib/public/vislib/visualizations/_chart';
import { esFilters } from '../../data/public';
//import { getFilterGenerator } from 'ui/filter_manager';
//import { ContainerTooSmall } from 'ui/vislib/errors';
/*import { ContainerTooSmall } from 'ui/errors';
import { VislibVisualizationsChartProvider } from 'ui/vislib/visualizations/_chart';
import { FilterManagerProvider } from 'ui/filter_manager';*/
/*export function VislibVisualizationsHeatMap_dnProvider(Private) {
	const Chart = Private(VislibVisualizationsChartProvider);
	const filterManager = Private(FilterManagerProvider);
*/
	/**
	 * HeatMap Chart Visualization
	 *
	 * @class HeatMapChart
	 * @constructor
	 * @extends Chart
	 * @param handler {Object} Reference to the Handler Class Constructor
	 * @param el {HTMLElement} HTML element to which the chart will be appended
	 * @param chartData {Object} Elasticsearch query results for this specific chart
	 */

	export class HeatMap_dnChart extends Chart {
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
		if (width <= minWidth || height <= minHeight){
				//throw new ContainerTooSmall();
			}
		};
		convertData(data) {
			var graph = {};
			var nodesX = [];
			var nodesY = [];
			var sources = [];
			try {
				sources = data.c_sources;
			} catch (e) {
				return;
			}
			
			
			var indexOfObj = function (objArray, day, hour) {
				return objArray.indexOf(objArray.filter(function (obj) {
						return obj.day == day && obj.hour == hour;
					})[0]);
			}
			var data = [];
			var dataRaw = [];
			sources.map(function (bucket) {
				var xValue = (bucket[0].value + "").split('"').join('');
				var yValue = (bucket[0].value + "").split('"').join('');

				if (bucket.length > 1) {
					var pValue = bucket[1].value;
					if (bucket.length == 3) {
						var yValue = (bucket[1].value + "").split('"').join('');
						var pValue = bucket[2].value;
					}

					var xnames = xValue.split(",");
					//console.dir(xnames);
					xnames.map(function (x) {
						var xIndex = nodesX.indexOf(x);
						if (xIndex == -1) {
							nodesX.push(x);
							xIndex = nodesX.indexOf(x);
						}
						var ynames = yValue.split(",");
						//console.dir(ynames);
						ynames.map(function (y) {
							var yIndex = nodesY.indexOf(y);
							if (yIndex == -1) {
								nodesY.push(y);
								yIndex = nodesY.indexOf(y);
							}
							var objIndex = indexOfObj(dataRaw, xIndex + 1, yIndex + 1);
							if (objIndex == -1) {
								dataRaw.push({
									"day": xIndex + 1,
									"hour": yIndex + 1,
									"value": pValue,
									"dhcnt": 1,
									"x": x,
									//"vh": metricLabel, 
									"y": y
								});
							} else {
								var obj = dataRaw[objIndex];
								obj.value = obj.value + pValue;
								obj.dhcnt = obj.dhcnt + 1;
								dataRaw[objIndex] = obj;
							}
						});
					});
				}
			});
			dataRaw.map(function (obj) {
				obj.value = parseInt(obj.value / obj.dhcnt)
					data.push({
						"day": obj.day,
						"hour": obj.hour,
						"value": obj.value,
						"x": obj.x,
						//"vh": obj.vh,
						"y": obj.y
					});
			});
			var dobj = data[0];
			for (var i = 1; i <= nodesX.length; i++) {
				for (var j = 1; j <= nodesY.length; j++) {
					var indexVal = indexOfObj(data, i, j);
					if (indexVal == -1) {
						data.push({
							"day": i,
							"hour": j,
							"value": 0,
							"x": nodesX[i - 1],
							"y": nodesY[j - 1]/* ,
							//"vh": dobj.vh */
						});
					}
				}
			}
			graph.data = data;
			graph.nodesX = nodesX;
			graph.nodesY = nodesY;
			//console.dir("processed data");
			//console.dir(graph);
			return graph;
		};
		
		
		/**
		 * Renders d3 visualization
		 *
		 * @method draw
		 * @returns {Function} Creates the pie chart
		 */
		draw() {
			const self = this;
			var tooltip = this.tooltip;
			var options = self.handler.visConfig._values;
			//const filterGen = getFilterGenerator(this.chartData.queryFilter);
			var filter=this.chartData.filterManager;
			return function (selection) {
				selection.each(function (data_main) {
					/** @Variables definations
					*/
					var dataRaw = self.convertData(data_main);
					var data1 = dataRaw.data;
					var days = dataRaw.nodesX;
					var configg = data_main.c_config;
					var times = dataRaw.nodesY;
					//console.log("days...",days);
					//console.log("times...",times);
					if(days.length==0||times.length==0){
						return;
					}
					var xlongest = days.reduce(function (a, b) { return a.length > b.length ? a : b; });
					var ylongest = times.reduce(function (a, b) { return a.length > b.length ? a : b; });
					console.log("xlongest...",xlongest);
					console.log("ylongest...",ylongest);
					var xtran = xlongest.length*7,
					ytran = ylongest.length*7;
					//console.dir("dataRaw");
					//console.dir(dataRaw);
					var data = [];
					var width = $(this).width();
					var height = $(this).height();
					
					/** @widget validation
					*/
					self._validateContainerSize(width, height);
					if (width <= xtran || height <= ytran){
						throw new ContainerTooSmall();
					}
					/** @margin definations
					*/
					var margin = {
						top: ytran,
						right: 10,
						bottom: 70,
						left: xtran
					},
					width = width - margin.left - margin.right,
					height = height - margin.top - margin.bottom,
					hc = Math.floor(height/days.length),
					wc = Math.floor(width / times.length),
					gridSize = Math.min(hc,wc),
					bucketSize = options.range,
					//legendElementWidth = (times.length * gridSize) / bucketSize,
					//buckets = bucketSize,
					colors1 = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"]; 
					//console.log("gridSize....",gridSize);
					if(gridSize <5) throw new ContainerTooSmall();
					if(gridSize > 70) gridSize = 70;
					/* if(xtran<gridSize*times.length && xtran>180) xtran=180;
					if(ytran<gridSize*days.length&& ytran>180) ytran=180; */
					/** @MaxMin definations
					*/
					var minD = d3.min(data1, function (d) {
							return d.value;
						});
					var maxD = d3.max(data1, function (d) {
							return d.value;
						});
					if ((maxD - minD) < bucketSize) {
						minD = minD - (bucketSize - (maxD - (minD + 1)));
						if (minD < 0) {
							minD = 0;
						}
					}
					if (maxD < bucketSize) {
						maxD = bucketSize - 1;
					}
					if (options.setMaxMin) {
						minD = options.maxmin.minVal;
						maxD = options.maxmin.maxVal;
					}
					
					/** @Data filtering according to MaxMin
					*/
					data1.map(function (obj) {
						if (minD <= obj.value && obj.value <= maxD) { 
							data.push(obj);
						}
					});
					//colorbrewer.YlGnBu[9]
					var colors = colors1.slice(colors1.length - bucketSize, colors1.length);
					var legendElementWidth = (times.length * gridSize) / bucketSize;
					
					/** Drawing the chart starts.
					*/
					var svg = d3.select(this).append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(" + xtran + "," +ytran + ")");
						
						/** @ constructing labels first.(if showlabels enabled)
						*/
						if (options.labels.show) {
							var dayLabels = svg.selectAll(".dayLabel")
								.data(days)
								.enter().append("text")
								.text(function (d) {
									return d;
								})
								.attr("x", 0)
								.attr("y", function (d, i) {
									return i * gridSize;
								})
								.style("text-anchor", "end")
								.attr("transform", "translate(-6," + gridSize / 1.5 + ")")
								.attr("class", function (d, i) {
									return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis axis-workweek");
								});

							var timeLabels = svg.selectAll(".timeLabel")
								.data(times)
								.enter().append("text")
								.text(function (d) {
									return d;
								})
								.style("text-anchor", "start")
								.attr("transform", function (d, i) {
									return "translate(" + (i * gridSize) + ",0)" +
									"translate(" + gridSize / 2 + ", -6)rotate(-90)";
								})
								.style("text-anchor", "start")
								.attr("class", function (d, i) {
									return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis axis-worktime");
								});
						}
						
					/** @ colors scaling based on max min.
					*/
					var colorScale = d3.scale.quantile()
						//.domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
						.domain([minD,
								maxD
							])
						.range(colors);

					var cards = svg.selectAll(".hour")
						.data(data, function (d) {
							return d.day + ':' + d.hour;
						});
					//cards.append("title");
					var font = 12;
					cards.enter().append("g");
					cards.append("rect")
					
						/** @ appending onclick & passing values by calling filtermanager to apply filter.
						*/
						.on("click", function (d) {
							var obj1 = null;
							var obj2 = null;
							if (configg.aggConfigs.aggs.length == 2) {
								//obj1 = configg.aggConfigs.bySchemaGroup['buckets'][0];
								obj1 = configg.aggConfigs.aggs[1];
                                obj2 = configg.aggConfigs.aggs[1]
								//obj2 = configg.aggConfigs.bySchemaGroup['buckets'][0];
							} else {
								 obj1 = configg.aggConfigs.aggs[1];
                                 obj2 = configg.aggConfigs.aggs[2]
								//obj1 = configg.aggConfigs.bySchemaGroup['buckets'][0];
								//obj2 = configg.aggConfigs.bySchemaGroup['buckets'][1];
							}
							var fieldName1 = obj1.params.field.name;
							if(fieldName1.includes(".csv"))fieldName1 = fieldName1.replace(".csv", ".terms");
							if(fieldName1.includes(".raw"))fieldName1 = fieldName1.replace(".raw", ".split");
							
							var fieldName2 = obj2.params.field.name;
							if(fieldName2.includes(".csv"))fieldName2 = fieldName2.replace(".csv", ".terms");
							if(fieldName2.includes(".raw"))fieldName2 = fieldName2.replace(".raw", ".split");
							const newFilters=esFilters.generateFilters(
      filter,
      obj1.params.field,
      days[d.day - 1],
      null,
      configg.aggConfigs.indexPattern.id);
	  filter.addFilters(newFilters);
	  
	  
	  const newFilters1=esFilters.generateFilters(
      filter,
      obj2.params.field,
      times[d.hour - 1],
      null,
      configg.aggConfigs.indexPattern.id);
	  filter.addFilters(newFilters1);
	  
							//filterGen.add(obj1.params.field, days[d.day - 1],null,configg.aggConfigs.indexPattern.id);
							//filterGen.add(obj2.params.field, times[d.hour - 1],null,configg.aggConfigs.indexPattern.id);
						})
					
					.attr("x", function (d) {
						return (d.hour - 1) * gridSize;
					})
					.attr("y", function (d) {
						return (d.day - 1) * gridSize;
					})
					.attr("rx", 4)
					.attr("ry", 4)	
					.attr("class", "hour bordered")
					.attr("style", "cursor:pointer;")
					.attr("width", gridSize)
					.attr("height", gridSize)
					.style("fill", colors[0]) 
					.transition().duration(1000)
					.style("fill", function (d) {
						return colorScale(d.value);
					});
					
					/** @ appending Numbers.(if showNumber enabled)
						*/
					if (options.showNumber) {
					//adding number
					cards.append("text")
						.attr("x", function (d,i) {
								var spaceX = (gridSize - (String(d.value).length*7))/2;
								var xp = spaceX + (d.hour - 1) * gridSize;
								var xs = (String(d.value).length*7) + spaceX;
								if(xs>gridSize){
									xp = (d.hour - 1) * gridSize;
								}
								//console.log("xp...",xp);
								return xp;
							})
						.attr("y", function (d,i) {
							var font = 12;
							var vs = String(d.value).length*7;
							if(vs>gridSize){
								font = font - (vs - gridSize)/3; 
							} 
							var spacey = (gridSize + font)/2;
							var yp = spacey + ((d.day - 1) * gridSize);
						return yp;
						})
						.attr("font-family", "Helvetica,Arial,sans-serif;")
						.attr("font-size",  function (d) {
								var font = 12;
								var vs = String(d.value).length*7;
								if(vs>gridSize){
									font = font - (vs - gridSize)/3; 
									} 
								return font+"px";
							})
						.attr("fill", "#F59F0D")//7CBB00
						.text(function(d){return d.value;});
					}
				
					/* cards.select("title").text(function (d) {
						return d.value;
					}); */

					cards.exit().remove();
						/** @ calling tooltip.(if addTooltip enabled)
						*/
						if (options.addTooltip) {
							cards.call(tooltip.render());
						}
						
						/** @ constructing lagends.(if showLegend enabled)
						*/
						if (options.showLegend) {
							var legend = svg.selectAll(".legend")
								.data([minD].concat(colorScale.quantiles()), function (d) {
									return d;
								});
							legend.enter().append("g")
							.attr("class", "legend");
							if (days.length != 0) {
								legend.append("rect")
								.attr("x", function (d, i) {
									return legendElementWidth * i;
								})
								.attr("y", 20 + (days.length * gridSize))
								.attr("width", legendElementWidth)
								.attr("height", gridSize / 2)
								.style("fill", function (d, i) {
									return colors[i];
								});

								legend.append("text")
								.attr("class", "mono")
								.text(function (d, i) {
									return "≥ " + Math.round(d);
								})
								.attr("x", function (d, i) {
									return legendElementWidth * i;
								})
								.attr("y", gridSize + 20 + (days.length * gridSize));
							}
							legend.exit().remove();
						}
						
				});
			};
		};
	}

	//return HeatMap_dnChart;
//};