//import _ from 'lodash';
import { getSeries } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_series';
import { getAspects } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_aspects';
import { initYAxis } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_init_y_axis';
import { initXAxis } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_init_x_axis';
//import { BubbleTooltipFormatter } from 'plugins/bubble/response_handler/_tooltip_formatter';

    //const getSeries = Private(PointSeriesGetSeriesProvider);
	//const getAspects = Private(PointSeriesGetAspectsProvider);
	//const initYAxis = Private(PointSeriesInitYAxisProvider);
	//const initXAxis = Private(PointSeriesInitXAxisProvider);
  //  const tooltipFormatter = BubbleTooltipFormatter;

   export const calenderheatmapDataFromTable= (table, dimensions) => {
        //	console.log("enteredinto  customVizChartDataFromTable")


        var chart = {};
      //  chart.tooltipFormatter = tooltipFormatter;
        //getSeries(table.rows, chart);

        var graph = [];
        var sources = null;
        var aggConf = null;
        try {
            sources = table.custom_rows;
            aggConf = table.custom_columns[0].aggConfig;
        } catch (e) {
           // resp = null;
            return;
        }
	
     
        for (var lpId = 0; lpId < sources.length; lpId++) {
            var bucket = sources[lpId];
            if (bucket.length == 1) {
                return;
            }
			
			if(bucket[0].value.length !== 0)
			{
            graph.push({
                "key": bucket[0].value,
                "count": bucket[1].value
            });
			}
        }
     
        var tags1 = graph.map(function(bucket) {
            // Use the getValue function of the aggregation to get the value of a bucket
            var value = bucket.count; //metricsAgg.getValue(bucket);
            return {
                label: bucket.key,
                value: bucket.count
            };
        });
        var tags2 = [];
        tags1.map(function(tag) {
            var labels = tag.label;
            tags2.push({
                label: labels,
                value: tag.value,
                aggConfig: aggConf
            })
            /*for (var i = 0; i < labels.length; i++) {
                tags2.push({
                    "label": labels[i],
                    "value": tag.value,
                    "aggConfig": aggConf
                });
            }*/
        });

        var indexOfNode = function(nodesArr, label) {
            return nodesArr.indexOf(nodesArr.filter(function(obj) {
                return obj.label == label;
            })[0]);
        }
        var tags = [];
        tags1.map(function(tag) {
            var labels = tag.label;
            if (indexOfNode(tags, labels) == -1) {
                tags.push({
                    label: $.trim(labels),
                    value: tag.value,
                    aggConfig: aggConf
                })
            } else {
                var obj = tags[indexOfNode(tags, labels)];
                if (table.rows[0][1].aggConfig.type.name == "avg") {
                    obj.value = 0;
                    var count = 0;
                    var sum = 0;
                    for (var j = 0; j < tags2.length; j++) {
                        if (tags2[j].label == obj.label) {
                            sum = sum + tags2[j].value;
                            count++
                        }
                    }
                    if (count > 0)
                        obj.value = sum / count
                } else {
                    obj.value = obj.value + tag.value
                }
                tags[indexOfNode(tags, labels)] = obj
            }
            /*if(labels.length != undefined){
            for (var i = 0; i < labels.length; i++) {
                if (indexOfNode(tags, labels[i]) == -1) {

                    tags.push({
                        "label": $.trim(labels[i]),
                        "value": tag.value,
                        "aggConfig": aggConf
                    });
                } else {
                    var obj = tags[indexOfNode(tags, labels[i])];
                    if (table.rows[0][1].aggConfig.type.name == "avg") {
                        obj.value = 0; //obj.value+tag.value;
                        var count = 0;
                        var sum = 0;
                        for (var j = 0; j < tags2.length; j++) {
                            if (tags2[j].label == obj.label) {
                                sum = sum + tags2[j].value;
                                count++;
                            }
                        }
                        if (count > 0)
                            obj.value = (sum / count);
                    } else {
                        obj.value = obj.value + tag.value;
                    }
                    tags[indexOfNode(tags, labels[i])] = obj;
                }
            }
            }else{
            	tags.push({
                    label: $.trim(labels),
                    value: tag.value,
                    aggConfig: aggConf
                });
            }*/
        });
	
        var tbrows = [];
        var sou = table.custom_rows;
	
        for (var i = 0; i < tags.length; i++) {
            var tr = JSON.parse(JSON.stringify(table.custom_rows[0]));
            tr[0].key = tags[i].label;
            tr[0].value = tags[i].label;
            tr[1].key = tags[i].value;
            tr[1].value = tags[i].value;
            tbrows.push(tr);

        }
        table.custom_rows = tbrows;
	
        var aspects = chart.aspects = getAspects(table, dimensions);
        initXAxis(chart, table);
        initYAxis(chart);
		
        chart.series = getSeries(table, chart);
        chart.series_data = tags;
		chart.queryFilter = table.queryFilter;
      
        delete chart.aspects;
        return chart;

    };
