//import _ from 'lodash';
import { getSeries } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_series';
//import { getAspects } from 'plugins/heatmap_dn/response_handler/_get_aspects';
import { getAspects } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_aspects';
import { initYAxis } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_init_y_axis';
import { initXAxis } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_init_x_axis';
//import { Heatmap_dnTooltipFormatter } from 'plugins/heatmap_dn/response_handler/_tooltip_formatter';

//export function AggResponseHeatMap_dnProvider(Private) {
    
    //const getSeries = Private(PointSeriesGetSeriesProvider);
	//const getAspects = Private(PointSeriesGetAspectsProvider);
	//const initYAxis = Private(PointSeriesInitYAxisProvider);
	//const initXAxis = Private(PointSeriesInitXAxisProvider);
	//const tooltipFormatter = Private(Heatmap_dnTooltipFormatter);
	export const heatmap_dnDataFromTable= (table, dimensions) =>{
    //return function Heatmap_dnDataFromTable(table) {
		
		
        var chart = {};
       // chart.tooltipFormatter = tooltipFormatter;
        var aggConf = null;
        var sources = null;
        try {
            sources = table.custom_rows;
            aggConf = table.custom_columns[0].aggConfig;

        } catch (e) {
            return;
        }
       // chart.series = sources;
	   var aspects = chart.aspects = getAspects(table,dimensions);
	    initXAxis(chart,table);
		initYAxis(chart);
		chart.series = getSeries(table, chart);
		chart.c_sources = sources;
        chart.c_config = aggConf;
        chart.filterManager = table.filterManager;
		
         //return;	
        delete chart.aspects;
        return chart;
		
    };
//};