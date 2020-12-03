/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { i18n } from '@kbn/i18n';

import { ExpressionFunctionDefinition, KibanaDatatable, Render } from '../../expressions/public';
import { TagCloudVisParams } from './types';

const name = 'tagcloud';

interface Arguments extends TagCloudVisParams {
  metric: any; // these aren't typed yet
  bucket: any; // these aren't typed yet
}

interface RenderValue {
  visType: typeof name;
  visData: KibanaDatatable;
  visConfig: Arguments;
  params: any;
}

export const createTagCloudFn = (): ExpressionFunctionDefinition<
  typeof name,
  KibanaDatatable,
  Arguments,
  Render<RenderValue>
> => ({
  name,
  type: 'render',
  inputTypes: ['kibana_datatable'],
  help: i18n.translate('visTypeTagCloud.function.help', {
    defaultMessage: 'Tagcloud visualization',
  }),
  args: {
    scale: {
      types: ['string'],
      default: 'linear',
      options: ['linear', 'log', 'square root'],
      help: i18n.translate('visTypeTagCloud.function.scale.help', {
        defaultMessage: 'Scale to determine font size of a word',
      }),
    },
	  period: {
        types: ['string'],
        default: 'now-1y',
        options: ['now-7d', 'now-30d', 'now-90d', 'now-6M', 'now-1y'],
        help: i18n.translate('visTypeTagCloud.function.period.help', {
          defaultMessage: 'Period of words inside tagcloud'
        })
      },
	  colorSchema: {
        types: ['string'],
        default: 'Reds',
        options: ['Blues', 'Greens', 'Greys', 'Reds', 'Yellow to Red', 'Green to Red'],
        help: i18n.translate('visTypeTagCloud.function.period.help', {
          defaultMessage: 'Period of words inside tagcloud'
        })
      },
    orientation: {
      types: ['string'],
      default: 'single',
      options: ['single', 'right angled', 'multiple'],
      help: i18n.translate('visTypeTagCloud.function.orientation.help', {
        defaultMessage: 'Orientation of words inside tagcloud',
      }),
    },
    minFontSize: {
      types: ['number'],
      default: 18,
      help: '',
    },
    maxFontSize: {
      types: ['number'],
      default: 55,
      help: '',
    },
	 colorsNumber: {
        types: ['number'],
        default: 4,
        help: ''
      },
    showLabel: {
      types: ['boolean'],
      default: true,
      help: '',
    },
	      sentiment: {
        types: ['boolean'],
        default: false,
        help: ''
      },
      invertColors: {
        types: ['boolean'],
        default: false,
        help: ''
      },
	  
	  
	  colorRange: {
        types: ['range'],
        multi: true,
        help: i18n.translate('visTypeMetric.function.colorRange.help', {
          defaultMessage: 'A range object specifying groups of values to which different colors should be applied.'
        })
      },
	 
      setColorRange: {
        types: ['boolean'],
        default: false,
        help: ''
      },
    metric: {
      types: ['vis_dimension'],
      help: i18n.translate('visTypeTagCloud.function.metric.help', {
        defaultMessage: 'metric dimension configuration',
      }),
      required: true,
    },
    bucket: {
      types: ['vis_dimension'],
      help: i18n.translate('visTypeTagCloud.function.bucket.help', {
        defaultMessage: 'bucket dimension configuration',
      }),
    },
  },
  fn(input, args) {
    const visConfig = {
      scale: args.scale,
      orientation: args.orientation,
      minFontSize: args.minFontSize,
      maxFontSize: args.maxFontSize,
      showLabel: args.showLabel,
	       sentiment: args.sentiment,
        period: args.period,
        invertColors: args.invertColors,
		colorSchema: args.colorSchema,
		setColorRange: args.setColorRange,
		colorsRange: args.colorRange,
         colorsNumber: args.colorsNumber,
      metric: args.metric
    } as Arguments;

    if (args.bucket !== undefined) {
      visConfig.bucket = args.bucket;
    }

    return {
      type: 'render',
      as: 'visualization',
      value: {
        visData: input,
        visType: name,
        visConfig,
        params: {
          listenOnChange: true,
        },
      },
    };
  },
});
