import d3 from 'd3';
import _ from 'lodash';
import $ from 'jquery';
//import { ContainerTooSmall } from 'ui/vislib/errors';
import { Chart } from '../../vis_type_vislib/public/vislib/visualizations/_chart';
import { esFilters } from '../../data/public';
import './d3.sankey';
import './d3.chart.min';
import './d3.chart.sankey.min';

/*export function VislibVisualizationsSankeyChartProvider(Private) {
	const Chart = Private(VislibVisualizationsChartProvider);
	const filterManager = Private(FilterManagerProvider);*/

	/**
	 * Sankey Chart Visualization
	 *
	 * @class JWordcloudChart
	 * @constructor
	 * @extends Chart
	 * @param handler {Object} Reference to the Handler Class Constructor
	 * @param el {HTMLElement} HTML element to which the chart will be appended
	 * @param chartData {Object} Elastic search query results for this specific chart
	 */
export class SankeyChart extends Chart {
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
			/*console.log("width....");
			console.log(width);
			console.log("height....");
			console.log(height);*/
			if (width <= minWidth || height <= minHeight) {
				//throw new ContainerTooSmall();
			}
		};

		/**
		 * Renders d3 visualization
		 *
		 * @method draw
		 * @returns {Function} Creates the pie chart
		 */
		draw() {
			//console.log("at draw");
			$(this).html("");
			var self = this;			
			var tooltip = this.tooltip;			
			var colors = this.handler.data.getColorFunc();			
			var options = self.handler.visConfig._values;
			//const filterGen = getFilterGenerator(this.chartData.queryFilter);
			/*console.log("options....");*/
		var filter=this.chartData.filterManager;
			return function (selection) {
				selection.each(function (data) {
					var sources = null;
					var configg = null;
					try {
						sources = data.series_data;
						configg = data.c_config;
					} catch (e) {
						return;
					}
					var width = $(this).width();
					var height = $(this).height();
					/*console.dir("entered into sankey chart");
					console.dir(self.handler);*/
					self._validateContainerSize(width, height);
					var graph = sources;
					var json = {};
					json.nodes = graph.nodes;
					json.links = graph.links;

					/*var colors = d3.scale.ordinal()
					.domain(json.nodes)
					.range(['#00A1F1','#7CBB00','#F59F0D','#F65314','#041659','#57156D','#D80B8F','#00B294','#009E49','#AA0B1E']); */

					var chart = d3.select(this).append("svg").chart("Sankey.Path");
					chart
					.name(label)
					.colorNodes(function (name, node) {
						return color(node, 1);
					})
					.colorLinks(function (link) {
						return color(link.source, 4) || color(link.target, 1);
					})
					.nodeWidth(15)
					.nodePadding(10)
					.spread(true)
					.iterations(0)
					.draw(json);

					chart.on("node:click", function (node) {
						var obj2 = null;
						var obj1 = null;
						var obj3 = null;
						var obj4 = null;
						var obj5 = null;
						var obj6 = null;
						var a;
						var af={};

						if (configg.aggConfigs.aggs.length == 3) {
                            obj1 = configg.aggConfigs.bySchemaName("group")[0];
                            obj2 = configg.aggConfigs.bySchemaName("group")[1];
                            obj3 = configg.aggConfigs.bySchemaName("group")[1]
                        } else if (configg.aggConfigs.aggs.length == 4) {
                            obj1 = configg.aggConfigs.bySchemaName("group")[0];
                            obj2 = configg.aggConfigs.bySchemaName("group")[1];
                            obj3 = configg.aggConfigs.bySchemaName("group")[2]
                        } else if (configg.aggConfigs.aggs.length == 5) {
                            obj1 = configg.aggConfigs.bySchemaName("group")[0];
                            obj2 = configg.aggConfigs.bySchemaName("group")[1];
                            obj3 = configg.aggConfigs.bySchemaName("group")[2];
                            obj4 = configg.aggConfigs.bySchemaName("group")[3]
                        } else if (configg.aggConfigs.aggs.length == 6) {
                            obj1 = configg.aggConfigs.bySchemaName("group")[0];
                            obj2 = configg.aggConfigs.bySchemaName("group")[1];
                            obj3 = configg.aggConfigs.bySchemaName("group")[2];
                            obj4 = configg.aggConfigs.bySchemaName("group")[3];
                            obj5 = configg.aggConfigs.bySchemaName("group")[4]
                        } else if (configg.aggConfigs.aggs.length == 7) {
                            obj1 = configg.aggConfigs.bySchemaName("group")[0];
                            obj2 = configg.aggConfigs.bySchemaName("group")[1];
                            obj3 = configg.aggConfigs.bySchemaName("group")[2];
                            obj4 = configg.aggConfigs.bySchemaName("group")[3];
                            obj5 = configg.aggConfigs.bySchemaName("group")[4];
                            obj6 = configg.aggConfigs.bySchemaName("group")[5]
                        }
						if (node.id.match("_1$")){
							if("filters" in obj1.params)
							{														
							a = node.name;
                            af = "query";
							}else{
							a = obj1.params.field.name;
							af=obj1.params.field;
							}
							}
						if (node.id.match("_2$")){
							if("filters" in obj2.params)
							{														
							a = node.name;
                            af = "query";
							}else{
							a = obj2.params.field.name;
						af=obj2.params.field;
							}}
						if (node.id.match("_3$")){
							if("filters" in obj3.params)
							{														
							a = node.name;
                            af = "query";
							}else{
							a = obj3.params.field.name;
						af=obj3.params.field;
						}
							}
						if (node.id.match("_4$")){
							if("filters" in obj4.params)
							{														
							a = node.name;
                            af = "query";
							}else{
							a = obj4.params.field.name;
						af = obj4.params.field;
							}
							}
						if (node.id.match("_5$")){
							if("filters" in obj5.params)
							{														
							a = node.name;
                            af = "query";
							}else{
							a = obj5.params.field.name;
						af = obj5.params.field;
						}
							}
						if (node.id.match("_6$")){
							if("filters" in obj6.params)
							{														
							a = node.name;
                            af = "query";
							}else{
							a = obj6.params.field.name;
						af = obj6.params.field;
							}
							}
						if (a.includes(".csv"))
							a = a.replace(".csv", ".terms");
						if (a.includes(".raw"))
							a = a.replace(".raw", ".split");
						 /*filterGen.add(
							// The field to filter for, we can get it from the config
							af, //data.series[0].values[0].aggConfig.vis.aggs.bySchemaName['group'][0].params.field,
							// The value to filter for, we will read out the bucket key from the tag
							node.name,
							// Whether the filter is negated. If you want to create a negated filter pass '-' here
							null,
							// The index pattern for the filter
							configg.aggConfigs.indexPattern.id); */
							
							const newFilters=esFilters.generateFilters(
      filter,
      af,
      node.name,
      null,
      configg.aggConfigs.indexPattern.id);
	  filter.addFilters(newFilters);

					});
					
					chart.on("link:click", function (lk) {
						//console.log("link on click.",lk);
						var obj1 = null;
						var obj2 = null;
						var obj3 = null;
						var obj4 = null;
						var obj5 = null;
						var obj6 = null;
						var source = "";
						var sourceF = {};
						var target = "";
						var targetF = {};

						if (configg.aggConfigs.aggs.length == 3) {
                            obj1 = configg.aggConfigs.bySchemaName("group")[0];
                            obj2 = configg.aggConfigs.bySchemaName("group")[1];
                            obj3 = configg.aggConfigs.bySchemaName("group")[1]
                        } else if (configg.aggConfigs.aggs.length == 4) {
                            obj1 = configg.aggConfigs.bySchemaName("group")[0];
                            obj2 = configg.aggConfigs.bySchemaName("group")[1];
                            obj3 = configg.aggConfigs.bySchemaName("group")[2]
                        } else if (configg.aggConfigs.aggs.length == 5) {
                            obj1 = configg.aggConfigs.bySchemaName("group")[0];
                            obj2 = configg.aggConfigs.bySchemaName("group")[1];
                            obj3 = configg.aggConfigs.bySchemaName("group")[2];
                            obj4 = configg.aggConfigs.bySchemaName("group")[3]
                        } else if (configg.aggConfigs.aggs.length == 6) {
                            obj1 = configg.aggConfigs.bySchemaName("group")[0];
                            obj2 = configg.aggConfigs.bySchemaName("group")[1];
                            obj3 = configg.aggConfigs.bySchemaName("group")[2];
                            obj4 = configg.aggConfigs.bySchemaName("group")[3];
                            obj5 = configg.aggConfigs.bySchemaName("group")[4]
                        } else if (configg.aggConfigs.aggs.length == 7) {
                            obj1 = configg.aggConfigs.bySchemaName("group")[0];
                            obj2 = configg.aggConfigs.bySchemaName("group")[1];
                            obj3 = configg.aggConfigs.bySchemaName("group")[2];
                            obj4 = configg.aggConfigs.bySchemaName("group")[3];
                            obj5 = configg.aggConfigs.bySchemaName("group")[4];
                            obj6 = configg.aggConfigs.bySchemaName("group")[5]
                        }
						if (lk.source.id.match("_1$")){
							if("filters" in obj1.params)
							{														
							source = lk.source.name;
                            sourceF = "query";
							}else{
							source = obj1.params.field.name;
							sourceF = obj1.params.field;
							}}
						if (lk.source.id.match("_2$")){
							if("filters" in obj2.params)
							{														
							source = lk.source.name;
                            sourceF = "query";
							}else{
							source = obj2.params.field.name;
						sourceF = obj2.params.field;}
						}
						if (lk.source.id.match("_3$")){
							if("filters" in obj3.params)
							{														
							source = lk.source.name;
                            sourceF = "query";
							}else{
							source = obj3.params.field.name;
						sourceF = obj3.params.field;}
						}
						if (lk.source.id.match("_4$")){
							if("filters" in obj4.params)
							{														
							source = lk.source.name;
                            sourceF = "query";
							}else{
							source = obj4.params.field.name;
						sourceF = obj4.params.field;}}
						if (lk.source.id.match("_5$")){
							if("filters" in obj5.params)
							{														
							source = lk.source.name;
                            sourceF = "query";
							}else{
							source = obj5.params.field.name;
						sourceF = obj5.params.field;}}
						if (lk.source.id.match("_6$")){
							if("filters" in obj6.params)
							{														
							source = lk.source.name;
                            sourceF = "query";
							}else{
							source = obj6.params.field.name;
						sourceF = obj6.params.field;}}
						if (source.includes(".csv"))
							source = source.replace(".csv", ".terms");
						if (source.includes(".raw"))
							source = source.replace(".raw", ".split");
						/* filterGen.add(
							// The field to filter for, we can get it from the config
							sourceF, 
							// The value to filter for, we will read out the bucket key from the tag
							lk.source.name,
							// Whether the filter is negated. If you want to create a negated filter pass '-' here
							null,
							// The index pattern for the filter
							configg.aggConfigs.indexPattern.id); */
							
									const newFilters1=esFilters.generateFilters(
      filter,
      sourceF,
      lk.source.name,
      null,
      configg.aggConfigs.indexPattern.id);
	  filter.addFilters(newFilters1);
							
						if (lk.target.id.match("_1$")){
							if("filters" in obj1.params)
							{														
							target = lk.target.name;
                            targetF = "query";
							}else{
							target = obj1.params.field.name;
						targetF = obj1.params.field;}}
						if (lk.target.id.match("_2$")){
							if("filters" in obj2.params)
							{														
							target = lk.target.name;
                            targetF = "query";
							}else{
							target = obj2.params.field.name;
						targetF = obj2.params.field;}}
						if (lk.target.id.match("_3$")){
							if("filters" in obj3.params)
							{														
							target = lk.target.name;
                            targetF = "query";
							}else{
							target = obj3.params.field.name;
						targetF = obj3.params.field;}}
						if (lk.target.id.match("_4$")){
							if("filters" in obj4.params)
							{														
							target = lk.target.name;
                            targetF = "query";
							}else{
							target = obj4.params.field.name;
						targetF = obj4.params.field;}}
						if (lk.target.id.match("_5$")){
							if("filters" in obj5.params)
							{														
							target = lk.target.name;
                            targetF = "query";
							}else{
							target = obj5.params.field.name;
						targetF = obj5.params.field;}}
						if (lk.target.id.match("_6$")){
							if("filters" in obj6.params)
							{														
							target = lk.target.name;
                            targetF = "query";
							}else{
							target = obj6.params.field.name;
						targetF = obj6.params.field;}}
						if (target.includes(".csv"))
							target = target.replace(".csv", ".terms");
						if (target.includes(".raw"))
							target = target.replace(".raw", ".split");
						/* filterGen.add(
							// The field to filter for, we can get it from the config
							targetF, 
							// The value to filter for, we will read out the bucket key from the tag
							lk.target.name,
							// Whether the filter is negated. If you want to create a negated filter pass '-' here
							null,
							// The index pattern for the filter
							configg.aggConfigs.indexPattern.id); */
							
							
										const newFilters2=esFilters.generateFilters(
      filter,
      targetF,
      lk.target.name,
      null,
      configg.aggConfigs.indexPattern.id);
	  filter.addFilters(newFilters2);
					});
					 
					if (options.addTooltip){
						d3.select(this).select("svg").selectAll("path").call(tooltip.render());
						d3.select(this).select("svg").selectAll("rect").call(tooltip.render());
					}
						
					if (!options.showLabels)
						d3.select(this).select("svg").selectAll("text").text('');
					function label(node) {
						return node.name;
					}
					function color(node, depth) {
						
						return colors(node.name);
					}
					//console.log("before returning chart");
					//return chart;
				});
			};
		};
	};
	/*return SankeyVisualization;
};*/