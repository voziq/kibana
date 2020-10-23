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

export function treemapTooltipFormatter() {
	function titleCase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
  return function tooltipFormatter({ datum, data }) {
	  

	   
	   
	        var detail;
            
            var details = [];
            var gname = "";
            var metricLabel = "";
            var colorLabel = "";
			
			  try {
                var metric = datum.parent.aggConfig.aggConfigs.bySchemaName("metric")[0];
                if (metric != undefined) {
                    if (metric.params.customLabel == "" || metric.params.customLabel == undefined) {
                        metric.params.field == undefined ? metricLabel = titleCase(metric.type.title) : metricLabel = titleCase(metric.__type.title + " " + metric.params.field.displayName)
                    } else {
                        metricLabel = metric.params.customLabel
                    }
                }
                var metric1 = datum.parent.aggConfig.aggConfigs.bySchemaName("metric1")[0];
                if (metric1 != undefined) {
                    if (metric1.params.customLabel == "" || metric1.params.customLabel == undefined) {
                        metric1.params.field == undefined ? colorLabel = titleCase(metric1.type.title) : colorLabel = titleCase(metric1.__type.title + " " + metric1.params.field.displayName)
                    } else {
                        colorLabel = metric1.params.customLabel
                    }
                }
                if (datum.name == "flare" && datum.children != undefined) {
                    var field1 = data.parent.aggConfig.aggConfigs.bySchemaName("group")[0].params;
					if(field1.filters == undefined){
                    gname = datum.parent.aggConfig.aggConfigs.aggs[1].params.field.displayName;
                    "customLabel" in field1 && field1.customLabel != "" ? gname = field1.customLabel : gname;
					}else if("filters" in field1){
						gname = "filters";
					}
                    var subname = gname;
                    if (data.children[0].aggConfig.aggConfigs.aggs.length == 3) {
                        var field2 = data.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params;
						if(field2.filters == undefined){
                        subname = datum.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params.field.displayName;
                        "customLabel" in field2 && field2.customLabel != "" ? subname = field2.customLabel : subname
						}else if("filters" in field2){
						subname = "filters";
					}
                    } else if (data.children[0].aggConfig.aggConfigs.aggs.length == 4) {
                        var field2 = data.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params;
						if(field2.filters == undefined){
                        subname = datum.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params.field.displayName;
                        "customLabel" in field2 && field2.customLabel != "" ? subname = field2.customLabel : subname
						}else if("filters" in field2){
						subname = "filters";
					}
                    }
                    detail = {
                        group: gname,
                        gvalue: datum.children[0].gvalue,
                        svalue: datum.children[0].svalue,
                        metric: metricLabel,
                        subgroup: subname,
                        colorLabel: colorLabel,
                        colorValue: datum.colorValue,
                        size: Math.round(datum.size * 100) / 100
                    }
                } else if (datum.parent != undefined) {
                    var field1 = "";
                    var field2 = "";									
                    field1 = data.parent.aggConfig.aggConfigs.bySchemaName("group")[0].params;
					if(field1.filters == undefined){
                    gname = datum.parent.aggConfig.params.field.displayName;
                    "customLabel" in field1 && field1.customLabel != "" ? gname = field1.customLabel : gname;
					}else if("filters" in field1){
						gname = "filters";
					}
                    var subname = gname;
                    if ("aggConfig" in data && data.aggConfig.aggConfigs.aggs.length == 3) {
                        field2 = data.aggConfig.aggConfigs.aggs[2].params;
						if(field2.filters == undefined){
                        subname = datum.parent.aggConfig.aggConfigs.aggs[2].params.field.displayName;										
                        "customLabel" in field2 && field2.customLabel != "" ? subname = field2.customLabel : subname
						}else if("filters" in field2){
						subname = "filters";
					}
                    } else if (data.parent.aggConfig.aggConfigs.aggs.length == 3) {										
                        field2 = data.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params;
						if(field2.filters == undefined){
                        subname = datum.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params.field.displayName;
                        "customLabel" in field2 && field2.customLabel != "" ? subname = field2.customLabel : subname
						}else if("filters" in field2){
						subname = "filters";
					}
                    } else if (data.parent.aggConfig.aggConfigs.aggs.length == 4) {
                        field2 = data.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params;
						if(field2.filters == undefined){
                        subname = datum.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params.field.displayName;
                        "customLabel" in field2 && field2.customLabel != "" ? subname = field2.customLabel : subname
						}else if("filters" in field2){
						subname = "filters";
					}
                    }
                    detail = {
                        group: gname,
                        gvalue: datum.parent.gvalue,
                        svalue: datum.name,
                        subgroup: subname,
                        metric: metricLabel,
                        colorLabel: colorLabel,
                        colorValue: datum.colorValue,
                        size: Math.round(datum.size * 100) / 100
                    }
                }
            } catch (e) {
                console.dir("exception in tooltip")
            }
            if (detail != undefined) {
                details.push(detail);
              //  $tooltipScope.$apply();
               // return $tooltip[0].outerHTML
            }
		
	   
	   
	  
   

    return renderToStaticMarkup(
      <table>
        <tbody>
          {details.map((detail, index) => (
            <tr key={index}>
			{detail.svalue!=detail.gvalue &&
			(<tr>   
			<td className="visTooltip__label">
            <div className="visTooltip__labelContainer">{detail.group}</div>
            </td>

            <td className="visTooltip__value">
            <div className="visTooltip__valueContainer">
                  {detail.gvalue}
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
                  {detail.svalue}
                  {detail.percent && <span> ({detail.percent})</span>}
                </div>
              </td>
			  </tr>
			  
                 <tr>  
				   <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.metric}</div>
              </td>

              <td className="visTooltip__value">
                <div className="visTooltip__valueContainer">
                  {detail.size}
                  {detail.percent && <span> ({detail.percent})</span>}
                </div>
              </td>
			  </tr> 
			     <tr>  
				   <td className="visTooltip__label">
                <div className="visTooltip__labelContainer">{detail.colorLabel}</div>
              </td>

              <td className="visTooltip__value">
                <div className="visTooltip__valueContainer">
                  {detail.colorValue}
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
