import { Schemas } from '../../vis_default_editor/public';
import { i18n } from '@kbn/i18n';
import './radar.scss';
import radarSvg from './radar.svg';
import { AggGroupNames } from '../../data/public';
import { VisTypeVislibDependencies } from '../../vis_type_vislib/public/plugin';
import { createVislibVisController } from '../../vis_type_vislib/public/vis_controller';
import { RadarOptions } from '../../vis_type_vislib/public/components/options';
import { ColorSchemaParams } from '../../charts/public';
import { CommonVislibParams} from '../../vis_type_vislib/public/types';

export interface RadarVisParams extends CommonVislibParams, ColorSchemaParams {
	type: "radar",				
                addTooltip: boolean;
				addLegend: boolean;	
				radiusRatio : number | '';
				setDocCount: boolean;
				isDonut: boolean;
				setRadialMin: boolean ;
 labels: {show: boolean,};				
			
}


	// Describe our visualization
	 export const createRadarVisTypeDefinition = (deps: VisTypeVislibDependencies) => ({
		name: 'radar', // The internal id of the visualization (must be unique)
		title: 'Radar', // The title of the visualization, shown to the user
		description: 'Display and compare multiple quantitative variables represented on axes starting from the same point.', // The description of this vis
		//icon: 'fa-certificate', //fa fa-bullseye The font awesome icon of this visualization
		icon: radarSvg,
		visualization: createVislibVisController(deps),
		// Define the aggregation your visualization accepts
		visConfig: {
			defaults: {
				type: 'radar',
				addTooltip: true,
				addLegend: true,
				legendPosition: 'right',
				radiusRatio: 9,
				setDocCount: false,
				isDonut: true,
				radial:{},
				docCount:{},
				setRadialMin: false ,
                 maxmin:{},
                  docmarker:{},
				// defaultYExtents: false,
		// setRadialMin: false ,
        labels: {
          show: true
         
        } 
				
			}
		},
		//responseHandler: 'vislib_radar',
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
                 }]
            },
			optionsTemplate: RadarOptions,
			schemas: new Schemas([
				{
					group: 'metrics',
					name: 'metric',
					title: 'Metric',
					min: 1,
					aggFilter: ['!geo_centroid', '!geo_bounds'],
				    defaults: [
						{ schema: 'metric', type: 'count' }
				    ]
				},
				{
				    group: 'metrics',
				    name: 'radius',
				    title: 'Dot Size',
				    min: 0,
				    max: 1,
				    aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality']
				}, {
					group: 'buckets',
					name: 'segment',
					title: 'Group',
					min: 1,
					max: 1,
					aggFilter: ['!geohash_grid', '!filter']
				}, {
					group: 'buckets',
					name: 'group',
					title: 'Split Lines',
					min: 0,
					max: 1,
					aggFilter: ['!geohash_grid', '!filter']
				}
			])
		}
	});
