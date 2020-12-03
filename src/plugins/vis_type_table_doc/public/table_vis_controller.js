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
import { assign } from 'lodash';
import { getFormatService } from './services';
export function TableVisController($scope) {
  const uiStateSort = $scope.uiState ? $scope.uiState.get('vis.params.sort') : {};
  assign($scope.visParams.sort, uiStateSort);
	  const sel_columns = $scope.uiState ? $scope.uiState.get('vis.params.selectedColumns') : [];
	  assign($scope.vis.params.selectedColumns, sel_columns);
	  const exp_columns = $scope.uiState ? $scope.uiState.get('vis.params.selectedColumnsExp') : [];
	  assign($scope.vis.params.selectedColumnsExp, exp_columns);
  $scope.sort = $scope.visParams.sort;
  $scope.$watchCollection('sort', function (newSort) {
    $scope.uiState.set('vis.params.sort', newSort);
  });

  $scope.$watchCollection('vwList', function () {
		  console.dir("vwList");
		  makeOptions();
	  });
	  $scope.$watchCollection('expList', function () {
		 console.dir("expList");
		  makeOptions();
	  });
	  
	     if($scope.vis.params.selectedColumnsExp == undefined){
		  $scope.vis.params.selectedColumnsExp =[]; 
	  }
	  if($scope.vis.params.selectedColumns == undefined){
		  $scope.vis.params.selectedColumns =[]; 
	  }
  /**
   * Recreate the entire table when:
   * - the underlying data changes (esResponse)
   * - one of the view options changes (vis.params)
   */
       function setUpOptions () {
			var opts = $("#fieldsList" + ' option');
			var data1=$scope.vis.params.selectedColumns;
			var data2=$scope.vis.params.selectedColumnsExp;
			
			$("#viewList").find('option')
		    .remove()
		    .end();
			$("#exportList").find('option')
		    .remove()
		    .end();
				for(var i = 0; i < data1.length; i++) {
					for(var j = 0; j < opts.length; j++) {
					if (data1[i] === opts[j].value) {
						$("#viewList").append($(opts[j]).clone());
					}}
				}
				for(var k = 0; k < data2.length; k++) {
					for(var j = 0; j < opts.length; j++) {
					if (data2[k] === opts[j].value) {
						$("#exportList").append($(opts[j]).clone());
					}}
				}
		
		};
		setUpOptions();
   	    function makeOptions () {
			
			
			
			if($("#fieldsList" + ' option').length > 0){
				
				//$(".euiButton--fill").prop('disabled', true);
			var data1=$("#viewList" + ' option');
			var data2=$("#exportList" + ' option');
	
			$scope.vis.params.selectedColumnsExp =[];
			$scope.vis.params.selectedColumns =[];

				for(var i = 0; i < data1.length; i++) {
					$scope.vis.params.selectedColumns.push(data1[i].value);
				}
				for(var k = 0; k < data2.length; k++) {
					$scope.vis.params.selectedColumnsExp.push(data2[k].value);
				}
				 $('#viewList option').prop('selected', true);
				 $('#exportList option').prop('selected', true);
				
				 $scope.uiState.set('vis.params.selectedColumns', $scope.vis.params.selectedColumns);
				 $scope.uiState.set('vis.params.selectedColumnsExp', $scope.vis.params.selectedColumnsExp);  
				 
			}
			//console.dir($scope);
		};
				function isJSON(str) {
	    try {
	        return (JSON.parse(str) && !!str);
	    } catch (e) {
	        return false;
	    }
	};							 
 /* $scope.$watch('renderComplete', function () {
    let tableGroups = ($scope.tableGroups = null);
    let hasSomeRows = ($scope.hasSomeRows = null);

    if ($scope.esResponse) {
      tableGroups = $scope.esResponse;

      hasSomeRows = tableGroups.tables.some(function haveRows(table) {
        if (table.tables) return table.tables.some(haveRows);
        return table.rows.length > 0;
      });
    }

    $scope.hasSomeRows = hasSomeRows;
    if (hasSomeRows) {
      $scope.dimensions = $scope.visParams.dimensions;
      $scope.tableGroups = tableGroups;
    }
    $scope.renderComplete();
  });*/
  
  $scope.$watch('esResponse', function (resp) {

		  makeOptions();
	
	    let tableGroups = $scope.tableGroups = null;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
	    let hasSomeRows = $scope.hasSomeRows = null;

	    if (resp) {
	    	//$("#AutoApplyButton").attr("disabled", true);
	      tableGroups = resp;
		
	
			//$scope.tableData=[];
			$scope.columnsShow=[];
			$scope.columnsExport=[];
			$scope.isCustomExport=true;
			$scope.dataAvailable=false;
	
	
	
			var data=resp.tables[0].raw.raw.hits.hits;
			var columnsRaw=$scope.vis.params.selectedColumns;
			
			//var columnsRaw=$scope.visParams.selectedColumns;
		
			$scope.vis.indexPattern=resp.tables[0].raw.columns[0].aggConfig.aggConfigs.indexPattern;
		
			if($scope.vis.indexPattern.timeFieldName != undefined && 
							$scope.vis.indexPattern.timeFieldName != null) { 
							if(columnsRaw.indexOf($scope.vis.indexPattern.timeFieldName) > -1){
							}else{
								if(columnsRaw == undefined){
								columnsRaw=[];	
								}
							columnsRaw.unshift($scope.vis.indexPattern.timeFieldName);	
							}						
							}
			
			if(data.length > 0){
				$scope.dataAvailable=true;
			}
			var columns=[];
			var columnsE=[];
           // const formatter = ;
			var l=1;
			tableGroups.tables[0].columns=[];
			tableGroups.tables[0].columnsE=[];
			var iFields=$scope.vis.indexPattern.fields;
			var labelsRaw=$scope.vis.indexPattern.fieldLabelMap;
			var labels={};
			if(labelsRaw != undefined){
				labels=JSON.parse(labelsRaw);
			}
			for(var key of columnsRaw) {

				$scope.columnsShow.push(key);
				var formatId={'id':'string'};
				var fieldFormat=getFormatService().deserialize(formatId);
				
                var filterable=false;
				var field=iFields.find(x => x.name === key);				
				/*if(field != null && field != undefined){
					
					fieldFormat=field.format;
				}*/
				
				if(labels[key] != undefined && labels[key].length >0){
					
					tableGroups.tables[0].columns.push({'id':'col-'+l, 'name':labels[key], 'field': field,'title':labels[key], 'formatter': fieldFormat,'filterable':filterable});
				}else{
					
					tableGroups.tables[0].columns.push({'id':'col-'+l, 'name':key,'field': field,'title':key, 'formatter':fieldFormat,'filterable':filterable});
				}
				columns.push({'id':'col-'+l, 'name':key,'field': field, 'title':key, 'formatter': fieldFormat,'filterable':filterable});
				l++;
			
			}
			 var m=1;
			var columnsExpRaw=$scope.vis.params.selectedColumnsExp;
			//var columnsExpRaw=$scope.visParams.selectedColumnsExp;
			if($scope.vis.indexPattern.timeFieldName != undefined && 
							$scope.vis.indexPattern.timeFieldName != null) { 
							if(columnsExpRaw.indexOf($scope.vis.indexPattern.timeFieldName) > -1){
								}else{
									if(columnsExpRaw == undefined){
								columnsExpRaw=[];	
								}
							columnsExpRaw.unshift($scope.vis.indexPattern.timeFieldName);	
							}
							}
			for(var key of columnsExpRaw) {
				$scope.columnsExport.push(key);
				 var filterable=false;
				var formatId={'id':'string'};
				var fieldFormat=getFormatService().deserialize(formatId);
				var field=iFields.find(x => x.name === key);				
				if(field != null && field != undefined){
					fieldFormat=field.format;
				}
				
				if(labels[key] != undefined && labels[key].length >0){
					tableGroups.tables[0].columnsE.push({'id':'col-'+m, 'name':labels[key],'field': field,'title':labels[key], 'formatter': fieldFormat,'filterable':filterable});
				}else{
					tableGroups.tables[0].columnsE.push({'id':'col-'+m, 'name':key,'field': field,'title':key, 'formatter': fieldFormat,'filterable':filterable});
				}
				columnsE.push({'id':'col-'+m, 'name':key,'field': field,'title':key, 'formatter': fieldFormat,'filterable':filterable});
				m++;
			
			}
			
			tableGroups.tables[0].rows=[];
			tableGroups.tables[0].rowsE=[];


			for (var i = 0, len = data.length; i < len; i++) {
				var row={};
				var rowE={};
				for(var j=0; j < columns.length; j++){
				var value={};
				var doc=data[i]["_source"];
			
				if(labels != undefined && Object.keys(labels).length >0){
					 for(var k in labels){
						doc[labels[k]]=doc[k];
						}

				}

				value.hit={}
				value.hit.highlight=data[i].highlight;
				if(isJSON($scope.vis.params.jsonInput) && JSON.parse($scope.vis.params.jsonInput).hasOwnProperty(columns[j].title)){ 
					try {
					value.value=eval(JSON.parse($scope.vis.params.jsonInput)[columns[j].title]);
					} catch (e) {
						console.dir(e);
					}
					

				}else{
				value.value=data[i]["_source"][columns[j].title];
				}
				if(columns[j].title.includes(".split")){
					try{
						value.value=(data[i]["_source"][columns[j].title]).join();	
					}catch(e){
					}
				}
				//row.push(new AggConfigResult(columns[j].field, 'bucket',value ,data[i]["_source"][columns[j].title]));
				if(value.hit.highlight){
					var hilight=value.hit.highlight[columns[j].field.name]
					if(hilight != undefined){	
						var valHR=hilight[0];
						var valH=valHR.replace(new RegExp("@kibana-highlighted-field@", 'g'), "").replace(new RegExp("@/kibana-highlighted-field@", 'g'), "");
					    row[columns[j].id] =value.value.split(valH).join(hilight[0].replace(new RegExp("@kibana-highlighted-field@", 'g'), "<mark>").replace(new RegExp("@/kibana-highlighted-field@", 'g'), "</mark>"));					
					}else{
						row[columns[j].id]=value.value;	
					}
					
				}else{				
				row[columns[j].id]=value.value;	
				}
				//row[columns[j].id]=value.value;				
				}
			for(var k=0; k < columnsE.length; k++){
				//$scope.tableData.push(data[i]["_source"]);
				var valueE={};
				var doc=data[i]["_source"];
				if(labels != undefined && Object.keys(labels).length >0){
					 for(var ka in labels){
						doc[labels[ka]]=doc[ka];
						}

				}
				if(isJSON($scope.vis.params.jsonInput) && JSON.parse($scope.vis.params.jsonInput).hasOwnProperty(columns[k].title)){ 
					try{
					valueE=eval(JSON.parse($scope.vis.params.jsonInput)[columns[k].title]);
				} catch (e) {
						console.dir(e);
					}
				}else{
				 valueE=data[i]["_source"][columnsE[k].title];
				}
				if(columnsE[k].title.includes(".split")){
					try{
						valueE=(data[i]["_source"][columnsE[k].title]).join();	
					}catch(e){
					}
				}
				//rowE.push(new AggConfigResult(columnsE[k].field, 'bucket', valueE, valueE));
				rowE[columnsE[k].id]=valueE;	
			}
			tableGroups.tables[0].rows.push(row);
			tableGroups.tables[0].rowsE.push(rowE);
			}
			//console.dir($scope);
			tableGroups.tables[0].query=resp.tables[0].raw.qry;		
			if(columnsE.length >0){
				tableGroups.tables[0].isCustomExport=true;
				tableGroups.tables[0].indexName=$scope.vis.indexPattern.title;
				
			}
			//$scope.uiState.set('vis.params.time', new Date().getTime());
		
			
	      hasSomeRows = tableGroups.tables.some(function haveRows(table) {
			 
	        if (table.tables) return table.tables.some(haveRows);
	        return table.rows.length > 0;
	      });
		 
	      
	    }
	
	    $scope.vis.showSpyPanel=false;
		
		

	    $scope.hasSomeRows = hasSomeRows;
		hasSomeRows=true;
	    if (hasSomeRows) {
	       $scope.dimensions = $scope.visParams.dimensions;
	      $scope.tableGroups = tableGroups;
	    }
	    $scope.renderComplete();
		
	    $scope.vis.dirty=true;
		
	  });0
}
