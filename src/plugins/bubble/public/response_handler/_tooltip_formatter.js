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

import $ from 'jquery';
import template from './_tooltip.html';

export function BubbleTooltipFormatterProvider($compile, $rootScope) {

  const $tooltipScope = $rootScope.$new();
  const $tooltip = $(template);
  $compile($tooltip)($tooltipScope);

  return function () {
    return function tooltipFormatter(event) {
		
      const data = event.data;
      const datum = event.datum;
      if (!datum) return '';

      const details = $tooltipScope.details = [];	  
	
      const addDetail = (label, value) => details.push({ label, value });

     

      if (datum.label) {
		 
        
    	  if (('customLabel' in datum.seriesType[0].values[0].seriesRaw.table.raw.columns[0].aggConfig.params) && datum.seriesType[0].values[0].seriesRaw.table.raw.columns[0].aggConfig.params.customLabel!="") {
				
				addDetail(datum.seriesType[0].values[0].seriesRaw.table.raw.columns[0].aggConfig.params.customLabel, datum.label);
			}else{
				
				addDetail(datum.seriesType[0].values[0].seriesRaw.table.raw.columns[0].aggConfig.params.field.displayName, datum.label);
			}
      }
      if (datum.value) {
       
        addDetail(datum.seriesType[0].values[0].xRaw.table.columns[1].name, datum.value);
      }
     

      $tooltipScope.$apply();
      return $tooltip[0].outerHTML;
    };
  };
}

let _tooltipFormatter;
export const getBubbleTooltipFormatter = () => {
  if (!_tooltipFormatter) {
    throw new Error('tooltip formatter not initialized');
  }
  return _tooltipFormatter;
};

export const setBubbleTooltipFormatter = Private => {
  _tooltipFormatter = Private(BubbleTooltipFormatterProvider);
};
