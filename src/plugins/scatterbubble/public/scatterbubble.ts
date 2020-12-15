
import { i18n } from '@kbn/i18n';
import { Schemas } from '../../vis_default_editor/public';
import { AggGroupNames } from '../../data/public';
//import { PieOptions } from './components/options';
import { getPositions, Positions } from '../../vis_type_vislib/public/utils/collections';
import { VisTypeVislibDependencies } from '../../vis_type_vislib/public/plugin';
import { createVislibVisController } from '../../vis_type_vislib/public/vis_controller';
import './scatterbubble.scss';
import './tipsy.scss';
//import scatterTemplate from 'plugins/scatterbubble/scatter.html';
import { ColorSchemaParams } from '../../charts/public';
import { CommonVislibParams} from '../../vis_type_vislib/public/types';
import { ScatterBubbleOptions } from '../../vis_type_vislib/public/components/options';

export interface catterBubbleVisParams extends CommonVislibParams, ColorSchemaParams {
	type: "scatterbubble",
				showLabels: boolean;
                addTooltip: boolean;
				addLegend: boolean;				
				
				setLabelSize : number | '';
				setDocCount: boolean,			
			
}

	
	export const createScatterBubbleVisTypeDefinition = (deps: VisTypeVislibDependencies) => ({
		name: 'scatterbubble', // The internal id of the visualization (must be unique)
        title: 'Scatter Bubble', // The title of the visualization, shown to the user
        description: '3D chart to investigate relationship between multiple variables.', // The description of this vis
        icon: 'dot', //fa fa-th  The font awesome icon of this visualization
		//category: CATEGORY.OTHER,
        visualization: createVislibVisController(deps),
        visConfig: {
            defaults: {
				type: 'scatterbubble',
                showLabels: true,
                setLabelSize : 16,
                addTooltip: true,
                addLegend: true,
                setDocCount: false,
                legendPosition: 'right',
                xAxis :{},
                yAxis :{},
                node : {
					min : 10,
					max : 15
				}
            }
        },
        editorConfig: {
			collections: {
				legendPositions: getPositions()
            },
			optionsTemplate: ScatterBubbleOptions,
			schemas: new Schemas([{
					group: AggGroupNames.Metrics,
					name: 'metric',
					title: 'Node Size',
					max: 1,
					defaults: [{
						type: 'count',
						schema: 'metric'
					}]
				}, {
					group: AggGroupNames.Metrics,
					name: 'metric1',
					title: 'X-axis',
					max: 1
				}, {
					group: AggGroupNames.Metrics,
					name: 'metric2',
					title: 'Y-axis',
					max: 1
				},
				{
					group: AggGroupNames.Buckets,
					name: 'group',
					title: 'Node 1',
					max: 1
				},
				{
					group: AggGroupNames.Buckets,
					name: 'segment',
					title: 'Node 2',
					max: 1
				}
			])
		},
		//hierarchicalData: true,
	    //responseHandler: 'vislib_scatterbubble',
	});
