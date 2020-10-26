import _ from 'lodash';
import { getSeries } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_series';
//import { getAspects } from 'plugins/radar/response_handler/_get_aspects';
import { getAspects } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_aspects';
import { initYAxis } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_init_y_axis';
import { initXAxis } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_init_x_axis';
//import { RadarTooltipFormatter } from 'plugins/radar/response_handler/_tooltip_formatter';

//export function AggResponseRadarProvider(Private) {
    //const getSeries = Private(PointSeriesGetSeriesProvider);
	//const getAspects = Private(PointSeriesGetAspectsProvider);
	//const initYAxis = Private(PointSeriesInitYAxisProvider);
	//const initXAxis = Private(PointSeriesInitXAxisProvider);
	//const tooltipFormatter = Private(RadarTooltipFormatter);

        export const radarDataFromTable= (table, dimensions) =>{
            var chart = {};
			
			
           // chart.tooltipFormatter = tooltipFormatter;
					
            var isRadialSet = table.vis.setRadialMin;
			var RadialMin = 0;
            if (isRadialSet) {
                RadialMin = table.vis.radial.min;
            }
            var sources = null;
            var aggConf = null;
			try {
                sources = table.custom_rows;
                aggConf = table.custom_columns[0].aggConfig;
			} catch (e) {
                return;
            }


			
			var SplitLines = aggConf.aggConfigs.bySchemaName('group')
			var Segment = aggConf.aggConfigs.bySchemaName('segment');
			var Metric = aggConf.aggConfigs.bySchemaName('metric');
			var Radius = aggConf.aggConfigs.bySchemaName('radius');


			var aspects = chart.aspects = getAspects(table,dimensions);
            initXAxis(chart,table);
            initYAxis(chart);
			chart.series = getSeries(table, chart);
			var rawsource = chart.series;

			var node = [];
			var colorLabels = [];
			var radiusVal=[];
			var RadiusLabel = '';
			var rvalue=null;
			function titleCase(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
	
			 if (Radius.length != 0) {
	                if (Radius[0].params.customLabel == "" || Radius[0].params.customLabel == undefined) {
						   RadiusLabel = Radius[0].__type.title
	                } else {
	                    RadiusLabel = Radius[0].params.customLabel
	                }
	            }
			if(Segment.length!=0 && Metric.length!=0){
				rawsource.map(function(path) {
							var label = path.label;
							var firstArray = [];
							var values = path.values;
							values.map(function(node) {
								var doc_count = 0;
								if(Radius.length!=0){
									rvalue = node.z;
									radiusVal.push(rvalue);
								}
								sources.map(function(doc) {
									if(doc[0].key==node.x){
										doc_count = doc.length;
										return;
									}
								});
									var finalObj = {
										"axis": node.x,
										"value": node.y,
										"label":label,
										"radiVal":rvalue,
										"TooltipLabel": RadiusLabel,
										"TooltipValue":  rvalue,
										"doc_count": doc_count
									};
									firstArray.push(finalObj);
								});

								if(firstArray.length>0){
									node.push(firstArray);
								}
						});
			}
			 //If the supplied maxValue is smaller than the actual one, replace by the max in the data
           for (var l=0;l<node.length;l++) {
			   
			   var metric = node[l];
				var obj = metric[0];
				colorLabels.push({
							"label": obj.label
						});
			}
	
			 chart.c_config = aggConf;
             chart.series_data = node;
  			 chart.colorLabels = colorLabels;
			 chart.bubbleSize=table.vis.radiusRatio;
			 chart.filterManager = table.filterManager;	
			chart.radiusMaxVal=Math.max.apply(Math,radiusVal);
			chart.radiusMinVal=Math.min.apply(Math,radiusVal);
     
            delete chart.aspects;
            return chart;
        };
  //  };
