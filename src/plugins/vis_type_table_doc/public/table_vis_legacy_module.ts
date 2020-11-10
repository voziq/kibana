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

import { IModule } from 'angular';

// @ts-ignore
import { TableVisController } from './table_vis_controller.js';
// @ts-ignore
import { KbnAggTable } from './agg_table/agg_table';
// @ts-ignore
import { KbnAggTableGroup } from './agg_table/agg_table_group';
// @ts-ignore
import { KbnRows } from './paginated_table/rows';
// @ts-ignore
import { PaginatedTable } from './paginated_table/paginated_table';

import tableVisParamsTemplateDoc from './table_vis_params_doc.html';

/** @internal */
export const initTableVisLegacyModule = (angularIns: IModule): void => {
  angularIns
    .controller('KbnTableVisController', TableVisController)
    .directive('kbnAggTable', KbnAggTable)
    .directive('kbnAggTableGroup', KbnAggTableGroup)
    .directive('kbnRows', KbnRows)
    .directive('paginatedTable', PaginatedTable)
	.directive('tableVisParamsDoc', function () {
    return {
      restrict: 'E',
      template: tableVisParamsTemplateDoc,
      link: function ($scope) {
		  
		$scope.fieldsList=[];
		$scope.jsonField=false;
		
		
		var labels=$scope.vis.indexPattern.fieldLabelMap;
			for(var obj of $scope.vis.indexPattern.fields){
				if(labels != undefined && JSON.parse(labels)[obj.name] !=undefined && JSON.parse(labels)[obj.name].length > 0){
					$scope.fieldsList.push({name:obj.name,xname : JSON.parse(labels)[obj.name]});
				}else{
					$scope.fieldsList.push({name:obj.name,xname:obj.name});
				}
			}
			moveToFields();
	   $scope.addToFields=function(){
		   $scope.vis.params.jsonInput=$("#visEditorRawJson2").val();
	 	 moveToFields();
	   }
	    $scope.addToView=function(){
			alert("1");
	 	  moveToList('#fieldsList', '#viewList',true);
	   }
	   $scope.addToExport=function(){
		   alert("2");
	 	  moveToList('#fieldsList', '#exportList',false);
	   }
	   $scope.moveUpView=function(){
		 	  moveUp('#viewList');
		   }
	   $scope.moveDownView=function(){
		   moveDown('#viewList');
		   }
	   $scope.removeView=function(){
		   removeOpt('#viewList');
		   }
	   $scope.moveUpExport=function(){
		   moveUp('#exportList');
		   }
	   $scope.moveDownExport=function(){
		   moveDown('#exportList');
		   }
	   $scope.removeExport=function(){
		   removeOpt('#exportList');
		   }
	   $scope.jsonEnable=function(){		
		   if($scope.jsonField)   		
		   {
		   $('#jsonLabel').addClass("ng-hide"); 		
		   $('#jsonText').addClass("ng-hide");		   		
		   $('#jsonButton').addClass("ng-hide");			   		
		   $scope.jsonField=false;		   		
		   }else{ 		   		
		   $('#jsonLabel').removeClass("ng-hide");		   		
		   $('#jsonText').removeClass("ng-hide");		   		
		   $('#jsonButton').removeClass("ng-hide");		   			
		   $scope.jsonField=true;
		   		}		 
		   		  
		    }
			
			
		function moveToFields(){
			
			
			
			var data=$scope.fieldsList1;
			try{
				if($scope.vis.params.jsonInput!=""&&$scope.vis.params.jsonInput!=undefined)
				{
			var jsonOut=Object.keys(JSON.parse($scope.vis.params.jsonInput));
			for (var s of jsonOut){
			var found=false;
	 			for(var i = 0; i < data.length; i++) {
	 				if (data[i].name === s) {
	 					found=true;
					 }}
					 if(!found){
				$scope.fieldsList.push({name:s,xname:s});	
					 }
			}
				}
		  }catch(w){console.dir(w)}
		}   
	   function moveUp(list){
		   $("#AutoApplyButton").removeAttr("disabled");
			var opts = $(list + ' option:selected');
			if (opts.length == 0) {
				console.dir("Nothing to move");
			}

			opts.first().prev().before(opts);
			makeOptionsP(); 
	   }
	   function moveDown(list){
		   $("#AutoApplyButton").removeAttr("disabled");
			var opts = $(list + ' option:selected');
			if (opts.length == 0) {
				console.dir("Nothing to move");
			}
			opts.last().next().after(opts);
			makeOptionsP();
	   }
	   
	   function removeOpt(list){
		   $("#AutoApplyButton").removeAttr("disabled");
		   var opts = $(list + ' option:selected');
			if (opts.length == 0) {
				console.dir("Nothing to remove");
			}
			// $('#viewList option').prop('selected', true);
			// $('#exportList option').prop('selected', true)
			 
			$(opts).remove();
			 makeOptionsP();
		   }
	    function makeOptionsP () {
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
				 //$('#viewList option').prop('selected', true);
				 //$('#exportList option').prop('selected', true);
				
				// $scope.uiState.set('vis.params.selectedColumns', $scope.vis.params.selectedColumns);
				// $scope.uiState.set('vis.params.selectedColumnsExp', $scope.vis.params.selectedColumnsExp);  
				 
			
			//console.dir($scope);
		};
	     function moveToList (sourceList, destinationList, isView) {
	    	 $("#AutoApplyButton").removeAttr("disabled");
				
	 		var opts = $(sourceList + ' option:selected');
	 		if (opts.length == 0) {
	 			console.dir("Nothing to move");
	 		}
	 		var data=$(destinationList + ' option');
	 		var opt=[];for(var j = 0; j < opts.length; j++) {
	 			var found=false;
	 			for(var i = 0; i < data.length; i++) {
	 				if (data[i].value === opts[j].value) {
	 					found=true;
	 				}
	 			}
	 			if(!found){
	 				if(isView){$scope.vis.params.selectedColumns.push(opts[j].value)}else{$scope.vis.params.selectedColumnsExp.push(opts[j].value)}
	 				$(destinationList).append($(opts[j]).clone());
	 			}}  
	 		//$('#viewList option').prop('selected', 'selected');
			//$('#exportList option').prop('selected', 'selected');
	 		       
	 	};
      }
    };
  });
	
};
