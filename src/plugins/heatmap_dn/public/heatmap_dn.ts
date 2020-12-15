import { Schemas } from '../../vis_default_editor/public';
import { i18n } from '@kbn/i18n';
import heatMapDnSvg from './heatmapDn.svg';
import { HeatMap_dnOptions } from '../../vis_type_vislib/public/components/options';
import { VisTypeVislibDependencies } from '../../vis_type_vislib/public/plugin';
import { createVislibVisController } from '../../vis_type_vislib/public/vis_controller';
import { ColorSchemaParams } from '../../charts/public';
import { CommonVislibParams} from '../../vis_type_vislib/public/types';

export interface HeatmapDnVisParams extends CommonVislibParams, ColorSchemaParams {
	type: "heatmap_dn",
				showLabels: boolean;
                addTooltip: boolean;
				addLegend: boolean;				
				 showLegend: boolean,				
				range : number | '';
				labels: {
          show: boolean
         
        }
			
}

	  	export const createHeatmapDnVisTypeDefinition = (deps: VisTypeVislibDependencies) => ({
        name: 'heatmap_dn', // The internal id of the visualization (must be unique)
        title: 'HeatMap - 2 Metrics', //Dynamic Heatmap The title of the visualization, shown to the user
        description: 'A heat map is a 3D representation of data in which values are represented by a scale of colors from lighter to darker shades. '+
		'A heat map communicates relationships between data values that would be would be much harder to understand if presented numerically in a spreadsheet. '+
		'The x and y axises are not numeric but string. The intensity of the color depends on a numeric paramter. Color intensity is directly proportional to the numeric value. ' +
		'##Use Case: Relate 2 string data and form multiple such groups and these groups can be then differentiated using a common numeric parameter. ' +
		'##For Example: Visualize departments and the associated call categories arranged based upon volume and compare them based on any KPI like FCR to identify low performace areas with the help of color shades. ', // The description of this vis
        //legacyIcon: 'fa-delicious', //fa-table The font awesome icon of this visualization
		//icon:'dot',
		icon: heatMapDnSvg,
		//category: CATEGORY.OTHER,
        // Define the aggregation your visualization accepts
		visualization: createVislibVisController(deps),
		visConfig: {
            defaults: {
				type: 'heatmap_dn',
                showLabels: true,
                addTooltip: true,
                addLegend: true,
                showLegend: true,
				showNumber: false,
                legendPosition: 'right',
				maxmin:{},
                range: 9,
				 labels: {
          show: true
         
        }
            },
            scales: ['linear', 'log', 'square root'],
            modes: ['stacked', 'overlap', 'percentage', 'wiggle', 'silhouette']
        },
		
        //responseHandler: 'vislib_heatmap_dn',
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
                // ranges: [4, 5, 6, 7, 8, 9]
				ranges:[{
                            value: "4",
                            text: "4"
                        }, {
                            value: "5",
                            text: "5"
                        }, {
                            value: "6",
                            text: "6"
                        }, {
                            value: "7",
                            text: "7"
                        }, {
                            value: "8",
                            text: "8"
                        }, {
                            value: "9",
                            text: "9"
                        }
						]
            },
			optionsTemplate: HeatMap_dnOptions,
			schemas: new Schemas([{
					group: 'metrics',
					name: 'metric',
					title: 'Metric',
					max: 1,
					//aggFilter: ['count'],
					defaults: [{
						type: 'count',
						schema: 'metric'
					}]
				},
				{
					group: 'buckets',
					name: 'group',
					title: 'Node 1',
					 max: 1,
				},
				{
					group: 'buckets',
					name: 'segment',
					title: 'Node 2',
					 max: 1,
				}
			])
		}
    });
 