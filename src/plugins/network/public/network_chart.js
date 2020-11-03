import d3 from 'd3';
import _ from 'lodash';
import $ from 'jquery';
import { ContainerTooSmall } from '../../vis_type_vislib/public/vislib/errors';
import { Chart } from '../../vis_type_vislib/public/vislib/visualizations/_chart';
//import { getFilterGenerator } from 'ui/filter_manager';
import { esFilters } from '../../data/public';

/*export function VislibVisualizationsNetworkProvider(Private, $rootScope) {

	const Chart = Private(VislibVisualizationsChartProvider);
	const filterManager = Private(FilterManagerProvider);*/
  
	//node moules
	
		
	/**
	 * Network Chart Visualization
	 *
	 * @class NetworkChart
	 * @constructor
	 * @extends Chart
	 * @param handler {Object} Reference to the Handler Class Constructor
	 * @param el {HTMLElement} HTML element to which the chart will be appended
	 * @param chartData {Object} Elasticsearch query results for this specific chart
	 */
	 
		const visN = require('../../../legacy/ui/public/network_node_modules/vis');
		const randomColor = require('../../../legacy/ui/public/network_node_modules/randomcolor');
		const ElementQueries = require('../../../legacy/ui/public/network_node_modules/css-element-queries/src/ElementQueries');
		const ResizeSensor = require('../../../legacy/ui/public/network_node_modules/css-element-queries/src/ResizeSensor');
		
	  export class NetworkChart extends Chart {		
		constructor(handler, chartEl, chartData, deps) {
            super(handler, chartEl, chartData, deps);
            var charts = this.handler.data.getVisData();
            $(this).html("");
        }
		
		addPathEvents(element) {
			var events = this.events;

			return element
			.call(events.addHoverEvent())
			.call(events.addMouseoutEvent())
			.call(events.addClickEvent());
		};
		_validateContainerSize(width, height) {
			var minWidth = 200;
			var minHeight = 200;

			if (width <= minWidth || height <= minHeight) {
				throw new ContainerTooSmall();
			}
		};
		
		/**
		 * Renders d3 visualization
		 *
		 * @method draw
		 * @returns {Function} Creates the pie chart
		 */
		 
		 
		 
	errorNodeColor = function(){
      /*$("#" + network_id).hide();
      $("#" + loading_id).hide();*/      
      $(this).hide();
      $("#loading").hide();	
	  this.chartEl.outerHTML='<div class="chart"><div id="errorHtml"><h1><strong>ERROR</strong>: Node Color must be the LAST selection</h1></div></div>';	  
      $(this).find("#errorHtml").html("<h1><strong>ERROR</strong>: Node Color must be the LAST selection</h1>");
      $(this).find("#errorHtml").show();
    }

    errorNodeNodeRelation = function(){
      $(this).hide();
      $("#loading").hide();	  
	  this.chartEl.outerHTML='<div class="chart"><div id="errorHtml"><h1><strong>ERROR</strong>: You can only choose Node-Node or Node-Relation</h1></div></div>';	  
      //$(this).find("#errorHtml").html("<h1><strong>ERROR</strong>: You can only choose Node-Node or Node-Relation</h1>");
      $(this).find("#errorHtml").show();
    }

    initialShows = function(){
      $(this).show();
      $("#loading").show();
	  //this.chartEl.outerHTML='<div class="chart"><div id="loading" ng-style="{"background-color":vis.params.canvasBackgroundColor}"><div class="loading_msg"><p><strong>Loading network...</strong><i class="fa fa-clock-o" aria-hidden="true"></i></p></div></div></div>';
      $(this).find("#errorHtml").hide();
    }

    startDynamicResize = function(network){
        new ResizeSensor($("#net"), function() {
            network.setSize('100%', '100%');
        });
    }

    drawColorLegend = function(usedColors, colorDicc){
        var canvas = document.getElementsByTagName("canvas")[0];
        var context = canvas.getContext("2d");

        context.fillStyle="#FFE8D6";
        var totalheight = usedColors.length * 25
        context.fillRect(canvas.width*(-2)-10, canvas.height*(-2)-18, 350, totalheight);

        context.fillStyle = "black";
        context.font = "bold 30px Arial";
        context.textAlign = "start";
        context.fillText("LEGEND OF COLORS:", canvas.width*(-2), canvas.height*(-2));

        var p=canvas.height*(-2) + 40;
        for(var key in colorDicc){
            context.fillStyle = colorDicc[key];
            context.font = "bold 20px Arial";
            context.fillText(key, canvas.width*(-2), p);
            p = p +22;
        }
    }
	
    titleCase = function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
		draw() {
			try{
			const self = this;			
			//randomColor=this.handler.data.getColorFunc();
			var visS = self.handler.visConfig._values;
			var color = this.handler.data.getColorFunc();			
			var tooltip = this.tooltip;			
			var toolHeading = "";
			var metricLabel="";
            var secNodeObj = {};
            var firstNodeObj = {};
            //const filterGen = getFilterGenerator(this.chartData.queryFilter);            
            var filter=this.chartData.filterManager;
			
			return function (selection) {
				selection.each(function (data) {                    									
					var data1=data;
					//console.dir(data);
									/*if($rootScope.$$childTail.$$prevSibling.vis != undefined)
                                                {
                                                                visS = $rootScope.$$childTail.$$prevSibling.vis;
                                                }else{
                                                                visS = $rootScope.$$childTail.vis;
                                                }*/					
                    var vis=data.table_data.custom_columns[0].aggConfig.aggConfigs;                    
					var searchQuery = data.table_data.raw.qry.query.bool;
					
					if(data1.series_data[0].length > 1)
					{
					$.each(data1.series_data,function(key,value){                        				
						if(secNodeObj[value[1]] != undefined){
						secNodeObj[value[1]]=secNodeObj[value[1]]+value[2];
						}
						else
						{
							secNodeObj[value[1]]=value[2];
                        }
                        
                        if(firstNodeObj[value[0]] != undefined){
						firstNodeObj[value[0]]=firstNodeObj[value[0]]+value[2];
						}
						else
						{
							firstNodeObj[value[0]]=value[2];
                        }
					});					
					}                    
					if (data.series_data) {
                        var colors=self.handler.data.getColorFunc();                        		
            $("#loading").hide();
			var divTag = d3.select(this).append("div").attr("id", "errorHtml");
			
			self._validateContainerSize($(this).width(), $(this).height());			
			this.style.backgroundColor=visS.canvasBackgroundColor;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////NODE-NODE Type///////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
           
			 if(vis.bySchemaName('first').length != 0){
			if(vis.bySchemaName('first').length >= 1 && vis.bySchemaName('second').length == 0){
                self.initialShows();
                $(".secondNode").show();
                // Retrieve the id of the configured tags aggregation
                var firstFieldAggId = vis.bySchemaName('first')[0].id;
                if(vis.bySchemaName('first').length > 1){
                    var secondFieldAggId = vis.bySchemaName('first')[1].id;
                }

                if(vis.bySchemaName('colornode').length != 0){
                    var colorNodeAggId = vis.bySchemaName('colornode')[0].id;
                    var colorNodeAggName = vis.bySchemaName('colornode')[0].params.field.displayName;
                    var colorDicc = {};
                    var usedColors = [];
                }

                //Names of the terms that have been selected
                var firstFieldAggName = vis.bySchemaName('first')[0].params.field.displayName;
                if(vis.bySchemaName('first').length > 1){
                    var secondFieldAggName = vis.bySchemaName('first')[1].params.field.displayName;
                }

                // Retrieve the metrics aggregation configured
                if(vis.bySchemaName('size_node')){
                    var metricsAgg_sizeNode = vis.bySchemaName('size_node')[0];
                }
                if(vis.bySchemaName('size_edge')){
                    var metricsAgg_sizeEdge = vis.bySchemaName('size_edge')[0];
                }

                // Get the buckets of that aggregation
                var buckets = data.series_data;

///////////////////////////////////////////////////////////////DATA PARSED AND BUILDING NODES///////////////////////////////////////////////////////////////
                var dataParsed = [];
                // Iterate the buckets
                var i = 0;
                var id_second = 2;
                var id_colornode = 4;
                var dataNodes = buckets.map(function(bucket) {

                  var result = $.grep(dataParsed, function(e){ return e.keyFirstNode == bucket[0]; });
                  if (result.length == 0) {
                    dataParsed[i] = {};

                    dataParsed[i].keyFirstNode = bucket[0];

                    //Metrics are for the sizes
                    if(metricsAgg_sizeNode){
                        // Use the getValue function of the aggregation to get the value of a bucket
                        var value = bucket[1]//metricsAgg_sizeNode.getValue(bucket);
                        var sizeVal = Math.min(visS.maxCutMetricSizeNode, value);

                        //No show nodes under the value
                        if(visS.minCutMetricSizeNode > value){
                            dataParsed.splice(i, 1);
                            return;
                        }
                    }else{
                        var sizeVal = 20;
                    }

                    dataParsed[i].valorSizeNode = sizeVal;
                    dataParsed[i].nodeColorValue = "default";
                    dataParsed[i].nodeColorKey = "default";
                    if(!dataParsed[i].relationWithSecondNode){
                      dataParsed[i].relationWithSecondNode = [];
                    }


                    //Iterate rows and choose the edge size
                    if(vis.bySchemaName('first').length > 1){
                        if(metricsAgg_sizeEdge){
                            id_second = 1;
                            id_colornode = 3;
                            //If both selected
                            if(metricsAgg_sizeNode){
                              id_second = 1;
                              id_colornode = 3;
                            }
                            var value_sizeEdge = bucket[id_second+2];
                            var sizeEdgeVal = Math.min(visS.maxCutMetricSizeEdge, value_sizeEdge);
                        }else{
                            id_second = 1;
                            id_colornode = 3;
                            var sizeEdgeVal = 0.1;
                        }

                        if(colorNodeAggId){
                            if(colorDicc[bucket[id_colornode]]){
                                dataParsed[i].nodeColorKey = bucket[id_colornode];
                                dataParsed[i].nodeColorValue = colorDicc[bucket[id_colornode]];
                            }else{
                                //repeat to find a NO-REPEATED color
                                while(true){
                                    var confirmColor = randomColor();									
                                    if(usedColors.indexOf(confirmColor) == -1){
                                        colorDicc[bucket[id_colornode]] = confirmColor;
                                        dataParsed[i].nodeColorKey = bucket[id_colornode];
                                        dataParsed[i].nodeColorValue = colorDicc[bucket[id_colornode]];
                                        usedColors.push(confirmColor);
                                        break;
                                    }
                                }

                            }
                        }

                        var relation = {
                          keySecondNode: bucket[id_second],
                          countMetric: bucket[2],
                          widthOfEdge: sizeEdgeVal
                        }
                        dataParsed[i].relationWithSecondNode.push(relation)
                    }
					
                    if (('customLabel' in vis.bySchemaName("first")[0].params) && vis.bySchemaName("first")[0].params.customLabel != "") {
						toolHeading=vis.bySchemaName("first")[0].params.customLabel;						
						}else{ 
						toolHeading=vis.bySchemaName("first")[0].params.field.displayName;						
						}
                    if ((vis.bySchemaName("size_node")[0].params.customLabel == "") || (vis.bySchemaName("size_node")[0].params.customLabel == undefined)) {
                    	(vis.bySchemaName("size_node")[0].params.field == undefined) ? metricLabel = self.titleCase(vis.bySchemaName("size_node")[0].type.title):metricLabel = self.titleCase(vis.bySchemaName("size_node")[0].__type.title + " " + vis.bySchemaName("size_node")[0].params.field.displayName);
                    	} else {
                    	metricLabel = vis.bySchemaName("size_node")[0].params.customLabel;
                    	}
                    var inPopup ='<div style="padding:5px;"><span style="margin:5px;"><b>'+ toolHeading +'</b></span><span style="padding:5px;"><b>' +bucket[0] +'</b></span></div>';
                    inPopup=inPopup + '<br/><div style="padding:5px;"><span style="margin:5px;"><b>' + metricLabel + '</b></span><span style="padding:5px;"><b>' + firstNodeObj[bucket[0]] + "</b></span></div>";
                    //var inPopup ='<table  border="1" ><tbody ng-repeat="detail in details"><tr><th><b>' + vis.bySchemaName('first'][0].params.field.displayName +':&nbsp;</b></th><td>' +bucket[0] +'</td></tr>';
                    //assigning color and the content of the popup					
                    //var inPopup = "<p>" + bucket[0] + "</p>"
                    if(dataParsed[i].nodeColorValue != "default"){						
                        var colorNodeFinal = dataParsed[i].nodeColorValue;
						inPopup +='<tr><th><b>'+vis.bySchemaName('colornode')[0].params.field.displayName+':&nbsp;</b></th><td>'+dataParsed[i].nodeColorKey+'</td></tr></tbody></table>';
                        //inPopup += "<p>" + dataParsed[i].nodeColorKey + "</p>";
                    }else{
                        var colorNodeFinal = visS.firstNodeColor;
                    }

                    i++;
                    //Return the node totally built                    
                    var nodeReturn = {
                        id: i,
                        key: bucket[0],
                        color: colors(bucket[0].toString()),
                        shape: visS.shapeFirstNode,
                        //size: 300,
                        value: Math.log(firstNodeObj[bucket[0]]),
                        field: vis.bySchemaName("first")[0].params.field,
                        font : {
                          color: visS.labelColor,
                          size: visS.fontSize,
						  face : '"Open Sans", Helvetica, Arial, sans-serif'
                        }
                    }

                    //If activated, show the labels
                    if(visS.showLabels){
                        nodeReturn.label = bucket[0];
                    }

                    //If activated, show the popups
                    if(visS.showPopup){
                        nodeReturn.title = inPopup;						
                    }
					
					//console.dir("node1");
					//	console.dir(nodeReturn);
                    return nodeReturn;


                  } else if (result.length == 1) {
                	  //console.dir("node2");
                    //Repetido el nodo, solo añadimos sus relaciones
                      var dataParsed_node_exist = result[0]
                      //Iterate rows and choose the edge size
                      if(vis.bySchemaName('first').length > 1){
                          id_second = 1;
                          id_colornode = 3;
                          if(metricsAgg_sizeEdge){
                              if(metricsAgg_sizeNode){
                                id_second = 1;
                                id_colornode = 3;
                              }
                              var value_sizeEdge = bucket[id_second+2];
                              var sizeEdgeVal = Math.min(visS.maxCutMetricSizeEdge, value_sizeEdge);
                          }else{
                              var sizeEdgeVal = 0.1;
                          }

                          var relation = {
                            keySecondNode: bucket[id_second],
                            countMetric: bucket[2],
                            widthOfEdge: sizeEdgeVal
                          }
                          dataParsed_node_exist.relationWithSecondNode.push(relation)
                      }
                      return undefined
                  }



                });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////BUILDING EDGES///////////////////////////////////////////////////////////////////////
                //Clean "undefined" in the array
                dataNodes = dataNodes.filter(Boolean);
                var dataEdges = [];
                //console.dir(dataParsed);
                for(var n = 0; n<dataParsed.length; n++){
                    //Find in the array the node with the keyFirstNode
                    var result = $.grep(dataNodes, function(e){ return e.key == dataParsed[n].keyFirstNode; });
                    if (result.length == 0) {
                        //console.log("Error: Node not found");
                    } else if (result.length == 1) {
                        //Found the node, access to its id
                        if(vis.bySchemaName('first').length > 1){
                            for(var r = 0; r<dataParsed[n].relationWithSecondNode.length; r++){
                            	
                            	//tooltip start
                            	if ("customLabel" in vis.bySchemaName("first")[1].params && vis.bySchemaName("first")[1].params.customLabel != "") {
                                    toolHeading = vis.bySchemaName("first")[1].params.customLabel
                                } else {
                                    toolHeading = vis.bySchemaName("first")[1].params.field.displayName
                                }
								if ((vis.bySchemaName("size_node")[0].params.customLabel == "") || (vis.bySchemaName("size_node")[0].params.customLabel == undefined)) {
(vis.bySchemaName("size_node")[0].params.field == undefined) ? metricLabel = self.titleCase(vis.bySchemaName("size_node")[0].type.title):metricLabel = self.titleCase(vis.bySchemaName("size_node")[0].__type.title + " " + vis.bySchemaName("size_node")[0].params.field.displayName);
} else {
metricLabel = vis.bySchemaName("size_node")[0].params.customLabel;
}
								var inPopup = '<div style="padding:5px;"><span style="margin:5px;"><b>' + toolHeading + '</b></span><span style="padding:5px;"><b>' + dataParsed[n].relationWithSecondNode[r].keySecondNode + "</b></span></div>";
								inPopup=inPopup + '<br/><div style="padding:5px;"><span style="margin:5px;"><b>' + metricLabel + '</b></span><span style="padding:5px;"><b>' + secNodeObj[dataParsed[n].relationWithSecondNode[r].keySecondNode] + "</b></span></div>";
								                            	
                                //Find in the relations the second node to relate
                                var nodeOfSecondType = $.grep(dataNodes, function(e){ return e.key == dataParsed[n].relationWithSecondNode[r].keySecondNode; });
                                if (nodeOfSecondType.length == 0) {
                                    //Not found, added to the DataNodes - node of type 2
                                    i++;
                                    var newNode = {
                                        id : i,
                                        key: dataParsed[n].relationWithSecondNode[r].keySecondNode,
                                        label : dataParsed[n].relationWithSecondNode[r].keySecondNode,
                                        color: visS.secondNodeColor,
										//color: color(dataParsed[n].relationWithSecondNode[r].keySecondNode),
                                        field: vis.bySchemaName("first")[1].params.field,
                                        font : {
                                          color: visS.labelColor,
                                          size: visS.fontSize,
                                          face: '"Open Sans", Helvetica, Arial, sans-serif'
                                        },
                                        shape: visS.shapeSecondNode,
                                        value: Math.log(secNodeObj[dataParsed[n].relationWithSecondNode[r].keySecondNode])/2
                                    };
                                    //Add new node
                                    if (visS.showPopup) {
                                        newNode.title = inPopup
                                    }
                                    dataNodes.push(newNode);
                                    //And create the relation (edge)
                                    var edge = {
                                        from : result[0].id,
                                        to : dataNodes[dataNodes.length-1].id,
                                        //value: dataParsed[n].relationWithSecondNode[r].widthOfEdge
                                        value: secNodeObj[dataParsed[n].relationWithSecondNode[r].keySecondNode]
                                    }
                                    dataEdges.push(edge);

                                } else if (nodeOfSecondType.length == 1) {
                                    //The node exists, creates only the edge
                                    var enlace = {
                                        from : result[0].id,
                                        to : nodeOfSecondType[0].id,
                                        //value: dataParsed[n].relationWithSecondNode[r].widthOfEdge
                                        value: secNodeObj[dataParsed[n].relationWithSecondNode[r].keySecondNode]
                                    }
                                    dataEdges.push(enlace);
                                } else {
                                    //console.log("Error: Multiples nodes with same id found");
                                }
                            }
                        }
                    } else {
                        //console.log("Error: Multiples nodes with same id found");
                    }
                }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////Creation of the network with the library//////////////////////////////////////////////////////////
                var nodesDataSet = new visN.DataSet(dataNodes);
                var edgesDataSet = new visN.DataSet(dataEdges);

                //var container = document.getElementById(network_id);
                //var container = document.getElementById("net");
				var container = this;
                container.style.height = $(this).height();//container.getBoundingClientRect().height;
                container.height = $(this).height();//container.getBoundingClientRect().height;
                var data = {
                    nodes: nodesDataSet,
                    edges: edgesDataSet
                };
                //CHANGE: Options controlled by user directly
                var options_1 = {
					//clickToUse: true,
                    height: $(this).height().toString(),//container.getBoundingClientRect().height.toString(),
                    physics:{
                        barnesHut:{
                            gravitationalConstant: visS.gravitationalConstant,
                            springConstant: visS.springConstant
                        }
                    },
                    edges:{
						color: {
							color: 'red',
							//highlight: '#848484',
							hover: '#848484',
							inherit: 'from',
							opacity: 1.0
						},
                        arrowStrikethrough: false,
                        smooth: {
                            type: visS.smoothType
                        },
                        scaling:{
                            min:visS.minEdgeSize,
                            max:visS.maxEdgeSize
                        }
                    },
                    nodes: {						
                        physics: visS.nodePhysics,
                        scaling:{
                            min:visS.minNodeSize,
                            max:visS.maxNodeSize
                        }
                    },
                    layout: {
                        improvedLayout: !(dataEdges.length > 200)
                    },
                    interaction: {
                        hover: true,
						//selectable: false,
						//selectConnectedEdges: false
                    }
                };
                switch (visS.posArrow) {
                    case 'from':
                        var options_2 = {
                            edges:{
                                arrows: {
                                    from: {
                                        enabled: visS.displayArrow,
                                        scaleFactor: visS.scaleArrow,
                                        type: visS.shapeArrow
                                    }
                                }
                            }
                        };
                        break;
                    case 'middle':
                        var options_2 = {
                            edges:{
                                arrows: {
                                    middle: {
                                        enabled: visS.displayArrow,
                                        scaleFactor: visS.scaleArrow,
                                        type: visS.shapeArrow
                                    }
                                }
                            }
                        };
                        break;
                    case 'to':
                        var options_2 = {
                            edges:{
                                arrows: {
                                    to: {
                                        enabled: visS.displayArrow,
                                        scaleFactor: visS.scaleArrow,
                                        type: visS.shapeArrow
                                    }
                                }
                            }
                        };
                        break;
                    default:
                        var options_2 = {
                            edges:{
                                arrows: {
                                    from: {
                                        enabled: visS.displayArrow,
                                        scaleFactor: visS.scaleArrow,
                                        type: visS.shapeArrow
                                    }
                                }
                            }
                        };
                        break;
                }
                var options = angular.merge(options_1, options_2); 
                /* for(var i=0;i<vis[0].vis.searchSource.reqBody.query.bool.must.length;i++)
				{
                if(Object.keys(vis[0].vis.searchSource.reqBody.query.bool.must[i])[0] == 'match_phrase') 
				{					
					$.each(data.nodes._data,function(key,value){
						if(vis[0].vis.searchSource.reqBody.query.bool.must[i].match_phrase[Object.keys(vis[0].vis.searchSource.reqBody.query.bool.must[i].match_phrase)[0]].query == value.key)
						{
							value.borderWidth = visS.nodeBoarderWidth;
						}
					});
					
				}} */
                if(searchQuery.filter.length > 2){
					for(var i=0;i<searchQuery.filter.length;i++)
{
if(Object.keys(searchQuery.filter[i])[0] == 'match_phrase') 
{					
$.each(data.nodes._data,function(key,value){
if(searchQuery.filter[i].match_phrase[Object.keys(searchQuery.filter[i].match_phrase)[0]].query == value.key)
{
value.borderWidth = visS.nodeBoarderWidth;
}
});

				}}}
                var network = new visN.Network(container, data, options);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                self.startDynamicResize(network);

                network.on("afterDrawing", function (canvasP) {
                    $("#loading").hide();					
                    // Draw the color legend if Node Color is activated
                    if(vis.bySchemaName('colornode') && visS.showColorLegend){
                        //self.drawColorLegend(usedColors, colorDicc);
                    }
                });
				
				network.on( 'click', function(properties) {					
					var ids = properties.nodes[0];
					var clickedNodes = nodesDataSet._data[ids];	
					if (clickedNodes) {
                        //filterGen.add(clickedNodes.field, clickedNodes.key, null, data1.table_data.custom_columns[0].aggConfig.aggConfigs.indexPattern.id)
                        
                        const newFilters=esFilters.generateFilters(
      filter,
      clickedNodes.field,
      clickedNodes.key,
      null,
      data1.table_data.custom_columns[0].aggConfig.aggConfigs.indexPattern.id);
      filter.addFilters(newFilters);
      
                    }else if(properties.edges.length == 1)
					{
						var clickedEdges = edgesDataSet._data[properties.edges[0]];
                        const newFiltersOne=esFilters.generateFilters(
      filter,
      nodesDataSet._data[clickedEdges.from].field,
      nodesDataSet._data[clickedEdges.from].key,
      null,
      data1.table_data.custom_columns[0].aggConfig.aggConfigs.indexPattern.id);
      filter.addFilters(newFiltersOne);
      const newFiltersTwo=esFilters.generateFilters(
      filter,
      nodesDataSet._data[clickedEdges.to].field,
      nodesDataSet._data[clickedEdges.to].key,
      null,
      data1.table_data.custom_columns[0].aggConfig.aggConfigs.indexPattern.id);
      filter.addFilters(newFiltersTwo);
                        //filterGen.add(nodesDataSet._data[clickedEdges.from].field, nodesDataSet._data[clickedEdges.from].key, null, data1.table_data.custom_columns[0].aggConfig.aggConfigs.indexPattern.id);
						//filterGen.add(nodesDataSet._data[clickedEdges.to].field, nodesDataSet._data[clickedEdges.to].key, null, data1.table_data.custom_columns[0].aggConfig.aggConfigs.indexPattern.id);
					}
					});
					
					
										network.on('hoverNode',function(options){
						network.unselectAll();																							
						var nodeEdges = this.body.nodes[options.node].edges;
						var edges=this.body.data.edges;
						var otherEdges=this.body.data.edges._data;
						/* for(i=0;i<this.body.data.nodes[options.node].edges;i++)
						{ */
							$.each(this.body.data.edges._data ,function(el,i){								
								$.each(nodeEdges,function(ele,j){									
									if(el == this.id && otherEdges[el].fromId == options.node)
									{
										edges.update({
											id : el,
											color : {
												opacity : 1
											}
										});										
									}else{
										edges.update({
											id : el,
											color : {
												opacity : 0.2
											}
										});										
									}
								});
							});	
							this.body.data.nodes.update(this.body.data.nodes.get());
					});
					
					
					network.on('blurNode',function(params) {
					network.unselectAll();								   					
						var nodeEdges = this.body.nodes[params.node].edges;
						var edges=this.body.data.edges;
						var otherEdges=this.body.data.edges._data;						
							$.each(this.body.data.edges._data ,function(el,i){								
								$.each(nodeEdges,function(ele,j){																	
										edges.update({
											id : el,
											color : {
												opacity : 1
											}
										});																			
								});
							});
							this.body.data.nodes.update(this.body.data.nodes.get());
           });
		   
					//network.body.emitter.emit('_dataChanged');		
					
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////NODE-RELATION Type/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            }else if(vis.bySchemaName('first').length == 1 && vis.bySchemaName('second')){
                self.initialShows();
                $(".secondNode").hide();
                // Retrieve the id of the configured tags aggregation
                var firstFieldAggId = vis.bySchemaName('first')[0].id;
                var secondFieldAggId = vis.bySchemaName('second')[0].id;

                if(vis.bySchemaName('colornode').length != 0){
                    var colorNodeAggId = vis.bySchemaName('colornode')[0].id;
                    var colorNodeAggName = vis.bySchemaName('colornode')[0].params.field.displayName;
                    var colorDicc = {};
                    var usedColors = [];

                    //Check if "Node Color" is the last selection
                    if(visS.indexOf(vis.bySchemaName('colornode')[0]) <= visS.indexOf(vis.bySchemaName('second')[0])){
                        self.errorNodeColor();
                        return;
                    }
                }

                //Names of the terms that have been selected
                var firstFieldAggName = vis.bySchemaName('first')[0].params.field.displayName;
                var secondFieldAggName = vis.bySchemaName('second')[0].params.field.displayName;

                //Id subbuckets
                var id_second = 2;
                var id_colornode = 4;
                // Retrieve the metrics aggregation configured
                if(vis.bySchemaName('size_node').length != 0){
                    var metricsAgg_sizeNode = vis.bySchemaName('size_node')[0];
                }
                if(vis.bySchemaName('size_edge').length != 0){
                    var metricsAgg_sizeEdge = vis.bySchemaName('size_edge')[0];
                    id_second = 3;
                    id_colornode = 6;
                }

                // Get the buckets of that aggregation
                var buckets = data.series_data;

///////////////////////////////////////////////////////////////DATA PARSED AND BUILDING NODES///////////////////////////////////////////////////////////////
                var dataParsed = [];
                // Iterate the buckets
                var i = 0;
                var dataNodes = buckets.map(function(bucket) {
                  //New structure, needed to search after algorimt
                  var result = $.grep(dataParsed, function(e){ return e.keyNode == bucket[0]; });				  
                  if (result.length == 0) {
                        dataParsed[i] = {};
                        dataParsed[i].keyNode = bucket[0];

                        //Metrics are for the sizes
                        if(metricsAgg_sizeNode){
                            // Use the getValue function of the aggregation to get the value of a bucket
                            var value = bucket[1];
                            var sizeVal = Math.min(visS.maxCutMetricSizeNode, value);

                            //No show nodes under the value
                            if(visS.minCutMetricSizeNode > value){
                                dataParsed.splice(i, 1);
                                return;
                            }
                        }else{
                            var sizeVal = 20;
                        }

                        dataParsed[i].valorSizeNode = sizeVal;
                        dataParsed[i].nodeColorValue = "default";
                        dataParsed[i].nodeColorKey = "default";
                        dataParsed[i].relationWithSecondField = []

                        //It depends of the priority of the selection to obtain the buckets
                        if(bucket[secondFieldAggId]){
                            var orderId = secondFieldAggId;
                        }else{
                            var orderId = firstFieldAggId;
                        }

                        //RELATION//////////////////////////////
                        if(metricsAgg_sizeEdge){
                            id_second = 2;
                            id_colornode = 4;
                            //if both selected
                            if(metricsAgg_sizeNode){
                              id_second = 3;
                              id_colornode = 6;
                            }
                            var value_sizeEdge = bucket[id_second-1];
                            var sizeEdgeVal = Math.min(visS.maxCutMetricSizeEdge, value_sizeEdge);
                        }else{
                            var sizeEdgeVal = 0.1;
                        }

                        //Get the color of the node, save in the dictionary
                        if(colorNodeAggId){
                            if(colorDicc[bucket[id_colornode]]){
                                dataParsed[i].nodeColorKey = bucket[id_colornode];
                                dataParsed[i].nodeColorValue = colorDicc[bucket[id_colornode]];
                            }else{
                                //repeat to find a NO-REPEATED color
                                while(true){
                                    var confirmColor = randomColor();									
                                    if(usedColors.indexOf(confirmColor) == -1){
                                        colorDicc[bucket[id_colornode]] = confirmColor;
                                        dataParsed[i].nodeColorKey = bucket[id_colornode];
                                        dataParsed[i].nodeColorValue = colorDicc[bucket[id_colornode]];
                                        usedColors.push(confirmColor);
                                        break;
                                    }
                                }

                            }
                        }

                        var relation = {
                            keyRelation: bucket[id_second-1],
                            countMetric: bucket[2],
                            widthOfEdge: sizeEdgeVal
                        };
                        dataParsed[i].relationWithSecondField.push(relation)
                        /////////////////////////////
                        if (('customLabel' in vis.bySchemaName("first")[0].params) && vis.bySchemaName("first")[0].params.customLabel != "") {
						toolHeading=vis.bySchemaName("first")[0].params.customLabel;						
						}else{ 
						toolHeading=vis.bySchemaName("first")[0].params.field.displayName;						
						}
                        if ((vis.bySchemaName("size_node")[0].params.customLabel == "") || (vis.bySchemaName("size_node")[0].params.customLabel == undefined)) {
                        	(vis.bySchemaName("size_node")[0].params.field == undefined) ? metricLabel = self.titleCase(vis.bySchemaName("size_node")[0].type.title):metricLabel = self.titleCase(vis.bySchemaName("size_node")[0].__type.title + " " + vis.bySchemaName("size_node")[0].params.field.displayName);
                        	} else {
                        	metricLabel = vis.bySchemaName("size_node")[0].params.customLabel;
                        	}
                        var inPopup = '<div style="padding:5px;"><span style="margin:5px;"><b>' + toolHeading + '</b></span><span style="padding:5px;"><b>' + bucket[0] + "</b></span></div>";
						inPopup=inPopup + '<br/><div style="padding:5px;"><span style="margin:5px;"><b>' + metricLabel + '</b></span><span style="padding:5px;"><b>' + firstNodeObj[bucket[0]] + "</b></span></div>";
                        //var inPopup ='<table  border="1" ><tbody ng-repeat="detail in details"><tr><th><b>' + vis.bySchemaName('first'][0].params.field.displayName +':&nbsp;</b></th><td>' +bucket[0] +'</td></tr>';
                        //var inPopup = "<p>" + bucket[0] + "</p>"
                        if(dataParsed[i].nodeColorValue != "default"){							
                            var colorNodeFinal = dataParsed[i].nodeColorValue;
                            //inPopup += "<p>" + dataParsed[i].nodeColorKey + "</p>";
							inPopup +='<tr><th><b>'+vis.bySchemaName('colornode')[0].params.field.displayName+':&nbsp;</b></th><td>'+dataParsed[i].nodeColorKey+'</td></tr></tbody></table>';
                        }else{
                            var colorNodeFinal = visS.firstNodeColor;
                        }

                        i++;
                        //Return the node totally built
                        var nodeReturn = {
                            id: i,
                            key: bucket[0],
                            color: colors(bucket[0].toString()),
                            shape: visS.shapeFirstNode,                            
                            //size: sizeVal
                            value: Math.log(firstNodeObj[bucket[0]]),
                            font : {
                              color: visS.labelColor,
                              size: visS.fontSize,
							  face : '"Open Sans", Helvetica, Arial, sans-serif'
                            }
                        }

                        //If activated, show the labels
                        if(visS.showLabels){
                            nodeReturn.label = bucket[0];
                        }

                        //If activated, show the popups
                        if(visS.showPopup){
                            nodeReturn.title = inPopup;							
                        }						
                        return nodeReturn;
                    } else if (result.length == 1) {
                      //Repetido el nodo, solo añadimos sus relaciones
                      var dataParsed_node_exist = result[0]
                      if(vis.bySchemaName('second').length > 0){
                        if(metricsAgg_sizeEdge){
                          id_second = 2;
                          id_colornode = 4;
                          //if both selected
                          if(metricsAgg_sizeNode){
                            id_second = 1;
                            id_colornode = 6;
                          }
                          var value_sizeEdge = bucket[id_second+1];
                          var sizeEdgeVal = Math.min(visS.maxCutMetricSizeEdge, value_sizeEdge);
                        }else{
                          var sizeEdgeVal = 0.1;
                        }

                        var relation = {
                          keyRelation: bucket[id_second],
                          countMetric: bucket[2],
                          widthOfEdge: sizeEdgeVal
                        }
                        dataParsed_node_exist.relationWithSecondField.push(relation)
                      }
                      return undefined
                    }
                });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////BUILDING EDGES///////////////////////////////////////////////////////////////////////
                //Clean "undefinded" in the array
                dataNodes = dataNodes.filter(Boolean);
                var dataEdges = [];

                //Iterate parsed nodes
                for(var n = 0; n<dataParsed.length; n++){
                    //Obtain id of the node
                    var NodoFrom = $.grep(dataNodes, function(e){ return e.key == dataParsed[n].keyNode; });
                    if (NodoFrom.length == 0) {
                        //console.log("Error: Node not found");
                    } else if (NodoFrom.length == 1) {
                        var id_from = NodoFrom[0].id;
                        //Iterate relations that have with the second field selected
                        for(var p = 0; p<dataParsed[n].relationWithSecondField.length; p++){
                            //Iterate again the nodes
                            for(var z = 0; z<dataParsed.length; z++){
                            //Check that we don't compare the same node
                                if(dataParsed[n] != dataParsed[z]){
                                    var NodoTo = $.grep(dataNodes, function(e){ return e.key == dataParsed[z].keyNode; });
                                    if (NodoTo.length == 0) {
                                        //console.log("Error: Node not found");
                                    } else if (NodoTo.length == 1) {
                                        var id_to = NodoTo[0].id;
                                        //Have relation?
                                        var sameRelation = $.grep(dataParsed[z].relationWithSecondField, function(e){ return e.keyRelation == dataParsed[n].relationWithSecondField[p].keyRelation;   });
                                        if (sameRelation.length == 1) {
                                            //Nodes have a relation, creating the edge
                                            var edgeExist = $.grep(dataEdges, function(e){ return (e.to == id_from && e.from == id_to) || (e.to == id_to && e.from == id_from); });
                                            if (edgeExist.length == 0) {
                                                //The size of the edge is the total of the common
                                                var sizeEdgeTotal = sameRelation[0].widthOfEdge + dataParsed[n].relationWithSecondField[p].widthOfEdge;
                                                var edge = {
                                                    from : id_from,
                                                    to : id_to,
                                                    //value: sizeEdgeTotal
                                                    value: dataParsed[n].relationWithSecondField[p].countMetric
                                                };
                                                dataEdges.push(edge);
                                            }
                                        }
                                    } else {
                                        //console.log("Error: Multiples nodes with same id found");
                                    }
                                }
                            }
                        }

                    } else {
                      //console.log("Error: Multiples nodes with same id found");
                    }
                }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////Creation of the network with the library//////////////////////////////////////////////////////////
                var nodesDataSet = new visN.DataSet(dataNodes);
                var edgesDataSet = new visN.DataSet(dataEdges);

                        
                // Creation of the network
                //var container = document.getElementById("net");
				var container = this;				
                //Set the Height
                container.style.height = $(this).height();//container.getBoundingClientRect().height;
                container.height = $(this).height();//container.getBoundingClientRect().height;
                //Set the Data
                var data = {
                    nodes: nodesDataSet,
                    edges: edgesDataSet
                };
                //Set the Options
                var options = {
					//clickToUse: true,
                    height: $(this).height().toString(),//container.getBoundingClientRect().height.toString(),
                    physics: {
                        barnesHut: {
                            gravitationalConstant: visS.gravitationalConstant,
                            springConstant: visS.springConstant,
                            springLength: 500
                        }
                    },
                    edges: {
							color: {
							color: 'red',
							//highlight: 'red',
							//hover: '#848484',
							inherit: 'from',
							opacity: 1
						},
                        arrows: {
                            to: {
                                enabled: visS.displayArrow,
                                scaleFactor: visS.scaleArrow,
                                type: visS.shapeArrow
                            }
                        },											
                        arrowStrikethrough: false,
                        smooth: {
                            type: visS.smoothType
                        },
                        scaling:{
                            min:visS.minEdgeSize,
                            max:visS.maxEdgeSize
                        }
                    },
                    interaction: {
                        hideEdgesOnDrag: false,
                        hover: true,
						//selectable: false,
						//selectConnectedEdges: false
                    },
                    nodes: {						
                        physics: visS.nodePhysics,
                        scaling:{
                            min:visS.minNodeSize,
                            max:visS.maxNodeSize
                        }
                    },
                    layout: {
                        improvedLayout: false
                    }
                }
                //console.log("Create network now");
                
                /* for(var i=0;i<vis[0].vis.searchSource.reqBody.query.bool.must.length;i++)
				{
                if(Object.keys(vis[0].vis.searchSource.reqBody.query.bool.must[i])[0] == 'match_phrase')
				{					
					$.each(data.nodes._data,function(key,value){
						if(vis[0].vis.searchSource.reqBody.query.bool.must[i].match_phrase[Object.keys(vis[0].vis.searchSource.reqBody.query.bool.must[i].match_phrase)[0]].query == value.key)
						{
							value.borderWidth = visS.nodeBoarderWidth;
						}
					});
					
				}} */
                if(searchQuery.filter.length > 2){
					for(var i=0;i<searchQuery.filter.length;i++)
{
if(Object.keys(searchQuery.filter[i])[0] == 'match_phrase') 
{					
$.each(data.nodes._data,function(key,value){
if(searchQuery.filter[i].match_phrase[Object.keys(searchQuery.filter[i].match_phrase)[0]].query == value.key)
{
value.borderWidth = visS.nodeBoarderWidth;
}
});

				}}}
                var network = new visN.Network(container, data, options);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                self.startDynamicResize(network);

                network.on("afterDrawing", function (canvasP) {
                    $("#loading").hide();					
                    // Draw the color legend if Node Color is activated
                    if(vis.bySchemaName('colornode').length != 0  && visS.showColorLegend){
                        self.drawColorLegend(usedColors, colorDicc);
                    }
                });
				network.on( 'click', function(properties) {				
					var ids = properties.nodes[0];
					var clickedNodes = nodesDataSet._data[ids];
					//var clickedEdges=edgesDataSet.					
					if(clickedNodes)
					{
                        const newFiltersThree=esFilters.generateFilters(
      filter,
      vis.bySchemaName('first')[0].params.field,
      clickedNodes.key,
      null,
      data1.table_data.custom_columns[0].aggConfig.aggConfigs.indexPattern.id);
      filter.addFilters(newFiltersThree);
						/* filterGen.add( // The field to filter for, we can get it from the config			
                                        vis.bySchemaName('first')[0].params.field, //data.series[0].values[0].aggConfig.vis.aggs.bySchemaName('group'][0].params.field,
                                        // The value to filter for, we will read out the bucket key from the tag
                                        clickedNodes.key,
                                        // Whether the filter is negated. If you want to create a negated filter pass '-' here
                                        null,
                                        // The index pattern for the filter
                                        data1.table_data.custom_columns[0].aggConfig.aggConfigs.indexPattern.id); */
					}
					if(properties.edges.length ==1 )
					{
						var clickedEdges=edgesDataSet._data[properties.edges[0]]						
						var nodesOnEdge=[];
						nodesOnEdge.push(nodesDataSet._data[clickedEdges.from].key);
                        nodesOnEdge.push(nodesDataSet._data[clickedEdges.to].key);
                        
                        const newFiltersFour=esFilters.generateFilters(
      filter,
      vis.bySchemaName('first')[0].params.field,
      nodesOnEdge,
      null,
      data1.table_data.custom_columns[0].aggConfig.aggConfigs.indexPattern.id);
      filter.addFilters(newFiltersFour);

						/* filterGen.add( // The field to filter for, we can get it from the config			
                                        vis.bySchemaName('first')[0].params.field, //data.series[0].values[0].aggConfig.vis.aggs.bySchemaName('group'][0].params.field,
                                        // The value to filter for, we will read out the bucket key from the tag
                                        nodesOnEdge,
                                        // Whether the filter is negated. If you want to create a negated filter pass '-' here
                                        null,
                                        // The index pattern for the filter
                                        data1.table_data.custom_columns[0].aggConfig.aggConfigs.indexPattern.id); */
					}
					});															
					network.on('hoverNode',function(options){
						network.unselectAll();															
						var nodeEdges = this.body.nodes[options.node].edges;
						var edges=this.body.data.edges;
						var otherEdges=this.body.data.edges._data;						
							$.each(this.body.data.edges._data ,function(el,i){								
								$.each(nodeEdges,function(ele,j){									
									if(el == this.id && otherEdges[el].fromId == options.node)
									{
										edges.update({
											id : el,
											color : {
												opacity : 1
											}
										});										
									}else{
										edges.update({
											id : el,
											color : {
												opacity : 0.2
											}
										});										
									}
								});
							});
							this.body.data.nodes.update(this.body.data.nodes.get());
					});
					
					
					
					network.on('blurNode',function(params) {
					network.unselectAll();					
						var nodeEdges = this.body.nodes[params.node].edges;
						var edges=this.body.data.edges;
						var otherEdges=this.body.data.edges._data;						
							$.each(this.body.data.edges._data ,function(el,i){								
								$.each(nodeEdges,function(ele,j){									
										edges.update({
											id : el,
											color : {
												opacity : 1
											}
										});
										
									
								});
							});
							this.body.data.nodes.update(this.body.data.nodes.get());
           });
					//network.body.emitter.emit('_dataChanged');
		  
					/* network.on('hoverEdge', function(e) {
    this.body.data.edges.update({
        id: e.edge,        
		color : {
			hover : "black"
		}
    });
}); */

            }else{
                self.errorNodeNodeRelation();
            }
					}
					}
					//return svg;
				});
			};
		}catch(e)
		{
			
		}
	};
	}
	/*return NetworkChart;
};*/