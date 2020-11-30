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

export function sankeyTooltipFormatter() {
	function titleCase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
  return function tooltipFormatter({ datum, data }) {
	  
	
	   
	   
	   var detail = {};
		var label1name = "",
		label2name = "",
		label3name = "",
		metricLabel = "";
            
            var details = [];
			
         	try {
            var metric = data.c_config.aggConfigs.bySchemaName("metric")[0];
            if (metric.params.customLabel == "" || metric.params.customLabel == undefined) {
                metric.params.field == undefined ? metricLabel = titleCase(metric.type.title) : metricLabel = titleCase(metric.__type.title + " " + metric.params.field.displayName)
            } else {
                metricLabel = metric.params.customLabel
            }
            
            if ("source" in datum) {
				var i = parseInt(datum.source.id[datum.source.id.length - 1]);
				var j = parseInt(datum.target.id[datum.target.id.length - 1]);
                var aggLength = data.c_config.aggConfigs.aggs.length;
                var param1 = data.c_config.aggConfigs.aggs[i].params;
                var param2 = data.c_config.aggConfigs.aggs[j].params;
                if ("filters" in param1) {
                    label1name = "filters"
                } else {
					
                    label1name = data.c_config.aggConfigs.aggs[i].params.field.displayName
                }
                if ("filters" in param2) {
                    label2name = "filters"
                } else {
					
                    label2name = data.c_config.aggConfigs.aggs[j].params.field.displayName
                }
                "customLabel" in param1 && param1.customLabel != "" ? label1name = param1.customLabel : label1name;
                "customLabel" in param2 && param2.customLabel != "" ? label2name = param2.customLabel : label2name;
                if (aggLength == 4) {
                    var param3 = data.c_config.aggConfigs.aggs[3].params;
                    if ("filters" in param3) {
                        label3name = "filters"
                    } else {
                        label3name = data.c_config.aggConfigs.aggs[3].params.field.displayName
                    }
                    "customLabel" in param3 && param3.customLabel != "" ? label3name = param3.customLabel : label3name;
                    if (datum.target.name == datum.l3v) {
                        label1name = label2name;
                        label2name = label3name
                    }
                }
                detail = {
                    type: "link",
                    metric: metricLabel,
                    value: Math.round(datum.value * 100) / 100,
                    source: datum.source.name,
                    target: datum.target.name,
                    label1: label1name,
                    label2: label2name
                }
            } else if ("sourceLinks" in datum) {
                var i = parseInt(datum.id[datum.id.length - 1]);
                var nodelabel = "";
                var paramN = data.c_config.aggConfigs.aggs[i].params;
                if ("filters" in paramN) {
                    nodelabel = "filters"
                } else {
                    nodelabel = data.c_config.aggConfigs.aggs[i].params.field.displayName
                }
                "customLabel" in paramN && paramN.customLabel != "" ? nodelabel = paramN.customLabel : nodelabel;
                detail = {
                    type: "node",
                    metric: metricLabel,
                    value: Math.round(datum.value * 100) / 100,
                    node: datum.name,
                    nodelabel: nodelabel
                }
            }
        }catch(e){
			console.log("exception in tootip");
		}
		
	   	details.push(detail);
	   
	  
   

    return renderToStaticMarkup(
      <table>
        <tbody>
          {details.map((detail, index) => (
            <tr key={index}>
			{detail.type=='link' &&
			(<tr>   
			<td className="visTooltip__label">
            <div className="visTooltip__labelContainer">{detail.label1}</div>
            </td>

            <td className="visTooltip__value">
            <div className="visTooltip__valueContainer">
                  {detail.source}
                  {detail.percent && <span> ({detail.percent})</span>}
                </div>
              </td>
			</tr>)}
			  
			  
                  {detail.type=='link' &&( <tr>  
				   <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.label2}</div>
              </td>

              <td className="visTooltip__value">
                <div className="visTooltip__valueContainer">
                  {detail.target}
                  {detail.percent && <span> ({detail.percent})</span>}
                </div>
              </td>
				  </tr>)}
			  {detail.type=='node' &&
                ( <tr>  
				   <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.nodelabel}</div>
              </td>

              <td className="visTooltip__value">
                <div className="visTooltip__valueContainer">
                  {detail.node}
                  {detail.percent && <span> ({detail.percent})</span>}
                </div>
              </td>
			  </tr> )}
			  
			  
			     <tr>  
				   <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.metric}</div>
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
