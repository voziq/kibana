//import _ from 'lodash';
import { getSeries } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_series';
import { getAspects } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_aspects';
import { initYAxis } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_init_y_axis';
import { initXAxis } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_init_x_axis';
//import { TreemapTooltipFormatter } from 'plugins/treemap/response_handler/_tooltip_formatter';

/*export function AggResponseTreemapProvider(Private) {
	//const getSeries = Private(PointSeriesGetSeriesProvider);
	//const getAspects = Private(PointSeriesGetAspectsProvider);
	//const initYAxis = Private(PointSeriesInitYAxisProvider);
	//const initXAxis = Private(PointSeriesInitXAxisProvider);
	const tooltipFormatter = Private(TreemapTooltipFormatter);*/

export const buildTreemapData = (table, dimensions) => {	

		const chart = {
			    aspects: getAspects(table, dimensions),
			  };
		//chart.tooltipFormatter = tooltipFormatter;
		initXAxis(chart, table);
		initYAxis(chart);
		console.dir(chart.aspects);
		
		var series = getSeries(table, chart);
		//console.dir(series);	
		var sources = null;
		var aggConf = null;
		var segment = null;
		var group = null;
		try {
			sources = table.custom_rows;
			aggConf = table.custom_columns[0].aggConfig;
			/* segment = aggConf.vis.aggs.bySchemaName['segment'][0];
			console.dir(segment);
			group = aggConf.vis.aggs.bySchemaName['group'][0];
			
			console.dir(group); */
		} catch (e) {
				return;
		}

		var children = [];
		var node = [];
		var colornode = [];
		var indexOfNode = function (nodesArr, label) {
			
			
			return nodesArr.indexOf(nodesArr.filter(function (obj) {
				
					return obj.name == label;
				})[0]);
		}
                
		console.dir(sources.length);	
		console.dir(sources);	
		for (var lpId = 0; lpId < sources.length; lpId++) {
            var value = [];
            var bucket = sources[lpId];
			
            /*if (bucket.length == 6) {
				
                bucket.sort((function (a, b) {
                        return a.aggConfig.__schema.name < b.aggConfig.__schema.name ? -1 : a.aggConfig.__schema.name > b.aggConfig.__schema.name ? 1 : 0
                    }));
                var gname = bucket[0].value;
                var subname = bucket[5].value;
					
                if (indexOfNode(node, gname) == -1) {
                    node.push({
                        name: gname,
                        svalue: subname,
                        gvalue: gname,
                        fieldname: bucket[0].aggConfig.params.field,
                        index: aggConf.aggConfigs.indexPattern.title,
                        aggConfig: aggConf,
						size: bucket[2].value,
                        colorValue: bucket[3].value.toFixed(2),
                        children: [{
                                name: subname,
                                fieldname: bucket[5].aggConfig.params.field,
                                size: bucket[2].value,
                                colorValue: bucket[4].value.toFixed(2)
                            }
                        ]
                    });
                    colornode.push({
                        label: gname,
                        values: series[0].values,
                        size: bucket[2].value
                    })
                } else {
                    var index = indexOfNode(node, gname);
                    if (indexOfNode(node[index].children, subname) == -1) {
                        node[index].children.push({
                            name: subname,
                            fieldname: bucket[5].aggConfig.params.field,
                            size: bucket[2].value,
                            colorValue: bucket[4].value.toFixed(2)
                        })
                    } else {
                        var cindex = indexOfNode(node[index].children, subname);
                        node[index].children[cindex].size = node[index].children[cindex].size + bucket[2].value
                    }
					node[index].size = node[index].size + bucket[2].value
					node[index].colorValue = parseFloat(node[index].colorValue) + parseFloat(bucket[3].value.toFixed(2))
                }
            }*/
			
			
			if (bucket.length == 4) {
				
               /* bucket.sort((function (a, b) {
                        return a.aggConfig.__schema.name < b.aggConfig.__schema.name ? -1 : a.aggConfig.__schema.name > b.aggConfig.__schema.name ? 1 : 0
                    }));*/
                var gname = bucket[0].value;
                var subname = bucket[1].value;
				
				
                if (indexOfNode(node, gname) == -1) {
                    node.push({
                        name: gname,
                        svalue: subname,
                        gvalue: gname,
                        fieldname: bucket[0].aggConfig.params.field,
                        index: aggConf.aggConfigs.indexPattern.title,
                        aggConfig: aggConf,
						size: bucket[2].value,
                        colorValue: bucket[3].value.toFixed(2),
                        children: [{
                                name: subname,
                                fieldname: bucket[1].aggConfig.params.field,
                                size: bucket[2].value,
                                colorValue: bucket[3].value.toFixed(2)
                            }
                        ]
                    });
                    colornode.push({
                        label: gname,
                        values: series[0].values,
                        size: bucket[2].value
                    })
                } else {
                    var index = indexOfNode(node, gname);
                    if (indexOfNode(node[index].children, subname) == -1) {
                        node[index].children.push({
                            name: subname,
                            fieldname: bucket[1].aggConfig.params.field,
                            size: bucket[2].value,
                            colorValue: bucket[3].value.toFixed(2)
                        })
                    } else {
                        var cindex = indexOfNode(node[index].children, subname);
                        node[index].children[cindex].size = node[index].children[cindex].size + bucket[2].value
                    }
					node[index].size = node[index].size + bucket[2].value
					node[index].colorValue = parseFloat(node[index].colorValue) + parseFloat(bucket[3].value.toFixed(2))
                }
            }
            /*if (bucket.length == 4) {
                var gname = bucket[0].value;
                var subname = bucket[2].value;
		
                if (indexOfNode(node, gname) == -1) {
					
                    node.push({
                        name: gname,
                        svalue: subname,
                        gvalue: gname,
                        fieldname: bucket[0].aggConfig.params.field,
                        index: aggConf.aggConfigs.indexPattern.title,
                        aggConfig: aggConf,
						size: bucket[3].value,
                        children: [{
                                name: subname,
                                fieldname: bucket[2].aggConfig.params.field,
                                size: bucket[3].value
                            }
                        ]
                    });
                    colornode.push({
                        label: gname,
                        values: series[0].values,
                        size: bucket[3].value
                    })
                } else {
                    var index = indexOfNode(node, gname);
                    if (indexOfNode(node[index].children, subname) == -1) {
                        node[index].children.push({
                            name: subname,
                            fieldname: bucket[2].aggConfig.params.field,
                            size: bucket[3].value
                        })
                    } else {
                        var cindex = indexOfNode(node[index].children, subname);
                        node[index].children[cindex].size = node[index].children[cindex].size + bucket[3].value
                    }
					//var cindex = indexOfNode(node, gname);
                        node[index].size = node[index].size + bucket[3].value
                }
            }*/
			
			
				if (bucket.length == 3) {
				var gname = bucket[0].value;
				var subname = bucket[1].value;
				if (indexOfNode(node, gname) == -1) {
							node.push({
								name: gname,
								svalue: subname,
								gvalue: gname,
								//"metric": metricLabel,
								fieldname: bucket[0].aggConfig.params.field,
								index: aggConf.aggConfigs.indexPattern.title,
								aggConfig: aggConf,
								children: [{
										name: subname,
										fieldname: bucket[1].aggConfig.params.field,
										size: bucket[2].value
									}
								]
							});
							colornode.push({
								label: gname,
								values: series[0].values,
								size: bucket[2].value
							});
				} else {
					var index = indexOfNode(node, gname);
					if (indexOfNode(node[index].children, subname) == -1) {
							node[index].children.push({
								name: subname,
								fieldname: bucket[1].aggConfig.params.field,
								size: bucket[2].value
							});
					} else {
							var cindex = indexOfNode(node[index].children, subname);
							node[index].children[cindex].size = node[index].children[cindex].size + bucket[2].value;
					}
				}
			}
			
            if (bucket.length == 2) {
				
				
		
                var groupname = bucket[0].value;
						
                if (indexOfNode(node, groupname) == -1) {
					
					
                    node.push({
                        name: groupname,
                        svalue: groupname,
                        gvalue: groupname,
                        fieldname: bucket[0].aggConfig.params.field,
                        index: aggConf.aggConfigs.indexPattern.title,
						size: bucket[1].value,
                        aggConfig: aggConf,
                        children: [{
                                name: groupname,
                                fieldname: bucket[0].aggConfig.params.field,
                                size: bucket[1].value
                            }
                        ]
                    });
                    colornode.push({
                        label: groupname,
                        values: series[0].values,
                        size: bucket[1].value
                    })
                } else {
                    var index = indexOfNode(node, groupname);
                    node[index].children[0].size = node[index].children[0].size + bucket[1].value;
					node[index].size = node[index].size + bucket[1].value;
                }
            }
        }
		
		chart.series = colornode;
		chart.series_data = node;
		chart.filterManager = table.filterManager;		
		/* console.dir("tree map chart data......");*/
		
		delete chart.aspects;
		
		return chart;
	};