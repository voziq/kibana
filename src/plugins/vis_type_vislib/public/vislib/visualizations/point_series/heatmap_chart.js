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

import _ from 'lodash';
import d3 from 'd3';
import $ from 'jquery';
import moment from 'moment';

import { isColorDark } from '@elastic/eui';

import { PointSeries } from './_point_series';
import { getHeatmapColors } from '../../../../../../plugins/charts/public';

const defaults = {
  color: undefined, // todo
  fillColor: undefined, // todo
};
/**
 * Line Chart Visualization
 *
 * @class HeatmapChart
 * @constructor
 * @extends Chart
 * @param handler {Object} Reference to the Handler Class Constructor
 * @param el {HTMLElement} HTML element to which the chart will be appended
 * @param chartData {Object} Elasticsearch query results for this specific chart
 */
export class HeatmapChart extends PointSeries {
  constructor(handler, chartEl, chartData, seriesConfigArgs, deps) {
    super(handler, chartEl, chartData, seriesConfigArgs, deps);

    this.seriesConfig = _.defaults(seriesConfigArgs || {}, defaults);

    this.handler.visConfig.set('legend', {
				 labels: [],
      labels1: this.getHeatmapLabels(this.handler.visConfig),
   //   labels: this.getHeatmapLabels(this.handler.visConfig),
      colors: this.getHeatmapColors(this.handler.visConfig),
    });

    const colors = this.handler.visConfig.get('legend.colors', null);
    if (colors) {
      this.handler.vis.uiState.setSilent('vis.defaultColors', null);
      this.handler.vis.uiState.setSilent('vis.defaultColors', colors);
    }
  }

  getHeatmapLabels(cfg) {
    const percentageMode = cfg.get('percentageMode');
    const colorsNumber = cfg.get('colorsNumber');
    const colorsRange = cfg.get('colorsRange');
    const zAxisConfig = this.getValueAxis().axisConfig;
    const zAxisFormatter = zAxisConfig.get('labels.axisFormatter');
    const zScale = this.getValueAxis().getScale();
    const [min, max] = zScale.domain();
    const labels = [];
    const maxColorCnt = 10;
    if (cfg.get('setColorRange')) {
      colorsRange.forEach((range) => {
        const from = isFinite(range.from) ? zAxisFormatter(range.from) : range.from;
        const to = isFinite(range.to) ? zAxisFormatter(range.to) : range.to;
        labels.push(`${from} - ${to}`);
      });
    } else {
      if (max === min) {
        return [min.toString()];
      }
      for (let i = 0; i < colorsNumber; i++) {
        let label;
        let val = i / colorsNumber;
        let nextVal = (i + 1) / colorsNumber;
        if (percentageMode) {
          val = Math.ceil(val * 100);
          nextVal = Math.ceil(nextVal * 100);
          label = `${val}% - ${nextVal}%`;
        } else {
          val = val * (max - min) + min;
          nextVal = nextVal * (max - min) + min;
          if (max - min > maxColorCnt) {
            const valInt = Math.ceil(val);
            if (i === 0) {
              val = valInt === val ? val : valInt - 1;
            } else {
              val = valInt;
            }
            nextVal = Math.ceil(nextVal);
          }
          if (isFinite(val)) val = zAxisFormatter(val);
          if (isFinite(nextVal)) nextVal = zAxisFormatter(nextVal);
          label = `${val} - ${nextVal}`;
        }

        labels.push(label);
      }
    }

    return labels;
  }

  getHeatmapColors(cfg) {
    const invertColors = cfg.get('invertColors');
    const colorSchema = cfg.get('colorSchema');
    const labels = this.getHeatmapLabels(cfg);
    const colors = {};
    for (const i in labels) {
      if (labels[i]) {
        const val = invertColors ? 1 - i / labels.length : i / labels.length;
        colors[labels[i]] = getHeatmapColors(val, colorSchema);
      }
    }
    return colors;
  }

