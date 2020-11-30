//import _ from 'lodash';
import { getSeries } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_series';
import { getAspects } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_aspects';
import { initYAxis } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_init_y_axis';
import { initXAxis } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_init_x_axis';
//import { SankeyTooltipFormatter } from 'plugins/sankey/response_handler/_tooltip_formatter';

/*export function AggResponseSankeyProvider(Private) {
	//const getSeries = Private(PointSeriesGetSeriesProvider);
	//const getAspects = Private(PointSeriesGetAspectsProvider);
	//const initYAxis = Private(PointSeriesInitYAxisProvider);
	//const initXAxis = Private(PointSeriesInitXAxisProvider);
	const tooltipFormatter = Private(SankeyTooltipFormatter);*/

export const buildSankeyData = (table, dimensions) => {		
		//getSeries(table.rows, chart);
		
		
		var nodes = [];
		var links = [];
		var graph = {};
		var index = 0;
		var sources = null;
		var colornodes = [];
		var aggConf = null;
		//console.log("entered into sankeyDataFromTable");
		try {
			sources = table.custom_rows;
			aggConf = table.custom_columns[0].aggConfig;
			
		} catch (e) {
			return;
		}
		var indexOfNode = function (nodesArr, name, id) {
								return nodesArr.indexOf(nodesArr.filter(function (obj) {
										return obj.name == name && obj.id == id;
									})[0]);
							};
		var indexOfLinks = function (linksArr, source, target) {
								return linksArr.indexOf(linksArr.filter(function (obj) {
										return obj.source == source && obj.target == target;
									})[0]);
							}
		const chart = {
			    aspects: getAspects(table, dimensions),
			  };
		
		initXAxis(chart, table);
		initYAxis(chart);
		var series = getSeries(table, chart);
			
		var indexOfColorNode = function (nodesArr, name, id) {
									return nodesArr.indexOf(nodesArr.filter(function (obj) {
											return obj.label == name && obj.id == id&& obj.values == series[0].values;
										})[0]);
								}
		sources.map(function (bucket) {						
			if (bucket.length == 3) {
				
				//check if source has comma
				var source = bucket[0].value;
				//sourcenames.map(function (source) {
					if (indexOfNode(nodes, source, source + "_1") == -1) {
						nodes.push({
							"name": source,
							"id": source + "_1"
						});
					}
					if (indexOfColorNode(colornodes, source, source + "_1") == -1) {
						colornodes.push({
							"label": source,
							"values": series[0].values,
							"id": source + "_1"
						});
					}
					var target = bucket[1].value;
					//targets.map(function (target) {
						if (indexOfNode(nodes, target, target + "_2") == -1) {
							nodes.push({
								"name": target,
								"id": target + "_2"
							});
						}
						if (indexOfColorNode(colornodes, target, target + "_2") == -1) {
							colornodes.push({
								"label": target,
								"values": series[0].values,
								"id": target + "_2"
							});
						}
						if (indexOfLinks(links, indexOfNode(nodes, source, source + "_1"), indexOfNode(nodes, target, target + "_2")) == -1) {
							links.push({
								"source": indexOfNode(nodes, source, source + "_1"),
								//"metric": metricLabel,
								"value": bucket[2].value,
								"target": indexOfNode(nodes, target, target + "_2"),
								"l1v": source,
								"l2v": target,
								"l3v": target
							});
						} else {
							//incrementing value of the link
							index = indexOfLinks(links, indexOfNode(nodes, source, source + "_1"), indexOfNode(nodes, target, target + "_2"));
							links[index].value = links[index].value + bucket[2].value;
						}
					//});

				//});

			}
			if (bucket.length == 4) {
				//check if source has comma
				var source = bucket[0].value;
				//sourcenames.map(function (source) {
					if (indexOfNode(nodes, source, source + "_1") == -1) {
						nodes.push({
							"name": source,
							"id": source + "_1"
						});

					}
					if (indexOfColorNode(colornodes, source, source + "_1") == -1) {
						colornodes.push({
							"label": source,
							"values": series[0].values,
							"id": source + "_1"
						});
					}
					var target1 = bucket[1].value;
					//targets1.map(function (target1) {
						if (indexOfNode(nodes, target1, target1 + "_2") == -1) {
							nodes.push({
								"name": target1,
								"id": target1 + "_2"
							});
						}
						if (indexOfColorNode(colornodes, target1, target1 + "_2") == -1) {
							colornodes.push({
								"label": target1,
								"values": series[0].values,
								"id": target1 + "_2"
							});
						}
						if (indexOfLinks(links, indexOfNode(nodes, source, source + "_1"), indexOfNode(nodes, target1, target1 + "_2")) == -1) {
								links.push({
									"source": indexOfNode(nodes, source, source + "_1"),
									//"metric": metricLabel,
									"value": bucket[3].value,
									"target": indexOfNode(nodes, target1, target1 + "_2"),
									"l1v": source,
									"l2v": target1,
									"l3v": bucket[2].value
								});
							} else {
								//incrementing value of the link
								index = indexOfLinks(links, indexOfNode(nodes, source, source + "_1"), indexOfNode(nodes, target1, target1 + "_2"));
								links[index].value = links[index].value + bucket[3].value;

							}
						//console.dir(bucket[2].value);
						var target2 = bucket[2].value;
						//targets2.map(function (target2) {
							if (indexOfNode(nodes, target2, target2 + "_3") == -1) {
								nodes.push({
									"name": target2,
									"id": target2 + "_3"
								});
							}
							if (indexOfColorNode(colornodes, target2, target2 + "_3") == -1) {
								colornodes.push({
									"label": target2,
									"values": series[0].values,
									"id": target2 + "_3"
								});
							}
							
							if (indexOfLinks(links, indexOfNode(nodes, target1, target1 + "_2"), indexOfNode(nodes, target2, target2 + "_3")) == -1) {

								links.push({
									"source": indexOfNode(nodes, target1, target1 + "_2"),
									//"metric": metricLabel,
									"value": bucket[3].value,
									"target": indexOfNode(nodes, target2, target2 + "_3"),
									"l1v": source,
									"l2v": target1,
									"l3v": target2
								});
							} else {
								index = indexOfLinks(links, indexOfNode(nodes, target1, target1 + "_2"), indexOfNode(nodes, target2, target2 + "_3"));
								links[index].value = links[index].value + bucket[3].value;
							}
						//});
					//});
				//});
			}
			
			// if length is 5
			if (bucket.length == 5) {
				//check if source has comma
				var source = bucket[0].value;
				//sourcenames.map(function (source) {
					if (indexOfNode(nodes, source, source + "_1") == -1) {
						nodes.push({
							"name": source,
							"id": source + "_1"
						});

					}
					if (indexOfColorNode(colornodes, source, source + "_1") == -1) {
						colornodes.push({
							"label": source,
							"values": series[0].values,
							"id": source + "_1"
						});
					}
					var target1 = bucket[1].value;
					//targets1.map(function (target1) {
						if (indexOfNode(nodes, target1, target1 + "_2") == -1) {
							nodes.push({
								"name": target1,
								"id": target1 + "_2"
							});
						}
						if (indexOfColorNode(colornodes, target1, target1 + "_2") == -1) {
							colornodes.push({
								"label": target1,
								"values": series[0].values,
								"id": target1 + "_2"
							});
						}
						if (indexOfLinks(links, indexOfNode(nodes, source, source + "_1"), indexOfNode(nodes, target1, target1 + "_2")) == -1) {
								links.push({
									"source": indexOfNode(nodes, source, source + "_1"),
									//"metric": metricLabel,
									"value": bucket[4].value,
									"target": indexOfNode(nodes, target1, target1 + "_2"),
									"l1v": source,
									"l2v": target1,
									"l3v": bucket[2].value
								});
							} else {
								//incrementing value of the link
								index = indexOfLinks(links, indexOfNode(nodes, source, source + "_1"), indexOfNode(nodes, target1, target1 + "_2"));
								links[index].value = links[index].value + bucket[4].value;

							}
						//console.dir(bucket[2].value);
						var target2 = bucket[2].value;
						//targets2.map(function (target2) {
							if (indexOfNode(nodes, target2, target2 + "_3") == -1) {
								nodes.push({
									"name": target2,
									"id": target2 + "_3"
								});
							}
							if (indexOfColorNode(colornodes, target2, target2 + "_3") == -1) {
								colornodes.push({
									"label": target2,
									"values": series[0].values,
									"id": target2 + "_3"
								});
							}
							
							if (indexOfLinks(links, indexOfNode(nodes, target1, target1 + "_2"), indexOfNode(nodes, target2, target2 + "_3")) == -1) {

								links.push({
									"source": indexOfNode(nodes, target1, target1 + "_2"),
									//"metric": metricLabel,
									"value": bucket[4].value,
									"target": indexOfNode(nodes, target2, target2 + "_3"),
									"l1v": source,
									"l2v": target1,
									"l3v": target2
								});
							} else {
								index = indexOfLinks(links, indexOfNode(nodes, target1, target1 + "_2"), indexOfNode(nodes, target2, target2 + "_3"));
								links[index].value = links[index].value + bucket[4].value;
							}
							
							// target 3
							var target3 = bucket[3].value;
						//targets2.map(function (target2) {
							if (indexOfNode(nodes, target3, target3 + "_4") == -1) {
								nodes.push({
									"name": target3,
									"id": target3 + "_4"
								});
							}
							if (indexOfColorNode(colornodes, target3, target3 + "_4") == -1) {
								colornodes.push({
									"label": target3,
									"values": series[0].values,
									"id": target3 + "_4"
								});
							}
							
							if (indexOfLinks(links,indexOfNode(nodes, target2, target2 + "_3"),indexOfNode(nodes, target3, target3 + "_4")) == -1) {

								links.push({
									"source": indexOfNode(nodes, target2, target2 + "_3"),
									//"metric": metricLabel,
									"value": bucket[4].value,
									"target": indexOfNode(nodes, target3, target3 + "_4"),
									"l1v": source,
									"l2v": target1,
									"l3v": target2,
									"l4v": target3
								});
							} else {
								index = indexOfLinks(links,indexOfNode(nodes, target2, target2 + "_3"),indexOfNode(nodes, target3, target3 + "_4"));
								links[index].value = links[index].value + bucket[4].value;
							}
							
						//});
					//});
				//});
			}
			//bucket 6
			if (bucket.length == 6) {
				//check if source has comma
				var source = bucket[0].value;
				//sourcenames.map(function (source) {
					if (indexOfNode(nodes, source, source + "_1") == -1) {
						nodes.push({
							"name": source,
							"id": source + "_1"
						});

					}
					if (indexOfColorNode(colornodes, source, source + "_1") == -1) {
						colornodes.push({
							"label": source,
							"values": series[0].values,
							"id": source + "_1"
						});
					}
					var target1 = bucket[1].value;
					//targets1.map(function (target1) {
						if (indexOfNode(nodes, target1, target1 + "_2") == -1) {
							nodes.push({
								"name": target1,
								"id": target1 + "_2"
							});
						}
						if (indexOfColorNode(colornodes, target1, target1 + "_2") == -1) {
							colornodes.push({
								"label": target1,
								"values": series[0].values,
								"id": target1 + "_2"
							});
						}
						if (indexOfLinks(links, indexOfNode(nodes, source, source + "_1"), indexOfNode(nodes, target1, target1 + "_2")) == -1) {
								links.push({
									"source": indexOfNode(nodes, source, source + "_1"),
									//"metric": metricLabel,
									"value": bucket[5].value,
									"target": indexOfNode(nodes, target1, target1 + "_2"),
									"l1v": source,
									"l2v": target1,
									"l3v": bucket[2].value
								});
							} else {
								//incrementing value of the link
								index = indexOfLinks(links, indexOfNode(nodes, source, source + "_1"), indexOfNode(nodes, target1, target1 + "_2"));
								links[index].value = links[index].value + bucket[5].value;

							}
						//console.dir(bucket[2].value);
						var target2 = bucket[2].value;
						//targets2.map(function (target2) {
							if (indexOfNode(nodes, target2, target2 + "_3") == -1) {
								nodes.push({
									"name": target2,
									"id": target2 + "_3"
								});
							}
							if (indexOfColorNode(colornodes, target2, target2 + "_3") == -1) {
								colornodes.push({
									"label": target2,
									"values": series[0].values,
									"id": target2 + "_3"
								});
							}
							
							if (indexOfLinks(links, indexOfNode(nodes, target1, target1 + "_2"), indexOfNode(nodes, target2, target2 + "_3")) == -1) {

								links.push({
									"source": indexOfNode(nodes, target1, target1 + "_2"),
									//"metric": metricLabel,
									"value": bucket[5].value,
									"target": indexOfNode(nodes, target2, target2 + "_3"),
									"l1v": source,
									"l2v": target1,
									"l3v": target2
								});
							} else {
								index = indexOfLinks(links, indexOfNode(nodes, target1, target1 + "_2"), indexOfNode(nodes, target2, target2 + "_3"));
								links[index].value = links[index].value + bucket[5].value;
							}
							
							// target 3
							var target3 = bucket[3].value;
						//targets2.map(function (target2) {
							if (indexOfNode(nodes, target3, target3 + "_4") == -1) {
								nodes.push({
									"name": target3,
									"id": target3 + "_4"
								});
							}
							if (indexOfColorNode(colornodes, target3, target3 + "_4") == -1) {
								colornodes.push({
									"label": target3,
									"values": series[0].values,
									"id": target3 + "_4"
								});
							}
							
							if (indexOfLinks(links,indexOfNode(nodes, target2, target2 + "_3"),indexOfNode(nodes, target3, target3 + "_4")) == -1) {

								links.push({
									"source": indexOfNode(nodes, target2, target2 + "_3"),
									//"metric": metricLabel,
									"value": bucket[5].value,
									"target": indexOfNode(nodes, target3, target3 + "_4"),
									"l1v": source,
									"l2v": target1,
									"l3v": target2,
									"l4v": target3
								});
							} else {
								index = indexOfLinks(links,indexOfNode(nodes, target2, target2 + "_3"),indexOfNode(nodes, target3, target3 + "_4"));
								links[index].value = links[index].value + bucket[5].value;
							}
							
					// target 4
							var target4 = bucket[4].value;
						//targets2.map(function (target2) {
							if (indexOfNode(nodes, target4, target4 + "_5") == -1) {
								nodes.push({
									"name": target4,
									"id": target4 + "_5"
								});
							}
							if (indexOfColorNode(colornodes, target4, target4 + "_5") == -1) {
								colornodes.push({
									"label": target4,
									"values": series[0].values,
									"id": target4 + "_5"
								});
							}
							
							if (indexOfLinks(links,indexOfNode(nodes, target3, target3 + "_4"),indexOfNode(nodes, target4, target4 + "_5")) == -1) {

								links.push({
									"source": indexOfNode(nodes, target3, target3 + "_4"),
									//"metric": metricLabel,
									"value": bucket[5].value,
									"target": indexOfNode(nodes, target4, target4 + "_5"),
									"l1v": source,
									"l2v": target1,
									"l3v": target2,
									"l4v": target3,
									"l5v": target4
								});
							} else {
								index = indexOfLinks(links,indexOfNode(nodes, target3, target3 + "_4"),indexOfNode(nodes, target4, target4 + "_5"));
								links[index].value = links[index].value + bucket[5].value;
							}
							
			}
			
			//bucket 7
			if (bucket.length == 7) {
				//check if source has comma
				var source = bucket[0].value;
				//sourcenames.map(function (source) {
					if (indexOfNode(nodes, source, source + "_1") == -1) {
						nodes.push({
							"name": source,
							"id": source + "_1"
						});

					}
					if (indexOfColorNode(colornodes, source, source + "_1") == -1) {
						colornodes.push({
							"label": source,
							"values": series[0].values,
							"id": source + "_1"
						});
					}
					var target1 = bucket[1].value;
					//targets1.map(function (target1) {
						if (indexOfNode(nodes, target1, target1 + "_2") == -1) {
							nodes.push({
								"name": target1,
								"id": target1 + "_2"
							});
						}
						if (indexOfColorNode(colornodes, target1, target1 + "_2") == -1) {
							colornodes.push({
								"label": target1,
								"values": series[0].values,
								"id": target1 + "_2"
							});
						}
						if (indexOfLinks(links, indexOfNode(nodes, source, source + "_1"), indexOfNode(nodes, target1, target1 + "_2")) == -1) {
								links.push({
									"source": indexOfNode(nodes, source, source + "_1"),
									//"metric": metricLabel,
									"value": bucket[6].value,
									"target": indexOfNode(nodes, target1, target1 + "_2"),
									"l1v": source,
									"l2v": target1,
									"l3v": bucket[2].value
								});
							} else {
								//incrementing value of the link
								index = indexOfLinks(links, indexOfNode(nodes, source, source + "_1"), indexOfNode(nodes, target1, target1 + "_2"));
								links[index].value = links[index].value + bucket[6].value;

							}
						//console.dir(bucket[2].value);
						var target2 = bucket[2].value;
						//targets2.map(function (target2) {
							if (indexOfNode(nodes, target2, target2 + "_3") == -1) {
								nodes.push({
									"name": target2,
									"id": target2 + "_3"
								});
							}
							if (indexOfColorNode(colornodes, target2, target2 + "_3") == -1) {
								colornodes.push({
									"label": target2,
									"values": series[0].values,
									"id": target2 + "_3"
								});
							}
							
							if (indexOfLinks(links, indexOfNode(nodes, target1, target1 + "_2"), indexOfNode(nodes, target2, target2 + "_3")) == -1) {

								links.push({
									"source": indexOfNode(nodes, target1, target1 + "_2"),
									//"metric": metricLabel,
									"value": bucket[6].value,
									"target": indexOfNode(nodes, target2, target2 + "_3"),
									"l1v": source,
									"l2v": target1,
									"l3v": target2
								});
							} else {
								index = indexOfLinks(links, indexOfNode(nodes, target1, target1 + "_2"), indexOfNode(nodes, target2, target2 + "_3"));
								links[index].value = links[index].value + bucket[6].value;
							}
							
							// target 3
							var target3 = bucket[3].value;
						//targets2.map(function (target2) {
							if (indexOfNode(nodes, target3, target3 + "_4") == -1) {
								nodes.push({
									"name": target3,
									"id": target3 + "_4"
								});
							}
							if (indexOfColorNode(colornodes, target3, target3 + "_4") == -1) {
								colornodes.push({
									"label": target3,
									"values": series[0].values,
									"id": target3 + "_4"
								});
							}
							
							if (indexOfLinks(links,indexOfNode(nodes, target2, target2 + "_3"),indexOfNode(nodes, target3, target3 + "_4")) == -1) {

								links.push({
									"source": indexOfNode(nodes, target2, target2 + "_3"),
									//"metric": metricLabel,
									"value": bucket[6].value,
									"target": indexOfNode(nodes, target3, target3 + "_4"),
									"l1v": source,
									"l2v": target1,
									"l3v": target2,
									"l4v": target3
								});
							} else {
								index = indexOfLinks(links,indexOfNode(nodes, target2, target2 + "_3"),indexOfNode(nodes, target3, target3 + "_4"));
								links[index].value = links[index].value + bucket[6].value;
							}
							
					// target 4
							var target4 = bucket[4].value;
						//targets2.map(function (target2) {
							if (indexOfNode(nodes, target4, target4 + "_5") == -1) {
								nodes.push({
									"name": target4,
									"id": target4 + "_5"
								});
							}
							if (indexOfColorNode(colornodes, target4, target4 + "_5") == -1) {
								colornodes.push({
									"label": target4,
									"values": series[0].values,
									"id": target4 + "_5"
								});
							}
							
							if (indexOfLinks(links,indexOfNode(nodes, target3, target3 + "_4"),indexOfNode(nodes, target4, target4 + "_5")) == -1) {

								links.push({
									"source": indexOfNode(nodes, target3, target3 + "_4"),
									//"metric": metricLabel,
									"value": bucket[6].value,
									"target": indexOfNode(nodes, target4, target4 + "_5"),
									"l1v": source,
									"l2v": target1,
									"l3v": target2,
									"l4v": target3,
									"l5v": target4
								});
							} else {
								index = indexOfLinks(links,indexOfNode(nodes, target3, target3 + "_4"),indexOfNode(nodes, target4, target4 + "_5"));
								links[index].value = links[index].value + bucket[6].value;
							}
							
							
							// target 5
							var target5 = bucket[5].value;
						//targets2.map(function (target2) {
							if (indexOfNode(nodes, target5, target5 + "_6") == -1) {
								nodes.push({
									"name": target5,
									"id": target5 + "_6"
								});
							}
							if (indexOfColorNode(colornodes, target5, target5 + "_6") == -1) {
								colornodes.push({
									"label": target5,
									"values": series[0].values,
									"id": target5 + "_6"
								});
							}
							
							if (indexOfLinks(links,indexOfNode(nodes, target4, target4 + "_5"),indexOfNode(nodes, target5, target5 + "_6")) == -1) {

								links.push({
									"source": indexOfNode(nodes, target4, target4 + "_5"),
									//"metric": metricLabel,
									"value": bucket[6].value,
									"target": indexOfNode(nodes, target5, target5 + "_6"),
									"l1v": source,
									"l2v": target1,
									"l3v": target2,
									"l4v": target3,
									"l5v": target4,
									"l6v": target5
								});
							} else {
								index = indexOfLinks(links,indexOfNode(nodes, target4, target4 + "_5"),indexOfNode(nodes, target5, target5 + "_6"));
								links[index].value = links[index].value + bucket[6].value;
							}
							
			}
			
		});
		graph.nodes = nodes;
		graph.links = links;
	

		chart.series = colornodes;
		chart.series_data = graph;
		chart.c_config = aggConf;
		chart.filterManager = table.filterManager;
		
		
		delete chart.aspects;
		return chart;
		
	};