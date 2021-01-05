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

import { getFormatService } from '../services';
import { buildHierarchicalData, buildPointSeriesData } from './helpers';
import { bubbleDataFromTable } from '../../../bubble/public/response_handler/bubble_viz';
import { buildTreemapData } from '../../../treemap/public/response_handler/treemap_viz';
import { buildSankeyData } from '../../../sankey/public/response_handler/sankey_viz';
import { heatmap_dnDataFromTable } from '../../../heatmap_dn/public/response_handler/heatmap_dn_response';
import { buildScatterBubbleData } from '../../../scatterbubble/public/response_handler/scatter_viz';
import { radarDataFromTable } from '../../../radar/public/response_handler/radar_viz';
import { buildNetworkData } from '../../../network/public/response_handler/network_response';
import { calenderheatmapDataFromTable } from '../../../calenderheatmap/public/response_handler/cheatmap_viz';
import AggConfigResult from './agg_config_result';
function tableResponseHandler(table, dimensions) {
  const converted = { tables: [] };
  const split = dimensions.splitColumn || dimensions.splitRow;

  if (split) {
    converted.direction = dimensions.splitRow ? 'row' : 'column';
    const splitColumnIndex = split[0].accessor;
    const splitColumnFormatter = getFormatService().deserialize(split[0].format);
    const splitColumn = table.columns[splitColumnIndex];
    const splitMap = {};
    let splitIndex = 0;

    table.rows.forEach((row, rowIndex) => {
      const splitValue = row[splitColumn.id];

      if (!splitMap.hasOwnProperty(splitValue)) {
        splitMap[splitValue] = splitIndex++;
        const tableGroup = {
          $parent: converted,
          title: `${splitColumnFormatter.convert(splitValue)}: ${splitColumn.name}`,
          name: splitColumn.name,
          key: splitValue,
          column: splitColumnIndex,
          row: rowIndex,
          table,
          tables: [],
        };
        tableGroup.tables.push({
          $parent: tableGroup,
          columns: table.columns,
          rows: [],
        });

        converted.tables.push(tableGroup);
      }

      const tableIndex = splitMap[splitValue];
      converted.tables[tableIndex].tables[0].rows.push(row);
    });
  } else {
    /*converted.tables.push({
      columns: table.columns,
      rows: table.rows,
    });*/
	
	if(table.resp !== undefined)
			{
          converted.tables.push({
        	   raw:table.resp,
        	   custom_columns: table.resp.columns.map(column => ({ title: column.name, ...column })),
        	   custom_rows: table.resp.rows.map((row, rowIndex) => {
     let previousSplitAgg;
     return table.resp.columns.map((column, columnIndex) => {
       const value = row[column.id];
       const aggConfigResult = new AggConfigResult(column.aggConfig, previousSplitAgg, value, value);
       aggConfigResult.rawData = {
         table: table.resp,
         column: columnIndex,
         row: rowIndex,
       };
       /*if (column.aggConfig.type.type === 'buckets') {
         previousSplitAgg = aggConfigResult;
       }*/
       return aggConfigResult;
     });
   }),
			vis:table.resp.vis,
	  		aggConfig: (column) => column.aggConfig,        	  
            columns: table.columns,
            rows: table.rows,
            filterManager : table.filterManager
          });
			}else{
				converted.tables.push({		        	   		        	  
					aggConfig: (column) => column.aggConfig,		        	  
		            columns: table.columns,
		            rows: table.rows,
		            filterManager : table.filterManager
		          });
			}
	
  }

  return converted;
}

function convertTableGroup(tableGroup, convertTable) {
  const tables = tableGroup.tables;

  if (!tables || !tables.length) return;

  const firstChild = tables[0];
  if (firstChild.columns) {
    const chart = convertTable(firstChild);
    // if chart is within a split, assign group title to its label
    if (tableGroup.$parent) {
      chart.label = tableGroup.title;
    }
    return chart;
  }

  const out = {};
  let outList;

  tables.forEach(function (table) {
    if (!outList) {
      const direction = tableGroup.direction === 'row' ? 'rows' : 'columns';
      outList = out[direction] = [];
    }

    let output;
    if ((output = convertTableGroup(table, convertTable))) {
      outList.push(output);
    }
  });

  return out;
}

function handlerFunction(convertTable) {
  return function (response, dimensions) {
    const tableGroup = tableResponseHandler(response, dimensions);
    let converted = convertTableGroup(tableGroup, (table) => {
      return convertTable(table, dimensions);
    });
    if (!converted) {
      // mimic a row of tables that doesn't have any tables
      // https://github.com/elastic/kibana/blob/7bfb68cd24ed42b1b257682f93c50cd8d73e2520/src/kibana/components/vislib/components/zero_injection/inject_zeros.js#L32
      converted = { rows: [] };
    }

    converted.hits = response.rows.length;

    return converted;
  };
}

export const vislibSeriesResponseHandler = handlerFunction(buildPointSeriesData);

export const vislibSlicesResponseHandler = handlerFunction(buildHierarchicalData);

export const vislibBubbleResponseHandler = handlerFunction(bubbleDataFromTable);

export const vislibTreemapResponseHandler = handlerFunction(buildTreemapData);

export const vislibSankeyResponseHandler = handlerFunction(buildSankeyData);

export const vislibHeatmapDnResponseHandler = handlerFunction(heatmap_dnDataFromTable);

export const vislibScatterBubbleResponseHandler = handlerFunction(buildScatterBubbleData);

export const vislibRadarResponseHandler = handlerFunction(radarDataFromTable);

export const vislibNetworkResponseHandler = handlerFunction(buildNetworkData);

export const vislibCalenderheatmapResponseHandler = handlerFunction(calenderheatmapDataFromTable);