  addSquares(svg, data) {
    const xScale = this.getCategoryAxis().getScale();
    const yScale = this.handler.categoryAxes[1].getScale();
    const zScale = this.getValueAxis().getScale();
    const tooltip = this.baseChart.tooltip;
    const isTooltip = this.handler.visConfig.get('tooltip.show');
    const isHorizontal = this.getCategoryAxis().axisConfig.isHorizontal();
    const colorsNumber = this.handler.visConfig.get('colorsNumber');
    const setColorRange = this.handler.visConfig.get('setColorRange');
    const colorsRange = this.handler.visConfig.get('colorsRange');
    const color = this.handler.data.getColorFunc();
	    const labels = this.handler.visConfig.get('legend.labels1');
    if(!this.handler.visConfig.get('rowColors')){
        this.handler.visConfig.set('legend.labels',labels);
       }
   // const labels = this.handler.visConfig.get('legend.labels');
    const zAxisConfig = this.getValueAxis().axisConfig;
    const zAxisFormatter = zAxisConfig.get('labels.axisFormatter');
    const showLabels = zAxisConfig.get('labels.show');
    const overwriteLabelColor = zAxisConfig.get('labels.overwriteColor', false);
  const showDecimals = zAxisConfig.get('labels.showDecimals');
	  const decimalNumber = zAxisConfig.get('labels.decimalNumber');
    const layer = svg.append('g').attr('class', 'series');

    const squares = layer.selectAll('g.square').data(data.values);

    squares.exit().remove();

    let barWidth;
    if (this.getCategoryAxis().axisConfig.isTimeDomain()) {
      const { min, interval } = this.handler.data.get('ordered');
      const start = min;
      const end = moment(min).add(interval).valueOf();

      barWidth = xScale(end) - xScale(start);
      if (!isHorizontal) barWidth *= -1;
    }

 /*   function x(d) {
      return xScale(d.x);
    }

    function y(d) {
      return yScale(d.series);
    }

    const [min, max] = zScale.domain();*/
	     var min=0,max=0;
    if(this.handler.visConfig.get('rowColors')){
    data.values.sort(function (a, b) {
  	    return a.y - b.y;
  	});
  	 min = data.values[0].y;
  	    max = data.values[data.values.length - 1].y;
    	if(max == min){
    		min=min-1;
    	}}else{
    		[min, max] = zScale.domain();
    	}
    function getColorBucket(d) {
      let val = 0;
      if (setColorRange && colorsRange.length) {
        const bucket = _.find(colorsRange, (range) => {
          return range.from <= d.y && range.to > d.y;
        });
        return bucket ? colorsRange.indexOf(bucket) : -1;
      } else {
        if (isNaN(min) || isNaN(max)) {
          val = colorsNumber - 1;
        } else if (min === max) {
          val = 0;
        } else {
          val = (d.y - min) / (max - min); /* get val from 0 - 1 */
          val = Math.min(colorsNumber - 1, Math.floor(val * colorsNumber));
        }
      }
      if (d.y == null) {
        return -1;
      }
      return !isNaN(val) ? val : -1;
    }

    function label(d) {
      const colorBucket = getColorBucket(d);
      // colorBucket id should always GTE 0
      if (colorBucket < 0) d.hide = true;
      return labels[colorBucket];
    }

    function z(d) {
      if (label(d) === '') return 'transparent';
      return color(label(d));
    }

    const squareWidth = barWidth || xScale.rangeBand();
    const squareHeight = yScale.rangeBand();
    let isDotsize = false;
	  function x(d) {
		  //console.log("d...",d);
			if(d.z!=undefined){
				isDotsize = true;
			}
		  //console.log("isDotsize...",isDotsize);
		return xScale(d.x);
	  }
	  function y(d) {
		  //	console.log("d.series...",d.series);
		return yScale(d.series);
	  }
    squares.enter().append('g').attr('class', 'square');

    squares
      .append('rect')
      .attr('x', x)
      .attr('width', squareWidth)
      .attr('y', y)
      .attr('height', squareHeight)
      .attr('data-label', label)
      .attr('fill', z)
      .attr('style', 'cursor: pointer; stroke: black; stroke-width: 0.1px')
      .style('display', (d) => {
        return d.hide ? 'none' : 'initial';
      });

    // todo: verify that longest label is not longer than the barwidth
    // or barwidth is not smaller than textheight (and vice versa)
    //
	 if(isDotsize){
		var radius = Math.min(squareWidth,squareHeight)/2;
		 const radii =  this.baseChart.radii;
		 //console.log("radii....",radii);
		 const radiusRatio = this.seriesConfig.radiusRatio;
		 //console.log("radiusRatio....",radiusRatio);
		 const cr = (radiusRatio /100)*radius;
		 //const radiusStep = ((radii.max - radii.min) || (radii.max * 100)) / cr;//Math.pow(radiusRatio, 2);
		//console.log("radius....",radius);
		//console.log("radiusStep....",radiusStep);
		
		squares.append('circle')
		.attr('cx', function (d) {
			//console.dir("d..."+d);
			return xScale(d.x) + (squareWidth/2);
		  })
		.attr('r', function (d) {
			var rd = d.z/radii.max * 100;
			var crd = (rd /100)*cr;
			return crd;
		})
		.attr('cy', function (d) {
			//console.log("series2...",d.series);
		return yScale(d.series) + (squareHeight/2);
		})
		.attr('fill', '#F65314')
		.style('cursor', 'pointer')
		.style('opacity', '1');
		 
	};
    if (showLabels) {
      const rotate = zAxisConfig.get('labels.rotate');
      const rotateRad = (rotate * Math.PI) / 180;
      const cellPadding = 5;
      const maxLength =
        Math.min(
          Math.abs(squareWidth / Math.cos(rotateRad)),
          Math.abs(squareHeight / Math.sin(rotateRad))
        ) - cellPadding;
      const maxHeight =
        Math.min(
          Math.abs(squareWidth / Math.sin(rotateRad)),
          Math.abs(squareHeight / Math.cos(rotateRad))
        ) - cellPadding;

      let labelColor;
      if (overwriteLabelColor) {
        // If overwriteLabelColor is true, use the manual specified color
        labelColor = zAxisConfig.get('labels.color');
      } else {
        // Otherwise provide a function that will calculate a light or dark color
        labelColor = (d) => {
          const bgColor = z(d);
          const color = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(bgColor);
          return color && isColorDark(parseInt(color[1]), parseInt(color[2]), parseInt(color[3]))
            ? '#FFF'
            : '#222';
        };
      }

      let hiddenLabels = false;
     /* squares
        .append('text')
        .text((d) => zAxisFormatter(d.y))*/
		  let c=1;
     	if(showDecimals && (decimalNumber<4 && decimalNumber>0)){
				for(var i=1;i<=decimalNumber;i++){
					  c=c*10;
				  }
			}
    squares.append('text').style('cursor', 'pointer')
		//the below line returns filtered values to chart
		//s => s.length 
		.text(function(d){ 
		
			var zAf=null;
		//console.log(" zAf",zAf);
		//console.log("type zAf",typeof zAf);
			
			if(d.d != undefined){		
				zAf = zAxisFormatter(d.d);			 
		}else if(d.d == null && d.m != null){
			zAf = "-"
		}else if(d.m == null){            
          zAf = zAxisFormatter(d.y)
      }
			var pzAf = null;
          if( zAf != "-"){
						pzAf=parseFloat(zAf.replace(/,/g, ""));
					}else{
						pzAf="-";
					}
		//console.log(" pzAf",pzAf);
		//console.log("Math.round(zAf * c) / c",Math.round(pzAf * c) / c);
		if(c!=1){
			return Math.round(pzAf * c) / c;
		}
		if( pzAf != "-"){
			return Math.round(pzAf)
		}else{
			return pzAf
		}
		})
        .style('display', function (d) {
          const textLength = this.getBBox().width;
          const textHeight = this.getBBox().height;
          const textTooLong = textLength > maxLength;
          const textTooWide = textHeight > maxHeight;
          if (!d.hide && (textTooLong || textTooWide)) {
            hiddenLabels = true;
          }
          return d.hide || textTooLong || textTooWide ? 'none' : 'initial';
        })
        .style('dominant-baseline', 'central')
        .style('text-anchor', 'middle')
        .style('fill', labelColor)
        .attr('x', function (d) {
          const center = x(d) + squareWidth / 2;
          return center;
        })
        .attr('y', function (d) {
          const center = y(d) + squareHeight / 2;
          return center;
        })
        .attr('transform', function (d) {
          const horizontalCenter = x(d) + squareWidth / 2;
          const verticalCenter = y(d) + squareHeight / 2;
          return `rotate(${rotate},${horizontalCenter},${verticalCenter})`;
        });
      if (hiddenLabels) {
        this.baseChart.handler.alerts.show('Some labels were hidden due to size constraints');
      }
    }

    if (isTooltip) {
      squares.call(tooltip.render());
    }

    return squares.selectAll('rect');
  }

  /**
   * Renders d3 visualization
   *
   * @method draw
   * @returns {Function} Creates the line chart
   */
  draw() {
    const self = this;

    return function (selection) {
      selection.each(function () {
        const svg = self.chartEl.append('g');
        svg.data([self.chartData]);

        const squares = self.addSquares(svg, self.chartData);
        self.addCircleEvents(squares);

        self.events.emit('rendered', {
          chart: self.chartData,
        });

        return svg;
      });
    };
  }
}
