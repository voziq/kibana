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

import { vislibPointSeriesTypes as pointSeries } from './point_series';
import { vislibPieConfig } from './pie';
import { vislibGaugeConfig } from './gauge';
import { vislibCustomConfig } from './customconf';
export const vislibTypesConfig = {
  histogram: pointSeries.column,
  horizontal_bar: pointSeries.column,
  line: pointSeries.line,
  pie: vislibPieConfig,
  area: pointSeries.area,
  point_series: pointSeries.line,
  heatmap: pointSeries.heatmap,
  gauge: vislibGaugeConfig,
  goal: vislibGaugeConfig,
  metric: vislibGaugeConfig,
  bubble: vislibCustomConfig,
  treemap: vislibCustomConfig,
  sankey: vislibCustomConfig,
   heatmap_dn: vislibCustomConfig,
   scatterbubble: vislibCustomConfig,
    radar: vislibCustomConfig,
};
