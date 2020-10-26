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

import { PointSeries } from './point_series';
import { PieChart } from './pie_chart';
import { GaugeChart } from './gauge_chart';
import { TreemapChart } from '../../../../treemap/public/treemap_chart';
import { BubbleChart } from '../../../../bubble/public/bubble_chart';
import { SankeyChart } from '../../../../sankey/public/sankey_chart';
import { RadarChart } from '../../../../radar/public/radar_chart';
import { HeatMap_dnChart } from '../../../../heatmap_dn/public/heatmap_dn_chart';
import { ScatterBubbleChart } from '../../../../scatterbubble/public/scatterbubble_chart';

export const visTypes = {
  pie: PieChart,
  point_series: PointSeries,
  gauge: GaugeChart,
  goal: GaugeChart,
  metric: GaugeChart,
  treemap: TreemapChart,
  bubble: BubbleChart,
  sankey: SankeyChart,
  radar: RadarChart,
  heatmap_dn: HeatMap_dnChart,
  scatterbubble: ScatterBubbleChart,
};
