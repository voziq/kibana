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

export function scatterbubbleTooltipFormatter() {
	function titleCase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
  return function tooltipFormatter({ datum, data }) {
	  
	 
	   
	   
	        var detail;
			
			var groupname = "";
            var subgroupname = "";
            var sgfield = "";
            var sgfieldLabel = "";
            
            var details = [];
          var aggLength = data.series_data[0].aggConfig.aggConfigs.aggs.length;
            try {
                if (data.series_data[0].aggConfig.aggConfigs.bySchemaName("group")) {
                    sgfield = data.series_data[0].aggConfig.aggConfigs.bySchemaName("group")[0].params;
                    sgfieldLabel = data.series_data[0].aggConfig.aggConfigs.bySchemaName("group")[0].params.field.displayName
                } else {
                    sgfield = data.series_data[0].aggConfig.aggConfigs.bySchemaName("segment")[0].params;
                    sgfieldLabel = data.series_data[0].aggConfig.aggConfigs.bySchemaName("segment")[0].params.field.displayName
                }
                "customLabel" in sgfield && sgfield.customLabel != "" ? subgroupname = sgfield.customLabel : subgroupname = sgfieldLabel
            } catch (e) {}
            var detail = {
                detailLength: aggLength,
                subgroup: subgroupname,
                subgroupValue: datum.subgroup,
                groupValue: datum.group,
                group: "",
                type: data.series_data[0].sizeLabel,
                size: Math.round(datum.size * 100) / 100,
                xaxis: data.series_data[0].xlabel,
                xvalue: Math.round(datum.xval * 100) / 100,
                yaxis: data.series_data[0].ylabel,
                yvalue: Math.round(datum.yval * 100) / 100
            };			
            if (aggLength == 5) {
                var gfield = data.series_data[0].aggConfig.aggConfigs.bySchemaName("segment")[0].params;
                var gfieldLabel = data.series_data[0].aggConfig.aggConfigs.bySchemaName("segment")[0].params.field.displayName;
                "customLabel" in gfield && gfield.customLabel != "" ? groupname = gfield.customLabel : groupname = gfieldLabel;
                detail.group = groupname
            } else
                delete detail.group;            
			details.push(detail);
		
	   
	   
	  
   

    return renderToStaticMarkup(
      <table>
        <tbody>
          {details.map((detail, index) => (
            <tr key={index}>
			{detail.detailLength==5 &&
			(<tr>   
			<td className="visTooltip__label">
            <div className="visTooltip__labelContainer">{detail.group}</div>
            </td>

            <td className="visTooltip__value">
            <div className="visTooltip__valueContainer">
                  {detail.groupValue}
                  {detail.percent && <span> ({detail.percent})</span>}
                </div>
              </td>
			</tr>)}
			  
			  
                   <tr>  
				   <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.subgroup}</div>
              </td>

              <td className="visTooltip__value">
                <div className="visTooltip__valueContainer">
                  {detail.subgroupValue}
                  {detail.percent && <span> ({detail.percent})</span>}
                </div>
              </td>
			  </tr>
			  
                 <tr>  
				   <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.xaxis}</div>
              </td>

              <td className="visTooltip__value">
                <div className="visTooltip__valueContainer">
                  {detail.xvalue}
                  {detail.percent && <span> ({detail.percent})</span>}
                </div>
              </td>
			  </tr> 
			     <tr>  
				   <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.yaxis}</div>
              </td>

              <td className="visTooltip__value">
                <div className="visTooltip__valueContainer">
                  {detail.yvalue}
                  {detail.percent && <span> ({detail.percent})</span>}
                </div>
              </td>
			  </tr> 
			  
			     <tr>  
				   <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.type}</div>
              </td>

              <td className="visTooltip__value">
                <div className="visTooltip__valueContainer">
                  {detail.size}
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
