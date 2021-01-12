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

import html from './doc_table.html';
import { dispatchRenderComplete } from '../../../../../kibana_utils/public';
import { SAMPLE_SIZE_SETTING } from '../../../../common';
// @ts-ignore
import { getLimitedSearchResultsMessage } from './doc_table_strings';
import { getServices } from '../../../kibana_services';
import './index.scss';

import { AggConfigResult } from './agg_config_result';
import { AggConfig } from '../../../../../data/common/';
import moment from 'moment';

export interface LazyScope extends ng.IScope {
  [key: string]: any;
}

export function createDocTableDirective(pagerFactory: any, $filter: any) {
  return {
    restrict: 'E',
    template: html,
    scope: {
      sorting: '=',
      columns: '=',
      hits: '=',
      totalHitCount: '=',
      indexPattern: '=',
      isLoading: '=?',
      infiniteScroll: '=?',
      filter: '=?',
      minimumVisibleRows: '=?',
      onAddColumn: '=?',
      onChangeSortOrder: '=?',
      onMoveColumn: '=?',
      onRemoveColumn: '=?',
      inspectorAdapters: '=?',
    },
    link: function ($scope: LazyScope, $el: JQuery) {

          const self = this;
           const { uiSettings: config } = getServices();
              self._saveAs = require('@elastic/filesaver').saveAs;
          self.csv = {
            separator: config.get('csv:separator'),
            quoteValues: config.get('csv:quoteValues')
          };
      $scope.persist = {
        sorting: $scope.sorting,
        columns: $scope.columns,
      };

      const limitTo = $filter('limitTo');
      const calculateItemsOnPage = () => {
        $scope.pager.setTotalItems($scope.hits.length);
        $scope.pageOfItems = limitTo($scope.hits, $scope.pager.pageSize, $scope.pager.startIndex);
      };

      $scope.limitedResultsWarning = getLimitedSearchResultsMessage(
        getServices().uiSettings.get(SAMPLE_SIZE_SETTING, 500)
      );

      $scope.addRows = function () {
        $scope.limit += 50;
      };

      $scope.$watch('hits', (hits: any) => {
        if (!hits) return;

        // Reset infinite scroll limit
        $scope.limit = $scope.minimumVisibleRows || 50;

        if (hits.length === 0) {
          dispatchRenderComplete($el[0]);
        }

        if ($scope.infiniteScroll) return;
        $scope.pager = pagerFactory.create(hits.length, 50, 1);
        calculateItemsOnPage();
      });
      /*$scope.$watch('searchSource', function () {
            if (!$scope.searchSource){ return}else{
	console.dir($scope.searchSource);
};
            $scope.indexPattern = $scope.searchSource.getField('index');
            $scope.searchSource.setField('size', config.get('discover:sampleSize'));
            $scope.searchSource.setField('sort', getSort($scope.sorting, $scope.indexPattern));
            // Set the watcher after initialization
            $scope.$watchCollection('sorting', function (newSort, oldSort) {
            // Don't react if sort values didn't really change
              if (newSort === oldSort) return;
              $scope.searchSource.setField('sort', getSort(newSort, $scope.indexPattern));
              $scope.searchSource.fetchQueued();
            });
            $scope.$on('$destroy', function () {
              if ($scope.searchSource) $scope.searchSource.destroy();
            });
            function onResults(resp) {
            // Reset infinite scroll limit
              $scope.limit = 50;
              // Abort if something changed
              if ($scope.searchSource !== $scope.searchSource) return;
              $scope.hits = resp.hits.hits;
              if ($scope.hits.length === 0) {
                dispatchRenderComplete($el[0]);
              }
              // We limit the number of returned results, but we want to show the actual number of hits, not
              // just how many we retrieved.
              $scope.totalHitCount = resp.hits.total;
              $scope.pager = pagerFactory.create($scope.hits.length, 50, 1);
              calculateItemsOnPage();
              return $scope.searchSource.onResults().then(onResults);
            }
            function startSearching() {
              let inspectorRequest = undefined;
              if (_.has($scope, 'inspectorAdapters.requests')) {
                $scope.inspectorAdapters.requests.reset();
                inspectorRequest = $scope.inspectorAdapters.requests.start('Data', {
                  description: `This request queries VOZIQ BI to fetch the data for the search.`,
                });
                inspectorRequest.stats(getRequestInspectorStats($scope.searchSource));
                $scope.searchSource.getSearchRequestBody().then(body => {
                  inspectorRequest.json(body);
                });
              }
              $scope.searchSource.onResults()
                .then(resp => {
                  if (inspectorRequest) {
                    inspectorRequest
                      .stats(getResponseInspectorStats($scope.searchSource, resp))
                      .ok({ json: resp });
                  }
                  return resp;
                })
                .then(onResults)
                .catch(error => {
                //  notify.error(error);
                  startSearching();
                });
            }
            startSearching();
            courier.fetch();
          });*/
      $scope.pageOfItems = [];
      $scope.onPageNext = () => {
        $scope.pager.nextPage();
        calculateItemsOnPage();
      };

      $scope.onPagePrevious = () => {
        $scope.pager.previousPage();
        calculateItemsOnPage();
      };

      $scope.shouldShowLimitedResultsWarning = () =>
        !$scope.pager.hasNextPage && $scope.pager.totalItems < $scope.totalHitCount;

         const nonAlphaNumRE = /[^a-zA-Z0-9]/;
     const allDoubleQuoteRE = /"/g;
		var regxYYYY_MM_DD_T_HH_mm_ssZ = /^\d{4}([./-])\d{2}\1\d{2}T\d{2}([:])\d{2}([:])\d{2}Z$/;
		var regxInteger12Pls = /^(\d{12,})$/;
		
	$scope.exportAsCsv = function (formatted) {
		var iFields=$scope.indexPattern.fields;
		 $scope.columnsE=[];
		 $scope.rowsE=[];
		var m=0;var l=1;var exCl=[];
		if($scope.columns.length == 1 && $scope.columns[0]=='_source'){return;}
		$scope.hits.forEach(function (hit) {
			var rowE=[];
			
			if($scope.indexPattern.timeFieldName != undefined && 
					$scope.indexPattern.timeFieldName != null) { 
					if($scope.columns.indexOf($scope.indexPattern.timeFieldName) == -1){
					exCl.push($scope.indexPattern.timeFieldName);
					$scope.columns.forEach(function (fieldE1) { 
					exCl.push(fieldE1);
					});
					$scope.columns=exCl;
					}}
			
			$scope.columns.forEach(function (fieldE) { 
			if($scope.indexPattern.metaFields.indexOf(fieldE) > -1){
			//if(fieldE == '_id' || fieldE == '_index' || fieldE == '_score' || fieldE == '_source' || fieldE == '_type'){
				return;
			}
			
				if(m == 0){
				
					if($scope.$parent.vis){
				var agg=new AggConfig($scope.$parent.vis, {
					type: 'bucket',
					schema: 'bucket'
				});
				
				agg.id=l;
				agg.schema={};
				agg.schema.group= 'buckets';
				agg.params={ field: iFields.find(x => x.title === fieldE)};
				agg.isFilterable= function(){ return false};
				$scope.columnsE.push({'aggConfig':agg,'title':fieldE});
				l++;
					}else{ 
				var agg={};
				agg.id=l;
				agg.schema={};
				agg.schema.group= 'buckets';
				agg.params={ field: iFields.find(x => x.title === fieldE)};
				agg.isFilterable= function(){ return false};
						$scope.columnsE.push({'aggConfig':agg,'title':fieldE});
					l++;
					}					
			}
			
			
		var val=hit["_source"][$scope.columnsE.find(x => x.title === fieldE).title];
		//val=val.replace("<span ng-non-bindable>","").replace("</span>","");
		if (val == undefined || val == null) { 
					val = " --";
				}else{
				val=String(val);
					if(val.match(regxYYYY_MM_DD_T_HH_mm_ssZ)) {
					val = val.replace(",","");
					var d = new Date(val);
				//	var mth = d.getMonth()+1 < 10? "0"+(d.getMonth()+1) : d.getMonth()+1;
				//	var day = d.getDate() < 10? "0"+d.getDate() : d.getDate();
				//	var year = d.getFullYear()-2000;
				//	val = mth + '/' + day + '/' + year + ' ' + d.getHours() + ":" + d.getMinutes() + ':' + d.getSeconds();
				val=moment(val).format(config.get('dateFormat'));
				} else if(val.match(regxInteger12Pls)) {
					val = "'" + val;   //add a single quote in front of big numbers
				}				
				}
		rowE.push(new AggConfigResult($scope.columnsE.find(x => x.title === fieldE).aggConfig, 'bucket', val, val));	
			});
	$scope.rowsE.push(rowE);
			m++;
		});
		
		if(exCl.length > 0){
			$scope.columns.shift();
			exCl=[];			 
		}
		
		//console.dir($scope);
		const csv = new Blob([self.toCsv(formatted)], { type: 'text/plain;charset=utf-8' });
     self._saveAs(csv, self.csv.filename);
	};
	self.csv.filename =  'VOZIQInsightsSearchResult.csv';
	self.toCsv = function (formatted) {
       const rows = $scope.rowsE;
       const columns = $scope.columnsE;
     
       const nonAlphaNumRE = /[^a-zA-Z0-9]/;
       const allDoubleQuoteRE = /"/g;
       function escape(val) { 
      
         if (!formatted && _.isObject(val)) val = val.valueOf();
        
         val = String(val);
         if (self.csv.quoteValues && nonAlphaNumRE.test(val)) {
          
           val = '"' + val.replace(allDoubleQuoteRE, '""') + '"';
         }
           
         return val;
       }
       // escape each cell in each row
       const csvRows = rows.map(function (row) {
         return row.map(escape);
       });
        
       // add the columns to the rows
       csvRows.unshift(columns.map(function (col) {
         return escape(col.title);
       }));
       return csvRows.map(function (row) {
        
         return row.join(self.csv.separator) + '\r\n';
       }).join('');
     };   
    },
  };
}
