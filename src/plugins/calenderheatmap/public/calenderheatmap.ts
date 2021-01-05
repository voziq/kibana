

import { i18n } from '@kbn/i18n';
import { Schemas } from '../../vis_default_editor/public';
import { AggGroupNames } from '../../data/public';
//import { CalenderheatmapOptions } from 'plugins/kbn_vislib_vis_types/components/options';

import { VisTypeVislibDependencies } from '../../vis_type_vislib/public/plugin';
import { createVislibVisController } from '../../vis_type_vislib/public/vis_controller';
import { CalenderheatmapOptions } from '../../vis_type_vislib/public/components/options';
import { ColorSchemaParams } from '../../charts/public';
import { CommonVislibParams} from '../../vis_type_vislib/public/types';

import image from '@elastic/eui/lib/components/icon/assets/calendar.svg';

import './heat.scss';



export interface CalenderheatmapVisParams extends CommonVislibParams, ColorSchemaParams {
	type: "calenderheatmap",				
                addTooltip: boolean;
				addLegend: boolean;	
 labels: {show: boolean,};				
			
}

 
   
      export const createCalenderheatmapVisTypeDefinition = (deps: VisTypeVislibDependencies) => ({
        name: 'calenderheatmap', // The internal id of the visualization (must be unique)
        title: 'Calender Heatmap', // The title of the visualization, shown to the user
        description: 'Display data as directional flow chart.', // The description of this vis
      //icon: 'fa fa-gear', // fa fa-circle The font awesome icon of this visualization
		//category: CATEGORY.OTHER,
        // Define the aggregation your visualization accepts
		//image: bubbleSvg,
		image,
        visualization: createVislibVisController(deps),
        visConfig: {
               defaults: {
        type: 'calenderheatmap',
        addTooltip: true,
        addLegend: true,
        legendPosition: 'right',
        isDonut: true,
        labels: {
          show: true,
         
        }
      },          
        },
		//responseHandler: 'vislib_calenderheatmap',
		editorConfig: {
			collections: {
                legendPositions: [{
                    value: "left",
                    text: "left"
                  }, {
                    value: "right",
                    text: "right"
                  }, {
                    value: "top",
                    text: "top"
                  }, {
                    value: "bottom",
                    text: "bottom"
                 }],
				axisModes: ['normal', 'percentage', 'wiggle', 'silhouette'],
				// modes: ['stacked', 'overlap', 'percentage', 'wiggle', 'silhouette']
				chartModes: ['normal', 'stacked'],
				scaleTypes : ['linear', 'log', 'square root']//scales
            },
			
			optionsTemplate: CalenderheatmapOptions,
			schemas: new Schemas([{
					group: AggGroupNames.Metrics,
					name: 'metric',
					title: 'Metric',
					max: 1,
					aggFilter: ['count', 'avg', 'median', 'sum', 'min', 'max', 'cardinality'],
					defaults: [{
						type: 'count',
						schema: 'metric'
					}]
				},
				{
					group: AggGroupNames.Buckets,
					name: 'segment',
					title: 'Time-Axis',
					 max: 1,
					 aggFilter: ['date_histogram'],
          /*defaults: [{
            schema: 'segment',
            type: 'date_histogram',
         
          }]*/
				}
			])
		}
    });
 
