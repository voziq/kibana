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

import { get } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { EuiIconTip, EuiPanel, EuiButton, EuiSpacer } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n/react';

import { VisOptionsProps } from 'src/plugins/vis_default_editor/public';
import { search } from '../../../data/public';
import { SwitchOption, SelectOption, NumberInputOption } from '../../../charts/public';
import { TableVisParams } from '../types';
import { totalAggregations } from './utils';

const { tabifyGetColumns } = search;

function TableOptions({
  aggs,
  vis,  
  uiState,
  stateParams,
  setValidity,
  setValue,
}: VisOptionsProps<TableVisParams>) {


var fieldsList=[];

$(document).ready(function(){

$("button[data-test-subj='visualizeEditorRenderButton']").click(function(){		
		uiState._events.reload();		
})
			
		var jsonField=false;
		var labels=aggs.indexPattern.fieldLabelMap;
			for(var obj of aggs.indexPattern.fields){
				if(labels != undefined && JSON.parse(labels)[obj.name] !=undefined && JSON.parse(labels)[obj.name].length > 0){
					fieldsList.push({name:obj.name,xname : JSON.parse(labels)[obj.name]});
				}else{
					fieldsList.push({name:obj.name,xname:obj.name});
				}
			}
		

			moveToFields();			
			
			$('#btnAvenger11').click(function(e) {
				
		  vis.params.jsonInput=$("#visEditorRawJson2").val();
	 	 moveToFields();
	});
			   
	   		$('#btnAvenger1').click(function(e) {
				
				
		 moveToList('#fieldsList', '#viewList',true);
	});
	    
	   
	      		$('#btnShield1').click(function(e) {
					
		 moveToList('#fieldsList', '#exportList',false);
	});
	    
	   
	         		$('#btnViewUp1').click(function(e) {

						
		 moveUp('#viewList');
	});
	   
	     
		   
		            		$('#btnViewDown1').click(function(e) {
								
		  moveDown('#viewList');
	});
		   
	      
		   
		 $('#btnRemoveView1').click(function(e) {
			
		  removeOpt('#viewList');
	});
		   
	   
		   
		   $('#btnExportUp1').click(function(e) {
			  
		  moveUp('#exportList');
	});
	   
		   	   $('#btnExportDown1').click(function(e) {
				  
		  moveDown('#exportList');
	});
	   
		    $('#btnRemoveExport1').click(function(e) {
				
		 removeOpt('#exportList');
	});
	   
		   	    $('#jsonId').click(function(e) {
					
		    if(jsonField)   		
		   {
		   $('#jsonLabel').addClass("ng-hide"); 		
		   $('#jsonText').addClass("ng-hide");		   		
		   $('#jsonButton').addClass("ng-hide");			   		
		   jsonField=false;		   		
		   }else{ 		   		
		   $('#jsonLabel').removeClass("ng-hide");		   		
		   $('#jsonText').removeClass("ng-hide");		   		
		   $('#jsonButton').removeClass("ng-hide");		   			
		   jsonField=true;
		   		}
	});
	   				
			
			
		function moveToFields(){
			
			var data=fieldsList;
			try{
				if(vis.params.jsonInput!=""&&vis.params.jsonInput!=undefined)
				{
			var jsonOut=Object.keys(JSON.parse(vis.params.jsonInput));
			for (var s of jsonOut){
			var found=false;
	 			for(var i = 0; i < data.length; i++) {
	 				if (data[i].name === s) {
	 					found=true;
					 }}
					 if(!found){
				fieldsList.push({name:s,xname:s});	
					 }
			}
				}
		  }catch(w){console.dir(w)}
		}   
	   function moveUp(list){
		  $("button[data-test-subj='visualizeEditorRenderButton']").removeAttr("disabled");
			var opts = $(list + ' option:selected');
			if (opts.length == 0) {
				console.dir("Nothing to move");
			}

			opts.first().prev().before(opts);
			makeOptionsP(); 
	   }
	   function moveDown(list){
		  $("button[data-test-subj='visualizeEditorRenderButton']").removeAttr("disabled");
			var opts = $(list + ' option:selected');
			if (opts.length == 0) {
				console.dir("Nothing to move");
			}
			opts.last().next().after(opts);
			makeOptionsP();
	   }
	   
	   function removeOpt(list){
		   $("button[data-test-subj='visualizeEditorRenderButton']").removeAttr("disabled");
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

			vis.params.selectedColumnsExp =[];
			vis.params.selectedColumns =[];
			
				for(var i = 0; i < data1.length; i++) {
					vis.params.selectedColumns.push(data1[i].value);
				}
				for(var k = 0; k < data2.length; k++) {
					vis.params.selectedColumnsExp.push(data2[k].value);
				}
				 //$('#viewList option').prop('selected', true);
				 //$('#exportList option').prop('selected', true);
				
				// $scope.uiState.set('vis.params.selectedColumns', $scope.vis.params.selectedColumns);
				// $scope.uiState.set('vis.params.selectedColumnsExp', $scope.vis.params.selectedColumnsExp);  
				 
			
			//console.dir($scope);
		};
	     function moveToList (sourceList, destinationList, isView) {
			//alert("test");
	    	 $("button[data-test-subj='visualizeEditorRenderButton']").removeAttr("disabled");
				
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
	 				if(isView){
						//vis.test=true;
						vis.params.selectedColumns.push(opts[j].value)
						stateParams.selectedColumns.push(opts[j].value)
						}else{
							vis.params.selectedColumnsExp.push(opts[j].value)
							stateParams.selectedColumnsExp.push(opts[j].value)
							}
					
	 				$(destinationList).append($(opts[j]).clone());
	 			}}  
	 		//$('#viewList option').prop('selected', 'selected');
			//$('#exportList option').prop('selected', 'selected');
	 		       
	 	};
	
	var optionsAsString = "";
	var arr=[];
for(var i = 0; i < fieldsList.length; i++) {
	if(fieldsList[i].xname !== "_source" &&  fieldsList[i].xname !== "_id" &&  fieldsList[i].xname !== "_index" &&  fieldsList[i].xname !== "_score" &&  fieldsList[i].xname !== "_type"){
	arr=fieldsList[i];
    optionsAsString += "<option value='" + fieldsList[i].name + "'>" + fieldsList[i].xname + "</option>";
	}
}
$('select[id="fieldsList"]')
    .find('option')
    .remove();
$( 'select[id="fieldsList"]' ).append( optionsAsString );



});




  return (
    <EuiPanel paddingSize="s" id="fieldsList1">


   <EuiSpacer size="s" />		  
			  
			  
			  <div className="form-group">

			<a ng-click='jsonEnable()' id="jsonId">
    <i aria-hidden="true" className="fa fa-caret-down fa-caret-left" ng-class="{'fa-caret-down': advancedToggled, 'fa-caret-left': !advancedToggled}"></i>
    <span i18n-id="common.ui.vis.editors.advancedToggle.advancedLinkLabel" i18n-default-message="Computed Fields">Computed Fields</span>
  </a>
</div>

				<label id="jsonLabel" className="kuiSideBarFormRow__label ng-hide" >
			JSON Input</label>
		<div className="kuiSideBarFormRow ng-hide" id="jsonText">

			<div className="kuiSideBarFormRow__control">
				<textarea type="text" id="visEditorRawJson2" className="form-control ng-pristine ng-valid ng-empty ng-valid-json-input ng-touched"  validate-json="" aria-invalid="false"  ng-model="editorState.params.jsonInput"></textarea>
			</div>
			 <br></br>
		</div>
		 
<div className="kuiSideBarFormRow ng-hide" id="jsonButton">
			<div className="col-md-12">
				<input type="button" id="btnAvenger11" ng-click='addToFields()'
					value="Add to Fields" className="btn btn-default" /> 
			</div>
			 <br></br>
		</div>
		
	
		
		
			<label className="kuiSideBarFormRow__label" >
			Available Fields </label>
		<div className="kuiSideBarFormRow">

<select multiple className="form-control" id="fieldsList">
					
				</select>
			
		</div>
 <br></br> 
		<div className="kuiSideBarFormRow">
			<div className="col-md-12">
				<input type="button" id="btnAvenger1" 
					value="Add to View" className="btn btn-default" /> <input
					type="button" id="btnShield1" ng-click='addToExport()'
					value="Add to Export" className="btn btn-default" />
			</div>
		</div>

			  
			   <br></br> <br></br> <br></br> <br></br>
			  <label className="kuiSideBarFormRow__label" >
			View Fields </label>
		<div className="kuiSideBarFormRow">
			
						<div className="selected-left">
							<select multiple className="form-control" 
								id="viewList">
							</select>
						</div>
					
						<div className="selected-right" >
							<button type="button" className="btn btn-default btn-sm"
								 id="btnViewUp1">
								<span className="fa fa-chevron-up"></span>
							</button>
							<button type="button" className="btn btn-default btn-sm"
								 id="btnViewDown1">
								<span className="fa fa-chevron-down"></span>
							</button>
							<button type="button" className="btn btn-default btn-sm"
								 id="btnRemoveView1">
								<span className="fa fa-remove"></span>
							</button>
						</div>
		

		</div>
			  <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
			  
			  <label className="kuiSideBarFormRow__label" >
			Export Fields </label>
		<div className="kuiSideBarFormRow">
			
						<div className="selected-left">
							<select multiple className="form-control" 
								id="exportList">
							</select>
						</div>
					
					
						<div className="selected-right" >
							<button type="button" className="btn btn-default btn-sm"
								ng-click='moveUpExport()' id="btnExportUp1">
								<span className="fa fa-chevron-up"></span>
							</button>
							<button type="button" className="btn btn-default btn-sm"
								ng-click='moveDownExport()' id="btnExportDown1">
								<span className="fa fa-chevron-down"></span>
							</button>
							<button type="button" className="btn btn-default btn-sm"
								ng-click='removeExport()' id="btnRemoveExport1">
								<span className="fa fa-remove"></span>
							</button>
						</div>
			
		</div>
		<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
	

 
	

    </EuiPanel>	
  );
}


// default export required for React.Lazy
// eslint-disable-next-line import/no-default-export
export { TableOptions as default};
