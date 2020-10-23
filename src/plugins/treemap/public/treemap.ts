//import { visFactory } from '../../../ui/public/vis/vis_factory';
import { i18n } from '@kbn/i18n';
import { Schemas } from '../../vis_default_editor/public';
//import { AggGroupNames } from 'ui/vis/editors/default';

import { AggGroupNames } from '../../data/public';
//import { PieOptions } from './components/options';
//import { ColorSchemas } from 'ui/vislib/components/color/colormaps';
import { ColorSchemas } from '../../charts/public';
import { getPositions, Positions, getHeatmapCollections, getGroupAlignment, TreemapSortOptions, GroupAlignment } from '../../vis_type_vislib/public/utils/collections';
import { VisTypeVislibDependencies } from '../../vis_type_vislib/public/plugin';
//import { vislibVisController } from 'plugins/kbn_vislib_vis_types/controller';
import { createVislibVisController } from '../../vis_type_vislib/public/vis_controller';
//import { TreemapOptions } from './options';
import './treemap.scss';
import treemapSvg from './treemap.svg';
import { TreemapOptions } from '../../vis_type_vislib/public/components/options';


export interface TreemapVisParams extends CommonVislibParams, ColorSchemaParams {
	type: "treemap",
				showLabels: boolean;
                addTooltip: boolean;
				addLegend: boolean;				
				showGroupLabels: boolean;
				setColorRange: boolean;
				setGroupLabelSize : number | '';
				showGroup2Labels: boolean;
				setGroup2LabelSize : number | '';
				sortTreemap : boolean;
				groupColors : boolean;
			
}

	export const createTreemapVisTypeDefinition = (deps, VisTypeVislibDependencies) => ({
  name: 'treemap',
  title: i18n.translate('visTypeVislib.heatmap.heatmapTitle', { defaultMessage: 'Treemap' }),
  icon: treemapSvg,
	
	
	
        visualization: createVislibVisController(deps),
		visConfig: {
            defaults: {
				type: "treemap",
				showLabels: true,
                addTooltip: true,
				addLegend: true,
				legendPosition: Positions.RIGHT,
				colorSchema: ColorSchemas.Greens,
				showGroupLabels: false,
				setColorRange: false,
				setGroupLabelSize : 7,
				showGroup2Labels: true,
				setGroup2LabelSize : 12,
				sortTreemap : false,
				groupColors : false,
				setGroup2Position : GroupAlignment.CENTER,
				treemapSortOption : TreemapSortOptions.DESCENDING
            }
        },
        // Define the aggregation your visualization accepts        
		editorConfig: {			
			collections: getHeatmapCollections(),            
            optionsTemplate: TreemapOptions,			
			schemas: new Schemas([{
					group: AggGroupNames.Metrics,
					name: 'metric',
					title: 'Metric',
					max: 1,
					defaults: [{
						type: 'count',
						schema: 'metric'
					}]
				},{
			        group: AggGroupNames.Metrics,
			        name: 'metric1',
			        title: 'Color Metric',
					max: 1,
			        aggFilter: ["count","avg","sum"]  
							},
				{
					group: AggGroupNames.Buckets,
					name: 'group',
					title: 'Group 1',
					max: 1
				},
				{
					group: AggGroupNames.Buckets,
					name: 'segment',
					title: 'Group 2',
					max: 1
				}
			])
		},		
		//hierarchicalData: true,
	   // responseHandler: 'vislib_treemap',
   // });
 //};
 });