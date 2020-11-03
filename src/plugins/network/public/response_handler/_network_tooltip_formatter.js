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

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export function networkTooltipFormatter() {
	function titleCase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
  return function tooltipFormatter({ datum, data }) {
	  

	   
	   
	        var detail;
            
            var details = [];
            
			
			  try {
               var datum = feature.datum;
		var details = $tooltipScope.details = [];
		var fieldname = feature.data.series_data.aggConfig.params.field;
		var metric = feature.data.series_data.aggConfig.aggConfigs.bySchemaName['metric'][0];
		var metricLabel = "";
		if ((metric.params.customLabel == "") || (metric.params.customLabel == undefined)) {
				(metric.params.field == undefined) ? metricLabel = titleCase(metric.type):metricLabel = titleCase(metric.__type.title + " " + metric.params.field.displayName);
			} else {
					metricLabel = metric.params.customLabel;
				}
		//console.dir(feature);
		if (('customLabel' in feature.data.series_data.aggConfig.params) && feature.data.series_data.aggConfig.params.customLabel != "") {
			fieldname = feature.data.series_data.aggConfig.params.customLabel;
		}
		var detail = {
			label: fieldname, //datum.vh,
			value: datum.name,
			metric_label: metricLabel,
			metric_value: Math.round(datum.value * 100) / 100
		};
            } catch (e) {
                console.dir("exception in tooltip")
            }
            if (detail != undefined) {
                details.push(detail);
              //  $tooltipScope.$apply();
               // return $tooltip[0].outerHTML
            }
		
	   
	   
	  
   

    return renderToStaticMarkup(
        <table  border="1" >
  <tbody>
      {details.map((detail, index) => (
          <tr key={index}>
          <tr>  
				   <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.label}</div>
              </td>

              <td className="visTooltip__value">
                <div className="visTooltip__valueContainer">
                  {detail.value}                  
                </div>
              </td>
			  </tr>
              <tr>  
				   <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.metric_label}</div>
              </td>

              <td className="visTooltip__value">
                <div className="visTooltip__valueContainer">
                  {detail.metric_value}                  
                </div>
              </td>
			  </tr>
              </tr>
    ))}
  </tbody>
</table>
    );
  };
}
