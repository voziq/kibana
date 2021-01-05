import d3 from 'd3';
import _ from 'lodash';
import $ from 'jquery';
//import { ContainerTooSmall } from 'ui/errors';
import { Chart } from '../../vis_type_vislib/public/vislib/visualizations/_chart';
//import { FilterBarQueryFilterProvider } from 'ui/filter_manager/query_filter';
//import { getFilterGenerator } from 'ui/filter_manager';


   
    /**
     * Bubble chart visualization
     *
     * @class AreaChart
     * @constructor
     * @extends Chart
     * @param handler {Object} Reference to the Handler Class Constructor
     * @param el {HTMLElement} HTML element to which the chart will be appended
     * @param chartData {Object} Elasticsearch query results for this specific
     * chart
     */
    export class CalenderheatmapChart extends Chart {
		
        constructor(handler, chartEl, chartData, deps) {
            super(handler, chartEl, chartData, deps);
			
            var charts = this.handler.data.getVisData();
            $(this).html("");
        }

        _validateContainerSize(width, height) {
            var minWidth = 200;
            var minHeight = 200;

            if (width <= minWidth || height <= minHeight) {
              //  throw new ContainerTooSmall();
            }
        };
        addPathEvents(element) {
            var events = this.events;
            return element
                .call(events.addHoverEvent())
                .call(events.addMouseoutEvent())
                .call(events.addClickEvent());
        };

        /**
         * Renders d3 visualization
         *
         * @method draw
         * @returns {Function} Creates the area chart
         */
		 
		
        draw() {
			// var Private;
		 //Private=this.handler.data.data.series[0].values[0].xRaw.table.Private;		
			
  //const filterGen = getFilterGenerator(this.chartData.queryFilter);
			
            // Attributes
			
            const self = this;
			var options = self.handler.visConfig._values;
            var color = this.handler.data.getColorFunc();			
            //font-family:Helvetica,Arial,sans-serif;
            var tooltip = this.tooltip;
            return function(selection) {
                selection.each(function(data) {	
				
                     
                        var width = $(this).width();
                        var height = $(this).height();
					
                        self._validateContainerSize(width, height);
                       

                       

                        var title="Migrant deaths in the Mediterranean";
    var units=" dead or missing";
    var breaks=[10,25,50,100];
    var colours=["#ffffd4","#fed98e","#fe9929","#d95f0e","#993404"];
    

    //general layout information
    var cellSize = 17;
    var xOffset=20;
    var yOffset=60;
    var calY=50;//offset of calendar in each group
    var calX=25;
    var width = 960;
    var height = 163;
    var parseDate = d3.time.format("%d/%m/%y").parse;
    var format = d3.time.format("%d-%m-%Y");
    var toolDate = d3.time.format("%d/%b/%y");
    
   

        //set up an array of all the dates in the data which we need to work out the range of the data
        var dates = new Array();
        var values = new Array();
        
     
						var data1 = new Array;
						
						var xlabel=data.xAxisLabel;
									var ylabel=data.yAxisLabel;
									var field=data.series_data[0].aggConfig.params.field;
									var index=data.series_data[0].aggConfig.aggConfigs.indexPattern.id;
									
									
									data.series_data.forEach((function (d) {
                                     
         
			var de = new Date(parseInt(d.label));
			
			var offer_json={};
											
											offer_json["date"] = de;
                                          offer_json["value"] = d.value;
										  offer_json["x"] =xlabel;
											offer_json["y"] =ylabel;
											offer_json["field"] =field;
											offer_json["index"] =index;
										  data1.push(offer_json);
										 
            
               
                                        }));
									var data=data1;
									
									
									data.forEach(function(d)    {
                //dates.push(parseDate(d.date));
                //values.push(d.value);
                d.date=d.date;
                d.value=d.value;
				d.x=d.x;
				d.y=d.y;
				d.field=d.field;
				d.index=d.index;
                d.year=d.date.getFullYear();//extract the year from the data
        });
									
									
														 const { min, max } = getMinMax(data);
										
										function getMinMax(data) {
											
											
  let min = data[0].value;
  let max = data[0].value;
  for (let i = 1; i < data.length; i += 1) {
    min = Math.min(data[i].value, min);
    max = Math.max(data[i].value, max);
  }
  return { min, max };
}
                                    var ass1=new Array;
									
									
									
	var i;
for (i = 1; i < 5; i++) {
  var x=max/i;
  ass1.push(Math.round(x));
}		
	
	

var ass=new Array;
ass=ass1.reverse();


	
        var yearlyData = d3.nest()
            .key(function(d){
				return d.year;
				})
            .entries(data);
			
			
			var ll=1+yearlyData.length;
											var ddd=(yOffset + ll * (height + calY)) 
        
        var svg = d3.select(this).append("svg")
            .attr("width","90%")
            .attr("viewBox","0 0 "+(xOffset+width)+" "+(ddd-200)+"")
            
        //title
       /* svg.append("text")
        .attr("x",xOffset)
        .attr("y",20)
        .text(title);*/
        
        //create an SVG group for each year
        var cals = svg.selectAll("g")
            .data(yearlyData)
            .enter()
            .append("g")
			  /* .on("click", function(d) {
				   
				   console.dir("pppppppppppppppppppppppppppppppppppppppp");
				    console.dir(d);
					console.dir(data);
                               if (data != undefined) {	


									
									//console.dir(fieldName);
                                    filterGen.add( // The field to filter for, we can get it from the config			
                                    		d.field, //data.series[0].values[0].aggConfig.vis.aggs.bySchemaName['group'][0].params.field,
                                        // The value to filter for, we will read out the bucket key from the tag
                                        d.key.replace(/,/g,''),
                                        // Whether the filter is negated. If you want to create a negated filter pass '-' here
                                        null,
                                        // The index pattern for the filter
                                       d.index);

                                }

                            })*/
            .attr("id",function(d){
                return d.key;
            })
            .attr("transform",function(d,i){
                return "translate(0,"+(yOffset+(i*(height+calY)))+")";  
            })
         if (options.labels.show) {
			
        var labels = cals.append("text")
            .attr("class","yearLabel")
            .attr("x",xOffset)
            .attr("y",15)
            .text(function(d){return d.key});
		 }
        //create a daily rectangle for each year
        var rects = cals.append("g")
            .attr("id","alldays")
            .selectAll(".day")
            .data(function(d) { return d3.time.days(new Date(parseInt(d.key), 0, 1), new Date(parseInt(d.key) + 1, 0, 1)); })
            .enter().append("rect")
            .attr("id",function(d) {
                return "_"+format(d);
                //return toolDate(d.date)+":\n"+d.value+" dead or missing";
            })
            .attr("class", "day")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("x", function(d) {
                return xOffset+calX+(d3.time.weekOfYear(d) * cellSize);
            })
            .attr("y", function(d) { return calY+(d.getDay() * cellSize); })
            .datum(format);
        
        //create day labels
        var days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
        var dayLabels=cals.append("g").attr("id","dayLabels")
		if (options.labels.show) {
        days.forEach(function(d,i)    {
            dayLabels.append("text")
            .attr("class","dayLabel1")
            .attr("x",xOffset)
            .attr("y",function(d) { return calY+(i * cellSize); })
            .attr("dy","0.9em")
            .text(d);
        })
        }
		
		 $('.chart').css({'overflow' : 'auto'});
        //let's draw the data on
        var dataRects = cals.append("g")
            .attr("id","dataDays")
            .selectAll(".dataday")
            .data(function(d){
                return d.values;   
            })
            .enter()
            .append("rect")
            .attr("id",function(d) {
                return format(d.date)+":"+d.value;
            })
            .attr("stroke","#ccc")
            .attr("width",cellSize)
            .attr("height",cellSize)
            .attr("x", function(d){return xOffset+calX+(d3.time.weekOfYear(d.date) * cellSize);})
            .attr("y", function(d) { return calY+(d.date.getDay() * cellSize); })
            .attr("fill", function(d) {
                if (d.value<ass[0]) {
                    return colours[0];
                }
                for (i=0;i<ass.length+1;i++){
                    if (d.value>=ass[i]&&d.value<ass[i+1]){
                        return colours[i];
                    }
                }
                if (d.value>ass.length-1){
                    return colours[ass.length]   
                }
            })
        
        //append a title element to give basic mouseover info
        /*dataRects.append("title")
            .text(function(d) { return toolDate(d.date)+":\n"+d.value+units; });*/
        
		
		
		 if (options.addTooltip) {
														
                            dataRects.call(tooltip.render());
                        }
        //add montly outlines for calendar
        cals.append("g")
        .attr("id","monthOutlines")
        .selectAll(".month")
        .data(function(d) { 
            return d3.time.months(new Date(parseInt(d.key), 0, 1),
                                  new Date(parseInt(d.key) + 1, 0, 1)); 
        })
        .enter().append("path")
        .attr("class", "month")
        .attr("transform","translate("+(xOffset+calX)+","+calY+")")
        .attr("d", monthPath);
        
        //retreive the bounding boxes of the outlines
        var BB = new Array();
        var mp = document.getElementById("monthOutlines").childNodes;
        for (var i=0;i<mp.length;i++){
            BB.push(mp[i].getBBox());
        }
        var boxCentre="";
        var monthX = new Array();
        BB.forEach(function(d,i){
            boxCentre = d.width/2;
            monthX.push(xOffset+calX+d.x+boxCentre);
        })



        //create centred month labels around the bounding box of each month path
        //create day labels
        var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
        var monthLabels=cals.append("g").attr("id","monthLabels")
		if (options.labels.show) {
        months.forEach(function(d,i)    {
            monthLabels.append("text")
            .attr("class","monthLabel")
            .attr("x",monthX[i])
            .attr("y",calY/1.2)
            .text(d);
        })
		}
        
         //create key
        var key = svg.append("g")
            .attr("id","key")
            .attr("class","key")
            .attr("transform",function(d){
                return "translate("+xOffset+","+(yOffset-(cellSize*1.5))+")";
            });
        
        key.selectAll("rect")
            .data(colours)
            .enter()
            .append("rect")
            .attr("width",cellSize)
            .attr("height",cellSize)
            .attr("x",function(d,i){
                return i*130;
            })
            .attr("fill",function(d){
                return d;
            });
        
        key.selectAll("text")
            .data(colours)
            .enter()
            .append("text")
            .attr("x",function(d,i){
                return cellSize+5+(i*130);
            })
            .attr("y","1em")
            .text(function(d,i){
                if (i<colours.length-1){
                    return "up to "+ass[i];
                }   else    {
                    return "over "+ass[i-1];   
                }
            });
        
    //end data load
    
    //pure Bostock - compute and return monthly path data for any year
    function monthPath(t0) {
      var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
          d0 = t0.getDay(), w0 = d3.time.weekOfYear(t0),
          d1 = t1.getDay(), w1 = d3.time.weekOfYear(t1);
      return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
          + "H" + w0 * cellSize + "V" + 7 * cellSize
          + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
          + "H" + (w1 + 1) * cellSize + "V" + 0
          + "H" + (w0 + 1) * cellSize + "Z";
    }
					
                       
							
                 


                  
                        d3.select(self.frameElement).style("height", height + "px");
                        //self.addPathEvents(gnode);
                   
                });
            };
        };
    }

   