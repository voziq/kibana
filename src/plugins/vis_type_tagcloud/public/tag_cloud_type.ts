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
import "./tag_cloud_vis.scss";
import { i18n } from '@kbn/i18n';

import { Schemas } from '../../vis_default_editor/public';

import { TagCloudOptions } from './components/tag_cloud_options';
import { VIS_EVENT_TO_TRIGGER } from '../../../plugins/visualizations/public';

// @ts-ignore
import { createTagCloudVisualization } from './components/tag_cloud_visualization';
import { TagCloudVisDependencies } from './plugin';

export const createTagCloudVisTypeDefinition = (deps: TagCloudVisDependencies) => ({
  name: 'tagcloud',
  title: i18n.translate('visTypeTagCloud.vis.tagCloudTitle', { defaultMessage: 'Tag Cloud' }),
  icon: 'visTagCloud',
  getSupportedTriggers: () => {
    return [VIS_EVENT_TO_TRIGGER.filter];
  },
  description: i18n.translate('visTypeTagCloud.vis.tagCloudDescription', {
    defaultMessage: 'A group of words, sized according to their importance',
  }),
  visConfig: {
    defaults: {
      scale: 'linear',
	    type: 'tagcloud',
      orientation: 'single',
      minFontSize: 18,
      maxFontSize: 55,
      showLabel: true,
	  	sentiment:false,
		period:'now-1y',
        colorSchema: 'Reds',
        invertColors: false,
        setColorRange: false,
        colorsRange: [{
            from: 0,
            to: 100
          }],
    },
  },
  visualization: createTagCloudVisualization(deps),
  editorConfig: {
    collections: {
				  colorSchemas: [{
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.colorSchemas.LastSevenDays', {
            defaultMessage: 'Blues'
          }),
          value: 'Blues'
        }, {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.colorSchemas.LastThirtyDays', {
            defaultMessage: 'Greens'
          }),
          value: 'Greens'
        }, {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.colorSchemas.LastNinetyDays', {
            defaultMessage: 'Greys'
          }),
          value: 'Greys'
        }, {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.colorSchemas.LastSixMonths', {
            defaultMessage: 'Reds'
          }),
          value: 'Reds'
        }, {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.colorSchemas.LastOneYear', {
            defaultMessage: 'Yellow to Red'
          }),
          value: 'Yellow to Red'
        },
		 {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.colorSchemas.LastOneYear', {
            defaultMessage: 'Green to Red'
          }),
          value: 'Green to Red'
        }],	
      scales: [
        {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.scales.linearText', {
            defaultMessage: 'Linear',
          }),
          value: 'linear',
        },
        {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.scales.logText', {
            defaultMessage: 'Log',
          }),
          value: 'log',
        },
        {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.scales.squareRootText', {
            defaultMessage: 'Square root',
          }),
          value: 'square root',
        },
      ],
	  		periods: [{
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.periods.LastSevenDays', {
            defaultMessage: 'Last 7 Days'
          }),
          value: 'now-7d'
        }, {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.periods.LastThirtyDays', {
            defaultMessage: 'Last 30 Days'
          }),
          value: 'now-30d'
        }, {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.periods.LastNinetyDays', {
            defaultMessage: 'Last 90 Days'
          }),
          value: 'now-90d'
        }, {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.periods.LastSixMonths', {
            defaultMessage: 'Last 6 Months'
          }),
          value: 'now-6M'
        }, {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.periods.LastOneYear', {
            defaultMessage: 'Last 1 Year'
          }),
          value: 'now-1y'
        }],	
      orientations: [
        {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.orientations.singleText', {
            defaultMessage: 'Single',
          }),
          value: 'single',
        },
        {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.orientations.rightAngledText', {
            defaultMessage: 'Right angled',
          }),
          value: 'right angled',
        },
        {
          text: i18n.translate('visTypeTagCloud.vis.editorConfig.orientations.multipleText', {
            defaultMessage: 'Multiple',
          }),
          value: 'multiple',
        },
      ],
    },
    optionsTemplate: TagCloudOptions,
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: i18n.translate('visTypeTagCloud.vis.schemas.metricTitle', {
          defaultMessage: 'Tag size',
        }),
        min: 1,
        max: 1,
        aggFilter: [
          '!std_dev',
          '!percentiles',
          '!percentile_ranks',
          '!derivative',
          '!geo_bounds',
          '!geo_centroid',
        ],
        defaults: [{ schema: 'metric', type: 'count' }],
      },
	  {
        group: 'metrics',
        name: 'metric1',
        title: i18n.translate('visTypeTagCloud.vis.schemas.metricTitle', {
          defaultMessage: 'Tag Color'
        }),
		max: 1,
        aggFilter: ["count","avg","sum"]  
      },
      {
        group: 'buckets',
        name: 'segment',
        title: i18n.translate('visTypeTagCloud.vis.schemas.segmentTitle', {
          defaultMessage: 'Tags',
        }),
        min: 1,
        max: 1,
        aggFilter: ['terms', 'significant_terms'],
      },
    ]),
  },
  useCustomNoDataScreen: true,
});
