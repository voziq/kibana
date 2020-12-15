//import { visFactory } from '../../../ui/public/vis/vis_factory';
import { i18n } from '@kbn/i18n';
import { Schemas } from '../../vis_default_editor/public';
import './network_vis.scss';
//import { AggGroupNames } from 'ui/vis/editors/default';
import image from './images/icon-network.svg';
import networkVisTemplate from './network_vis.html';
import { AggGroupNames } from '../../data/public';
//import { PieOptions } from './components/options';
//import { ColorSchemas } from 'ui/vislib/components/color/colormaps';
import { ColorSchemas, ColorSchemaParams } from '../../charts/public';
import { getPositions, Positions} from '../../vis_type_vislib/public/utils/collections';
import { VisTypeVislibDependencies } from '../../vis_type_vislib/public/plugin';
import networkVisParamsTemplate from './network_vis_params.html';
//import { vislibVisController } from 'plugins/kbn_vislib_vis_types/controller';
import { createVislibVisController } from '../../vis_type_vislib/public/vis_controller';
//import { TreemapOptions } from './options';
//import { TreemapOptions } from '../../vis_type_vislib/public/components/options';

import { NetworkOptions } from '../../vis_type_vislib/public/components/options';

import { CommonVislibParams} from '../../vis_type_vislib/public/types';

export interface NetworkVisParams extends CommonVislibParams, ColorSchemaParams {
	type: 'network',
          showLabels: true,
          showPopup: true,
          showColorLegend: true,
          nodePhysics: true,
          firstNodeColor: '#FD7BC4',
          secondNodeColor: '#00d1ff',
          canvasBackgroundColor: '#FFFFFF',
          shapeFirstNode: 'dot',
          shapeSecondNode: 'square',
          displayArrow: false,
          posArrow: 'to',
          shapeArrow: 'arrow',
          smoothType: 'horizontal',
          scaleArrow: 1,
          maxCutMetricSizeNode: 5000,
          maxCutMetricSizeEdge: 5000,
          minCutMetricSizeNode: 0,
          maxNodeSize: 100,
          minNodeSize: 60,
          maxEdgeSize: 2,
          minEdgeSize: 1,
          springConstant: 0.001,
          gravitationalConstant: -35000,
          labelColor: '#000000',
  		  addTooltip: true,
          addLegend: false,          
          nodeBoarderWidth : 5,
          fontSize: 30
			
}

	export const createNetworkVisTypeDefinition = (deps: VisTypeVislibDependencies) => ({
  name: 'network',
  title: i18n.translate('visTypeVislib.heatmap.heatmapTitle', { defaultMessage: 'Network' }),
  icon: image,
	
	
	
        visualization: createVislibVisController(deps),
		 visConfig: {
        defaults: {
  		type: 'network',
          showLabels: true,
          showPopup: true,
          showColorLegend: true,
          nodePhysics: true,
          firstNodeColor: '#FD7BC4',
          secondNodeColor: '#00d1ff',
          canvasBackgroundColor: '#FFFFFF',
          shapeFirstNode: 'dot',
          shapeSecondNode: 'square',
          displayArrow: false,
          posArrow: 'to',
          shapeArrow: 'arrow',
          smoothType: 'horizontal',
          scaleArrow: 1,
          maxCutMetricSizeNode: 5000,
          maxCutMetricSizeEdge: 5000,
          minCutMetricSizeNode: 0,
          maxNodeSize: 100,
          minNodeSize: 60,
          maxEdgeSize: 2,
          minEdgeSize: 1,
          springConstant: 0.001,
          gravitationalConstant: -35000,
          labelColor: '#000000',
  		addTooltip: true,
          addLegend: false,          
          nodeBoarderWidth : 5,
          fontSize: 30
  		//legendPosition: 'right'
        },
        //template: networkVisTemplate,
      },
		// Define the aggregation your visualization accepts 
		editorConfig: {
    	collections: {            
			firstNodeShapes:[{
        value: "dot",
        text: "Dot"
    }, {
        value: "diamond",
        text: "Diamond"
    }, {
        value: "star",
        text: "Star"
    }, {
        value: "triangle",
        text: "Triangle"
    }, {
        value: "triangleDown",
        text: "Triangle Down"
    }, {
        value: "square",
        text: "Square"
    }
	],
	secondNodeShapes:[{
        value: "dot",
        text: "Dot"
    }, {
        value: "diamond",
        text: "Diamond"
    }, {
        value: "star",
        text: "Star"
    }, {
        value: "triangle",
        text: "Triangle"
    }, {
        value: "triangleDown",
        text: "Triangle Down"
    }, {
        value: "square",
        text: "Square"
    }
	],
	endPoints:[{
        value: "from",
        text: "Beginning"
    },{
        value: "middle",
        text: "Middle"
    },{
        value: "to",
        text: "End side"
    }],endPointTypes:[{
        value: "arrow",
        text: "Arrow"
    },{
        value: "circle",
        text: "Circle"
    }],smoothTypes:[{
        value: "dynamic",
        text: "Dynamic"
    },{
        value: "continuous",
        text: "Continuous Anchor"
    },{
        value: "discrete",
        text: "Discrete Anchor"
    },{
        value: "diagonalCross",
        text: "Diagonal Anchor"
    },{
        value: "straightCross",
        text: "Straight Line"
    },{
        value: "horizontal",
        text: "Horizontal Anchor"
    },{
        value: "vertical",
        text: "Vertical Anchor"
    },{
        value: "curvedCW",
        text: "Clock-wise Curve"
    },{
        value: "curvedCCW",
        text: "Counter-Clock-wise Curve"
    },{
        value: "cubicBezier",
        text: "Cubic Bezier"
    }]
		},
		optionsTemplate: NetworkOptions,
		schemas: new Schemas([
        {
          group: AggGroupNames.Metrics,
          name: 'size_node',
          title: 'Node Size',
          mustBeFirst: 'true',
          max: 1,
		  defaults: [{
						type: 'count',
						schema: 'size_node'
					}]
          /*
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
          */
          //aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality', 'std_dev']
        },
        {
          group: AggGroupNames.Metrics,
          name: 'size_edge',
          title: 'Edge Size',
          max: 1,
        },
        {
          group: AggGroupNames.Buckets,
          name: 'first',
          icon: 'fa fa-circle-thin',
          mustBeFirst: 'true',
          title: 'Node',
          min: 1,
          max: 2,
          aggFilter: ['terms']//Only have sense choose terms
        },
        {
          group: AggGroupNames.Buckets,
          name: 'second',
          icon: 'fa fa-random',
          title: 'Relation',
          max: 1,
          aggFilter: ['terms']
        }
	  ])	  
		},		
		//hierarchicalData: true,
	   // responseHandler: 'vislib_treemap',
   // });
 //};
 });