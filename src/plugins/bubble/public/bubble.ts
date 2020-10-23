
import bubbleSvg from './bubble.svg';


import { i18n } from '@kbn/i18n';
import { Schemas } from '../../vis_default_editor/public';
import { AggGroupNames } from '../../data/public';
import { VisTypeVislibDependencies } from '../../vis_type_vislib/public/plugin';
import { createVislibVisController } from '../../vis_type_vislib/public/vis_controller';
import { BubbleOptions } from '../../vis_type_vislib/public/components/options';

export interface BubbleVisParams extends CommonVislibParams, ColorSchemaParams {
	type: "bubble",				
                addTooltip: boolean;
				addLegend: boolean;	
 labels: {show: boolean,};				
			
}
 
   
    export const createBubbleVisTypeDefinition = (deps, VisTypeVislibDependencies) => ({
        name: 'bubble', // The internal id of the visualization (must be unique)
        title: 'Bubble', // The title of the visualization, shown to the user
        description: 'Display data as directional flow chart.', // The description of this vis
      //icon: 'fa fa-gear', // fa fa-circle The font awesome icon of this visualization
		//category: CATEGORY.OTHER,
        // Define the aggregation your visualization accepts
		icon: bubbleSvg,
        visualization: createVislibVisController(deps),
        visConfig: {
               defaults: {
        type: 'bubble',
        addTooltip: true,
        addLegend: true,
        legendPosition: 'right',
        isDonut: true,
        labels: {
          show: true,
         
        }
      },          
        },
		//responseHandler: 'vislib_bubble',
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
			
			optionsTemplate: BubbleOptions,
			schemas: new Schemas([{
					group: AggGroupNames.Metrics,
					name: 'metric',
					title: 'Metric',
					max: 1,
					defaults: [{
						type: 'count',
						schema: 'metric'
					}]
				},
				{
					group: AggGroupNames.Buckets,
					name: 'group',
					title: 'Node',
					 max: 1
				}
			])
		}
    });
// }
