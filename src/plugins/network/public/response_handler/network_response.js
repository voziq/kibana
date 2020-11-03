//import _ from 'lodash';
//import { getSeries } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_series';
//import { getAspects } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_aspects';
//import { getAspects } from 'plugins/network/response_handler/_get_aspects';
import { getSeries } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_get_series';
import { getAspects } from './_get_aspects';
import { initYAxis } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_init_y_axis';
import { initXAxis } from '../../../vis_type_vislib/public/vislib/helpers/point_series/_init_x_axis';
//import { NetworkTooltipFormatter } from 'plugins/network/response_handler/_tooltip_formatter';

/*export function  AggResponseNetworkProvider(Private) {
	//const getSeries = Private(PointSeriesGetSeriesProvider);
	//const getAspects = Private(PointSeriesGetAspectsProvider);
	//const initYAxis = Private(PointSeriesInitYAxisProvider);
	//const initXAxis = Private(PointSeriesInitXAxisProvider);
	const tooltipFormatter = Private(NetworkTooltipFormatter);*/

	export const buildNetworkData=(table, dimensions) =>{
	//dimensions.y = null;
		const chart = {
			    aspects: getAspects(table, dimensions),
			  };			  
		//chart.tooltipFormatter = tooltipFormatter;
		initXAxis(chart, table);
		initYAxis(chart);
		chart.series = getSeries(table, chart);
			  
		//chart.tooltipFormatter = tooltipFormatter;		
		var graph = {};
		graph.nodes = [];
		graph.links = [];
		var nodes = [];
		var links = [];
		var sourceId = null;
		var sources = [];
		var lpId = 0;
		var indexNum = 0;
		var group = 1;
		var aggConf = null;
		var tags = [];
		try {
			sources = table.custom_rows;
			aggConf = table.custom_columns[0].aggConfig;
		} catch (e) {
			return;
		}			
		
		var series=[];
		sources.map(function(values){			
			var arr=[];
			values.map(function(value){							
				arr.push(value.key);
			});
			series.push(arr);
		});		
	//const aspects = chart.aspects = getAspects(table,dimensions);	
    //initXAxis(chart,table);
    //initYAxis(chart);		
		chart.table_data=table;
		chart.series_data=series;	
		chart.filterManager = table.filterManager;		
		delete chart.aspects;		
		return chart;
	};
/*};*/