
import { i18n } from '@kbn/i18n';
import { Schemas } from '../../vis_default_editor/public';
import { AggGroupNames } from '../../data/public';


import { getPositions, Positions } from '../../vis_type_vislib/public/utils/collections';
import { VisTypeVislibDependencies } from '../../vis_type_vislib/public/plugin';
import { createVislibVisController } from '../../vis_type_vislib/public/vis_controller';
import { SankeyOptions } from '../../vis_type_vislib/public/components/options';
import './sankey.scss';
import sankeySvg from './sankey.svg';
 
    export interface SankeyVisParams extends CommonVislibParams, ColorSchemaParams {
	type: "sankey",				
                addTooltip: boolean;
				addLegend: boolean;	
 showLabels: boolean;			
			
}
 
	export const createSankeyVisTypeDefinition = (deps, VisTypeVislibDependencies) => ({
	name: 'sankey', // The internal id of the visualization (must be unique)
	title: 'Sankey', // The title of the visualization, shown to the user
	description: 'Display data as directional flow chart.', // The description of this vis
	icon: sankeySvg,
	visualization: createVislibVisController(deps),
	visConfig: {
		defaults: {
		  type: 'sankey',
		  showLabels: true,
		  addTooltip: true,
		  addLegend: true, 
		  legendPosition: 'right'
		}
	},	
	editorConfig: {
		collections: {
			legendPositions: getPositions()
        },
		optionsTemplate: SankeyOptions,
		schemas: new Schemas([
			{
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
			  title: 'Level',
			  max: 6
			}
		])
	},
	//hierarchicalData: true,
	//responseHandler: 'vislib_sankey',
  });


