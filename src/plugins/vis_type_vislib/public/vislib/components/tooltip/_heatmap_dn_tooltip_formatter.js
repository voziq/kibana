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

export function heatmapDnTooltipFormatter() {
  return function tooltipFormatter({ datum, data }) {
	  
	 
	  
    if (!datum) return '';

 const details = [];	
 
 
 var field1 = data.c_config.params;
		var field1Lable = data.c_config.params.field.displayName;
		var metric = data.c_config.aggConfigs.bySchemaName('metric');
		//console.dir(feature.data.c_config.vis.aggs);
		var metricLabel = "";

				if ((metric[0].params.customLabel != "")&&(metric[0].params.customLabel != undefined)) {	
					metricLabel = metric[0].params.customLabel;
				}else
				{
				metricLabel = metric[0].__type.title;	
				}
		var groupname = field1Lable;
		if (('customLabel' in field1) && field1.customLabel != "") {
			groupname = field1.customLabel;
		};
		var subgroupname = groupname;
		if (data.c_config.aggConfigs.aggs.length == 3) {
			var field2 = data.c_config.aggConfigs.aggs[2].params;
            var field2Lable = data.c_config.aggConfigs.aggs[2].params.field.displayName;
			subgroupname = field2Lable;
			if (('customLabel' in field2) && field2.customLabel != "") {
				subgroupname = field2.customLabel;
			};
		}
		var detail = {
			value: datum.value,
			x: datum.x,
			y: datum.y,
			xh: groupname, //datum.xh,
			yh: subgroupname, //datum.yh,
			vh: metricLabel
		};
		details.push(detail);
	  
	

    return renderToStaticMarkup(
      <table>
        <tbody>
          {details.map((detail, index) => (
            <tr key={index}>
			<tr>
              <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.xh}</div>
              </td>

              <td className="visTooltip__value">
                <div className="visTooltip__valueContainer">
                  {detail.x}
                  {detail.percent && <span> ({detail.percent})</span>}
                </div>
              </td>
			  </tr>
			        <tr>  
				   <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.yh}</div>
              </td>

              <td className="visTooltip__value">
                <div className="visTooltip__valueContainer">
                  {detail.y}
                  {detail.percent && <span> ({detail.percent})</span>}
                </div>
              </td>
			  </tr>
			      <tr>  
				   <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.vh}</div>
              </td>

              <td className="visTooltip__value">
                <div className="visTooltip__valueContainer">
                  {detail.value}
                  {detail.percent && <span> ({detail.percent})</span>}
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
