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
import * as d3test from './d3';
import React from 'react';
import * as Rx from 'rxjs';
import { take } from 'rxjs/operators';
import { render, unmountComponentAtNode } from 'react-dom';
import { I18nProvider } from '@kbn/i18n/react';
import * as d3Chromatic from './d3-scale-chromatic.v0.3.min';
import { seedColors } from './seed_colors';
import { getFormatService } from '../services';

import { Label } from './label';
import { TagCloud } from './tag_cloud';
import { FeedbackMessage } from './feedback_message';
import d3 from 'd3';

const MAX_TAG_COUNT = 200;
const d3ChromaticScale = d3Chromatic;
   var itemcolors = {};
export function createTagCloudVisualization({ colors }) {
  const colorScale = d3.scale.ordinal().range(colors.seedColors);
  return class TagCloudVisualization {
    constructor(node, vis) {
      this._containerNode = node;

    /*  const cloudRelativeContainer = document.createElement('div');
      cloudRelativeContainer.classList.add('tgcVis');
      cloudRelativeContainer.setAttribute('style', 'position: relative');
      const cloudContainer = document.createElement('div');
      cloudContainer.classList.add('tgcVis');
      cloudContainer.setAttribute('data-test-subj', 'tagCloudVisualization');
      this._containerNode.classList.add('visChart--vertical');
      cloudRelativeContainer.appendChild(cloudContainer);
      this._containerNode.appendChild(cloudRelativeContainer);

      this._vis = vis;*/
	  	  this._vis = vis;  
    const cloudContainer = document.createElement('div');
    cloudContainer.classList.add('tgcVis');
    cloudContainer.setAttribute('data-test-subj', 'tagCloudVisualization');
    this._containerNode.appendChild(cloudContainer);
	
	if(this._vis.params.sentiment){	
	cloudContainer.style.width = "50%";
	}
	
	const cloudContainer1 = document.createElement('div');
	cloudContainer1.classList.add('tgcVis1');
	 cloudContainer1.setAttribute('data-test-subj', 'tagCloudVisualization');
	 this._containerNode.appendChild(cloudContainer1);
	 
	 
      this._truncated = false;
      this._tagCloud = new TagCloud(cloudContainer, colorScale);
	  	this._tagCloud1 = new TagCloud(cloudContainer1,colorScale);
      this._tagCloud.on('select', (event) => {
        if (!this._visParams.bucket) {
          return;
        }
        this._vis.API.events.filter({
          table: event.meta.data,
          column: 0,
          row: event.meta.rowIndex,
        });
      });
      this._renderComplete$ = Rx.fromEvent(this._tagCloud, 'renderComplete');

      this._feedbackNode = document.createElement('div');
      this._containerNode.appendChild(this._feedbackNode);
      this._feedbackMessage = React.createRef();
      render(
        <I18nProvider>
          <FeedbackMessage ref={this._feedbackMessage} />
        </I18nProvider>,
        this._feedbackNode
      );

      this._labelNode = document.createElement('div');
      this._containerNode.appendChild(this._labelNode);
      this._label = React.createRef();
      render(<Label ref={this._label} />, this._labelNode);
    }

    async render(data, visParams) {
		
				  this._vis.params=visParams;
	//  this._vis.params.sentiment=visParams.sentiment;
	  	  	  if(this._vis.params.sentiment == true ){
			
		 $('.tgcVis').css({'width' : '50%'});
		 $('.tgcVis1').css({'display' : 'block'});
		 $('.tgcVis1').css({'width' : '50%'});
		 $('.tgcVis1').css({'top' : '25%'});
		 $('.tgcVis1').css({'left' : '50%'});
		  $('.tgcVis1').css({'height' : '50%'});
		  $('.tgcVis1').css({'overflow' : 'hidden'});
		  $('.tgcVis1').css({'position' : 'absolute'});
		   $('.tgcVisLabel').css({'position' : 'absolute'});
		   $('.tgcVisLabel').css({'bottom': '2px'});
		 
		
		 // this._resize();
		    this._tagCloud.resize();
	  	 this._tagCloud1.resize();
		 }else{
			 
		$('.tgcVis').css({'width' : '100%'});
		 $('.tgcVisLabel').css({'position' : 'absolute'});
		   $('.tgcVisLabel').css({'bottom': '2px'});
		 $('.tgcVis1').css({'display' : 'none'});
			//  this._resize();
			   this._tagCloud.resize();
	  	 this._tagCloud1.resize();
				}
				
      this._updateParams(visParams);
      this._updateData(data);
   //   this._resize();

	
			/*	const colorScaleValues = d3test.scaleOrdinal().range(seedColors);
											
													
														
														this._tagCloud._svgGroup.selectAll('text')[0].map(function(val,index){														
															words.map(function(value){			
																if(val.innerHTML == value.displayText){
												
															if(data.columns.length===3)
															{
																value.tagColor=itemcolors[value.colorSchemaValue];
																val.style.fill=getFill(value);
															}else{
															
																value.tagColor=colorScaleValues(value.displayText);
																val.style.fill=getFill(value);
															}
																}
															})
														})
														itemcolors = {};*/
														
														    var words=this._tagCloud._words;
                                                                                                        var getFill=this._tagCloud.getFill;                                                                                                        
                                                                                                        if (data.columns.length === 3) {                                                                                                        
                                                                                                        
                                                                                                        if(this._tagCloud._svgGroup.selectAll('text')[0].length > 0)
                                                                                                        {
                                                                                                                this._tagCloud._svgGroup.selectAll('text')[0].map(function(val,index){
                                                                                                                        words.map(function(value){                                                                                                                                
                                                                                                                                if(val.innerHTML == value.displayText){
																														
                                                                                                                                val.style.fill=getFill(value);
                                                                                                                                }
                                                                                                                        })                                                                                                                        
                                                                                                                })
                                                                                                        }
                                                                                                        }else{
                                                                                                                const colorScaleValues = d3.scale.ordinal().range(colors.seedColors);
                                                                                                                this._tagCloud._svgGroup.selectAll('text')[0].map(function(val,index){                                                                                                                        
                                                                                                                        words.map(function(value){
                                                                                                                                
                                                                                                                                if(val.innerHTML == value.displayText){
                                                                                                                                        value.tagColor=colorScaleValues(value.displayText)
                                                                                                                                val.style.fill=getFill(value);
                                                                                                                                }
                                                                                                                        })
                                                                                                                })
                                                                                                        }
																									
								
	
if(data.columns[0]!=undefined && data.columns[1]!=undefined)
{
				    this._label.current.setState({
        label: `${data.columns[0].name} - ${data.columns[1].name}`,
        shouldShowLabel: visParams.showLabel,
      });	
}	  
      await this._renderComplete$.pipe(take(1)).toPromise();

      if (data.columns.length !== 2) {
        this._feedbackMessage.current.setState({
          shouldShowTruncate: false,
          shouldShowIncomplete: false,
        });
        return;
      }

  
      this._feedbackMessage.current.setState({
        shouldShowTruncate: this._truncated,
        shouldShowIncomplete: this._tagCloud.getStatus() === TagCloud.STATUS.INCOMPLETE,
      });
    }

    destroy() {
      this._tagCloud.destroy();
      unmountComponentAtNode(this._feedbackNode);
      unmountComponentAtNode(this._labelNode);
    }
   getScales=function(minRange, maxRange, min, max){
	
   var scales=[];             // Prepare some variables
   var ranges = maxRange+1 - minRange,   // Amount of elements to be returned.
    range  = (max-min)/ranges;        // Difference between min and max
    for(var i = 0; i < ranges; i++){
        scales.push({
            range: i+minRange,        // Current range number
            min: min + range * i,
            max: min + range * (i+1),
			colorValue: this.colorScale(i)
        });
    }
    
    return scales;
}

getScalesRanges = function (minRange, maxRange, colorRangeValues) {
    var scales = [];
    var ranges = colorRangeValues.length;
    //range = (max - min) / ranges;
    for (var i = 0; i < ranges; i++) {
        scales.push({
            range: i,
            min: colorRangeValues[i].from,
            max: colorRangeValues[i].to,
            colorValue: this.colorScale(i)
        })
    }
    return scales
};
inCustomRange = function(x,colorRangeValues){
	var val = false;	
	for (var i = 0; i < colorRangeValues.length; i++) {
	if((x - colorRangeValues[i].from) * (x - colorRangeValues[i].to) <= 0)
{
	return (x - colorRangeValues[i].from) * (x - colorRangeValues[i].to) <= 0;
}
}
return val;
}

inRange=function(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}

getcolorFuncValue=function(val){
for(var i=0;i<this.scaleValues.length;i++){
if(this.inRange(val,this.scaleValues[i].min,this.scaleValues[i].max)){
return this.scaleValues[i].colorValue;
}
}
}
  /*  _updateData(data) {
      if (!data || !data.rows.length) {
        this._tagCloud.setData([]);
        return;
      }

      const bucket = this._visParams.bucket;
      const metric = this._visParams.metric;
      const bucketFormatter = bucket ? getFormatService().deserialize(bucket.format) : null;
      const tagColumn = bucket ? data.columns[bucket.accessor].id : -1;
      const metricColumn = data.columns[metric.accessor].id;
      const tags = data.rows.map((row, rowIndex) => {
        const tag = row[tagColumn] === undefined ? 'all' : row[tagColumn];
        const metric = row[metricColumn];
        return {
          displayText: bucketFormatter ? bucketFormatter.convert(tag, 'text') : tag,
          rawText: tag,
          value: metric,
          meta: {
            data: data,
            rowIndex: rowIndex,
          },
        };
      });

      if (tags.length > MAX_TAG_COUNT) {
        tags.length = MAX_TAG_COUNT;
        this._truncated = true;
      } else {
        this._truncated = false;
      }

      this._tagCloud.setData(tags);
    }
*/

  _updateData(data) {
	  
	  
	     var colorLength='';	 
	  if (this._vis.params.setColorRange && this._vis.params.colorsRange.length) {
		  colorLength = this._vis.params.colorsRange.length;
	  }else
		  {
		  colorLength = this._vis.params.colorsNumber;
		  }

	  if(!this._vis.params.invertColors){
	  if(this._vis.params.colorSchema === "Yellow to Red"){
	this.colorScale = d3test.scaleSequential(d3ChromaticScale["interpolateYlOrRd"]).domain([-1,colorLength]);	  
	  }else if(this._vis.params.colorSchema === "Green to Red"){	
	this.colorScale = d3test.scaleLinear().domain([-1, colorLength]).range(["lightgreen", "red"]).interpolate(d3test.interpolateRgb);	
	  }else{
	this.colorScale = d3test.scaleSequential(d3ChromaticScale["interpolate"+this._vis.params.colorSchema]).domain([-2,colorLength]);	  	  
	  }
	  }else{
		  if (this._vis.params.colorSchema === "Yellow to Red") {
              this.colorScale = d3test.scaleSequential(d3ChromaticScale["interpolateYlOrRd"]).domain([colorLength, -1]);
          } else if (this._vis.params.colorSchema === "Green to Red") {
              this.colorScale = d3test.scaleLinear().domain([colorLength,-1]).range(["lightgreen", "red"]).interpolate(d3test.interpolateRgb);
          } else {
              this.colorScale = d3test.scaleSequential(d3ChromaticScale["interpolate" + this._vis.params.colorSchema]).domain([colorLength,-2]);
          }
	  }

    if (!data || !data.rows.length) {
      this._tagCloud.setData([]);
	  this._tagCloud1.setData([]);
      return;
    }

    var tagColor = "";
		var colorSchemaMetric= "";
		var metricColumn=" ";

    const bucket = this._visParams.bucket;
    const metric = this._visParams.metric;


	const metric1 = this._visParams.metric1;
	const bucketFormatter = bucket ? getFormatService().deserialize(bucket.format) : null;
    const tagColumn = bucket ? data.columns[bucket.accessor].id : -1;
	
   // const metricColumn = data.columns[metric.accessor].id;
	if(data.columns.length === 2){
		metricColumn = data.columns[1].id;
	}
	if (data.columns.length === 3) {
		metricColumn = data.columns[2].id;
	colorSchemaMetric = data.columns[1].id;
	}


	  if (this._vis.params.setColorRange && this._vis.params.colorsRange.length) {	
		this.scaleValues =	this.getScalesRanges(0,this._vis.params.colorsRange.length - 1,this._vis.params.colorsRange);						
		}else
			{
	this.scaleValues=this.getScales(0,this._vis.params.colorsNumber-1,Math.floor(Math.min.apply(Math, data.rows.map(function (o) {return o[colorSchemaMetric]}))), Math.ceil(Math.max.apply(Math, data.rows.map(function (o) {return o[colorSchemaMetric]}))))
			}
	
	 const tags = data.rows.map((row, rowIndex) => {
		
		
      const tag = row[tagColumn] === undefined ? 'all' : row[tagColumn];
      const metric = row[metricColumn];

	  if (data.columns.length === 3) {
		     if(this._vis.params.setColorRange && this.inCustomRange(row[colorSchemaMetric],this._vis.params.colorsRange))
      {
		 itemcolors[row[colorSchemaMetric]]=this.getcolorFuncValue(row[colorSchemaMetric]);
      return {
        displayText: bucketFormatter ? bucketFormatter.convert(tag, 'text') : tag,
        rawText: tag,
        value: metric,
        colorSchemaValue : row[colorSchemaMetric],
		tagColor : this.getcolorFuncValue(row[colorSchemaMetric]),
        meta: {
          data: data,
          rowIndex: rowIndex,
        }
      };
      }else if(!this._vis.params.setColorRange){
		 itemcolors[row[colorSchemaMetric]]=this.getcolorFuncValue(row[colorSchemaMetric]);

    	  return {
    	       displayText: bucketFormatter ? bucketFormatter.convert(tag, 'text') : tag,
    	        rawText: tag,
    	        value: metric,
    	        colorSchemaValue : row[colorSchemaMetric],
    			tagColor : this.getcolorFuncValue(row[colorSchemaMetric]),
    	        meta: {
    	          data: data,
    	          rowIndex: rowIndex,
    	        }
    	      };

}else if (this._vis.params.setColorRange && this._vis.params.colorsRange.length == 0){

	 return {
	        displayText: bucketFormatter ? bucketFormatter.convert(tag, 'text') : tag,
	        rawText: tag,
	        value: metric,
	        colorSchemaValue : row[colorSchemaMetric],
			tagColor : this.getcolorFuncValue(row[colorSchemaMetric]),
	        meta: {
	          data: data,
	          rowIndex: rowIndex,
	        }
	      };
}else{
    	  return '';
      }
		  
	  }else{
      return {
        displayText: bucketFormatter ? bucketFormatter.convert(tag, 'text') : tag,
        rawText: tag,
        value: metric,
		colorSchemaValue: row[colorSchemaMetric],
        tagColor: this.getcolorFuncValue(row[colorSchemaMetric]),
        meta: {
          data: data,
          rowIndex: rowIndex,
        }
      };
	  }
    });

	

    if (tags.length > MAX_TAG_COUNT) {
      tags.length = MAX_TAG_COUNT;
      this._truncated = true;
    } else {
      this._truncated = false;
    }

    this._tagCloud.setData(tags);	
		 if(!this._vis.params.sentiment){				
    	this._tagCloud1.setData([]);
    	
    	return;
    }
	
	
	   if(this._vis.params.sentiment == true ){	

    	
    		  const data1 = data.resp.raw.aggregations.sentiment_agg.senti.buckets;
    		  
    		  const tags1 = data1.map(row => {
    			
    			var a=[];
    		
    			
    	 
    			a.push(row.key);
    	 
    			a.push(row.doc_count);
    	      const [tag, count] = a;
    		 
    		  a=[];
    		
    	      return {		
    	        displayText: bucketFormatter ? bucketFormatter.convert(tag, 'text') : tag,		
    	        rawText: tag,	
    	        value: count,		
    			sentiment:this._vis.params.sentiment
    	      };
    	    });
    	   if (tags1.length > MAX_TAG_COUNT) {
    	      tags1.length = MAX_TAG_COUNT;
    	      this._truncated = true;
    	    } else {
    	      this._truncated = false;
    	    }

    	    this._tagCloud1.setData(tags1);
    	 }
	
  }

    _updateParams(visParams) {
      this._visParams = visParams;
      this._tagCloud.setOptions(visParams);
	  	this._tagCloud1.setOptions(visParams);
    }

    _resize() {
      this._tagCloud.resize();
	  this._tagCloud1.resize();
    }
  };
}
