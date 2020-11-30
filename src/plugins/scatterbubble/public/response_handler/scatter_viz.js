//import _ from 'lodash';
import d3 from 'd3';
import { getSeries } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_series';
//import { getAspects } from './_get_aspects';
import { getAspects } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_aspects';
import { initYAxis } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_init_y_axis';
import { initXAxis } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_init_x_axis';
//import { ScatterTooltipFormatter } from 'plugins/scatterbubble/response_handler/_tooltip_formatter';

export const buildScatterBubbleData = (table, dimensions) => {
	var groups = [];
	var node = [];
	var dataList = [];
	var colornodes = [];
	var xlabel = "";
	var ylabel = "";
	var sizeLabel = "";
	var maxsize = 0;
	var lx = 0,
	ly = 0,
	mx = 0,
	my = 0;
	var tbrows = [];
	var sources = null;
	var aggConf = null;
	var temp = 0;
	try {
		sources = table.custom_rows;
		aggConf = table.custom_columns[0].aggConfig;
	} catch (e) {
		return;
	}
	var tags = [];
	function titleCase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	function getIndexByGroupName(group, subgroup) {
		for (var i = 0; i < node.length; i++) {
			if (node[i].group == group && node[i].subgroup == subgroup) {
				return i;
			}
		}
		return -1;
	}

	var indexOfNode = function (nodesArr, name) {
		return nodesArr.indexOf(nodesArr.filter(function (obj) {
				return obj.label == name;
			})[0]);
	}
	const chart = {
		    aspects: getAspects(table, dimensions),
		  };
	initXAxis(chart, table);
	initYAxis(chart);
	var series = getSeries(table, chart);
	for (var i = 0; i < sources.length; i++) {
		var bucket = sources[i];
		if (bucket.length == 5) {
			temp = 1;
				if ((bucket[2].aggConfig.params.customLabel == "") || (bucket[2].aggConfig.params.customLabel == undefined)) {
					if (bucket[2].aggConfig.params.field == undefined) {
						sizeLabel = titleCase(bucket[2].aggConfig.__type.name);

					} else {
						sizeLabel = titleCase(bucket[2].aggConfig.__type.title + " " + bucket[2].aggConfig.params.field.displayName);
					}
				} else {
					sizeLabel = bucket[2].aggConfig.params.customLabel;
				}
				//label for x-axis
				if ((bucket[3].aggConfig.params.customLabel == "") || (bucket[3].aggConfig.params.customLabel == undefined)) {
					if (bucket[3].aggConfig.params.field == undefined) {
						xlabel = titleCase(bucket[3].aggConfig.__type.name);

					} else {
						xlabel = titleCase(bucket[3].aggConfig.__type.title + " " + bucket[3].aggConfig.params.field.displayName);
					}
				} else {
					xlabel = bucket[3].aggConfig.params.customLabel;
				}
				//label for y-axis
				if ((bucket[4].aggConfig.params.customLabel == "") || (bucket[4].aggConfig.params.customLabel == undefined)) {
					if (bucket[4].aggConfig.params.field == undefined) {
						ylabel = titleCase(bucket[4].aggConfig.__type.name);
					} else {
						ylabel = titleCase(bucket[4].aggConfig.__type.title + " " + bucket[4].aggConfig.params.field.displayName);
					}
				} else {
					ylabel = bucket[4].aggConfig.params.customLabel;
				}
			var count = bucket[2].value;
			var catList = [];
			var catgroupList = [];
			var catFieldname = bucket[0].aggConfig.params.field.displayName;
			var cgFieldname = bucket[1].aggConfig.params.field.displayName;
			if(catFieldname.includes(".raw")|| catFieldname.includes(".csv")){
				catList = bucket[0].value.split(',');
			}else{
				catList.push(bucket[0].value);
			}
			if(cgFieldname.includes(".raw")||cgFieldname.includes(".csv")){
				catgroupList = bucket[1].value.split(',');
			}else{
				catgroupList.push(bucket[1].value);
			}
			for (var j = 0; j < catgroupList.length; j++) {
				var group = $.trim(catgroupList[j]);
				if (groups.indexOf(group) == -1) {
					groups.push(group);
				}
				for (var k = 0; k < catList.length; k++) {
					var category = $.trim(catList[k]);
					var index = getIndexByGroupName(group, category);
					if (index == -1) {
						node.push({
							"group": group,
							"subgroup": category,
							"size": count,
							"xval": (count * bucket[3].value),
							"yval": (count * bucket[4].value)
						});
						if (indexOfNode(colornodes, group) == -1) {
							colornodes.push({
								"label": group,
								"values": series[0].values,
								"value": count
							});
						}

					} else {
						node[index].size = node[index].size + count;
						node[index].xval = node[index].xval + (count * bucket[3].value);
						node[index].yval = node[index].yval + (count * bucket[4].value);
					}

				}

			}
		}
		
		/*if (bucket.length == 8) {			
            temp = 1;
            if (bucket[1].aggConfig.params.customLabel == "" || bucket[1].aggConfig.params.customLabel == undefined) {
                if (bucket[1].aggConfig.params.field == undefined) {
                    sizeLabel = titleCase(bucket[1].aggConfig.__type.name)
                } else {
                    sizeLabel = titleCase(bucket[1].aggConfig.__type.title + " " + bucket[1].aggConfig.params.field.displayName)
                }
            } else {
                sizeLabel = bucket[1].aggConfig.params.customLabel
            }
            if (bucket[2].aggConfig.params.customLabel == "" || bucket[2].aggConfig.params.customLabel == undefined) {
                if (bucket[2].aggConfig.params.field == undefined) {
                    xlabel = titleCase(bucket[2].aggConfig.__type.name)
                } else {
                    xlabel = titleCase(bucket[2].aggConfig.__type.title + " " + bucket[2].aggConfig.params.field.displayName)
                }
            } else {
                xlabel = bucket[2].aggConfig.params.customLabel
            }
            if (bucket[3].aggConfig.params.customLabel == "" || bucket[3].aggConfig.params.customLabel == undefined) {
                if (bucket[3].aggConfig.params.field == undefined) {
                    ylabel = titleCase(bucket[3].aggConfig.__type.name)
                } else {
                    ylabel = titleCase(bucket[3].aggConfig.__type.title + " " + bucket[3].aggConfig.params.field.displayName)
                }
            } else {
                ylabel = bucket[3].aggConfig.params.customLabel
            }
            var count = bucket[5].value;
            var catList = [];
            var catgroupList = [];
            var catFieldname = bucket[0].aggConfig.params.field.displayName;
            var cgFieldname = bucket[4].aggConfig.params.field.displayName;
            if (catFieldname.includes(".raw") || catFieldname.includes(".csv")) {
                catList = bucket[0].value.split(",")
            } else {
                catList.push(bucket[0].value)
            }
            if (cgFieldname.includes(".raw") || cgFieldname.includes(".csv")) {
                catgroupList = bucket[4].value.split(",")
            } else {
                catgroupList.push(bucket[4].value)
            }			
            for (var j = 0; j < catgroupList.length; j++) {
                var group = $.trim(catgroupList[j]);
                if (groups.indexOf(group) == -1) {
                    groups.push(group)
                }
                for (var k = 0; k < catList.length; k++) {
                    var category = $.trim(catList[k]);
                    var index = getIndexByGroupName(group, category);
                    if (index == -1) {
                        node.push({
                            group: group,
                            subgroup: category,
                            size: count,
                            xval: count * bucket[6].value,
                            yval: count * bucket[7].value
                        });
                        if (indexOfNode(colornodes, group) == -1) {
                            colornodes.push({
                                label: group,
                                values: series[0].values,
                                value: count
                            })
                        }
                    } else {
                        node[index].size = node[index].size + count;
                        node[index].xval = node[index].xval + count * bucket[6].value;
                        node[index].yval = node[index].yval + count * bucket[7].value
                    }
                }
            }
        }*/
		
		if (bucket.length == 4) {
				if ((bucket[1].aggConfig.params.customLabel == "") || (bucket[1].aggConfig.params.customLabel == undefined)) {
					if (bucket[1].aggConfig.params.field == undefined) {
						sizeLabel = titleCase(bucket[1].aggConfig.__type.name);

					} else {
						sizeLabel = titleCase(bucket[1].aggConfig.__type.title + " " + bucket[1].aggConfig.params.field.displayName);
					}
				} else {
					sizeLabel = bucket[1].aggConfig.params.customLabel;
				}
				//label for x-axis
				if ((bucket[2].aggConfig.params.customLabel == "") || (bucket[2].aggConfig.params.customLabel == undefined)) {
					if (bucket[2].aggConfig.params.field == undefined) {
						xlabel = titleCase(bucket[2].aggConfig.__type.name);
					} else {
						xlabel = titleCase(bucket[2].aggConfig.__type.title + " " + bucket[2].aggConfig.params.field.displayName);
					}
				} else {
					xlabel = bucket[2].aggConfig.params.customLabel;
				}
				//label for y-axis
				if ((bucket[3].aggConfig.params.customLabel == "") || (bucket[3].aggConfig.params.customLabel == undefined)) {
					if (bucket[3].aggConfig.params.field == undefined) {
						ylabel = titleCase(bucket[3].aggConfig.__type.name);
					} else {
						ylabel = titleCase(bucket[3].aggConfig.__type.title + " " + bucket[3].aggConfig.params.field.displayName);
					}
				} else {
					ylabel = bucket[3].aggConfig.params.customLabel;
				}
			var count = bucket[1].value;
			var fieldname = bucket[0].aggConfig.params.field.displayName;
			var catList = [];
			if(fieldname.includes(".raw")||fieldname.includes(".csv")){
				 catList = bucket[0].value.split(',');
			}else{
				catList.push(bucket[0].value);
			}
		
			for (var j = 0; j < catList.length; j++) {
				var group = $.trim(catList[j]);
				if (groups.indexOf(group) == -1) {
					groups.push(group);
				}
				var index = getIndexByGroupName(group, group);
				if (index == -1) {
					node.push({
						"group": group,
						"subgroup": group,
						"size": count,
						"xval": (count * bucket[2].value),
						"yval": (count * bucket[3].value)
					});
					if (indexOfNode(colornodes, group) == -1) {
						colornodes.push({
							"label": group,
							"values": series[0].values,
							"value": count
						});
					}
				} else {
					node[index].size = node[index].size + count;
					node[index].xval = node[index].xval + (count * bucket[2].value);
					node[index].yval = node[index].yval + (count * bucket[3].value);
				}
			}
		}

	}
	var xmedian = 0;
	var ymedian = 0;
	var xArray = [];
	var yArray = [];
	if (node.length > 0) {
		for (var l = 0; l < node.length; l++) {
			node[l].xval = node[l].xval / node[l].size;
			node[l].yval = node[l].yval / node[l].size;
			xArray.push(parseFloat(node[l].xval));
			yArray.push(parseFloat(node[l].yval));
			if (maxsize < node[l].size) {
				maxsize = node[l].size;
			}
			if (lx > node[l].xval) {
				lx = node[l].xval;
			}
			if (ly > node[l].yval) {
				ly = node[l].yval;
			}
			/* 
			if (mx < node[l].xval) {
				mx = node[l].xval;
			}
			if (my < node[l].yval) {
				my = node[l].yval;
			}
			 */
		}
		xArray = xArray.sort(function (a, b) {
				return parseFloat(a) - parseFloat(b);
			});
		yArray = yArray.sort(function (a, b) {
				return parseFloat(a) - parseFloat(b);
			});
		mx = d3.max(xArray);
		my = d3.max(yArray);
		
		xmedian = d3.median(xArray);
		ymedian = d3.median(yArray);
	}
	chart.series = colornodes;
	dataList.push({
		"nodes": node,
		"groups": groups,
		"sizeLabel": sizeLabel,
		"xlabel": xlabel,
		"ylabel": ylabel,
		"mx": mx,
		"lx": lx,
		"my": my,
		"ly": ly,
		"xArray": xArray,
		"yArray": yArray,
		"xmedian": xmedian,
		"ymedian": ymedian,
		"maxcount": maxsize,
		"aggConfig": aggConf
	});
	chart.series_data = dataList;
	chart.filterManager = table.filterManager;
	delete chart.aspects;
	return chart;
};