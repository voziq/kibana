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

export function radarTooltipFormatter() {
  return function tooltipFormatter({ datum, data }) {
	  
	 
	  
    if (!datum) return '';

 var details = [];	
 
 
   var fieldname = data.c_config.params.field.displayName;
   
   
   
   		if (('customLabel' in data.c_config.params) && data.c_config.params.customLabel!="") {
				fieldname = data.c_config.params.customLabel;
			} 
			details = [
									  {
										label: fieldname,
										value: datum.axis
									  },
									  {
										label: datum.label,
										value: Math.round(datum.value * 100) / 100
									  }
									];
			if(datum.TooltipLabel){
				details.push({
				label: datum.TooltipLabel,
				value: datum.TooltipValue
			  });
			}

	  
	

    return renderToStaticMarkup(
      <table>
        <tbody>
          {details.map((detail, index) => (
            <tr key={index}>
              <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.label}</div>
              </td>

              <td className="visTooltip__value">
                <div className="visTooltip__valueContainer">
                  {detail.value}
                  {detail.percent && <span> ({detail.percent})</span>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
}
