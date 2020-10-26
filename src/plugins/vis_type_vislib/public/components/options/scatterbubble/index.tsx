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

import React, { useCallback, useEffect, useState } from 'react';

import { EuiPanel, EuiSpacer, EuiTitle } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n/react';

import { VisOptionsProps } from 'src/plugins/vis_default_editor/public';
import {
  BasicOptions,
  SwitchOption,
  NumberInputOption,
  TextInputOption,
} from '../../../../../charts/public';
import { catterBubbleVisParams } from '../../../scatterbubble';


function ScatterBubbleOptions(props: VisOptionsProps<catterBubbleVisParams>) {
  const { stateParams, setValue } = props;
  


  return (
    <>
      <EuiPanel paddingSize="s">
        <EuiTitle size="xs">
          <h3>
            <FormattedMessage
              id="visTypeVislib.editors.heatmap.basicSettingsTitle"
              defaultMessage="Basic settings"
            />
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
		
		     <SwitchOption
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.showLabelsLabel', {
          defaultMessage: 'Show labels',
        })}
        paramName="showLabels"
        value={stateParams.showLabels}
     setValue={setValue}
      />
	  
	  <NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Set Label Font size',
        })}
        paramName="setLabelSize"
        value={stateParams.setLabelSize}
        setValue={setValue}
			/>

        <BasicOptions {...props} />

    
      </EuiPanel>

      <EuiSpacer size="s" />
      <EuiPanel paddingSize="s">
        <EuiTitle size="xs">
          <h3>
            <FormattedMessage
              id="visTypeVislib.editors.heatmap.heatmapSettingsTitle"
              defaultMessage="Scatter Bubble settings"
            />
          </h3>
        </EuiTitle>
       
	   <EuiSpacer size="s" />
   <SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Show Mid-Point on Axes',
        })}
        paramName="showMid"
        value={stateParams.showMid}
        setValue={setValue}
      />
        {stateParams.showMid && (  <SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Show Label on Mid-Points',
        })}
        paramName="setMidLabels"
        value={stateParams.setMidLabels}
        setValue={setValue}
      />
		)}
		
		{stateParams.showMid && stateParams.setMidLabels && (<TextInputOption
       
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.subTextLabel', {
          defaultMessage: 'X-Mid Label',
        })}
        paramName="xMidLabel"
        value={stateParams.xMidLabel}
         setValue={setValue}
/>)}
	
				{stateParams.showMid && stateParams.setMidLabels && (<TextInputOption
       
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.subTextLabel', {
          defaultMessage: 'Y-Mid Label',
        })}
        paramName="yMidLabel"
        value={stateParams.yMidLabel}
         setValue={setValue}
/>)}	

	 <EuiSpacer size="s" />
	  <EuiSpacer size="s" />
	   <EuiSpacer size="s" />
	    <EuiSpacer size="s" />
	 
			 <SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Show Average on Axes',
        })}
        paramName="showAvg"
        value={stateParams.showAvg}
        setValue={setValue}
      />
			
	 {stateParams.showAvg && (  <SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Show Label on Average',
        })}
        paramName="setAvgLabels"
        value={stateParams.setAvgLabels}
        setValue={setValue}
      />
		)}
		
				{stateParams.showAvg && stateParams.setAvgLabels && (<TextInputOption
       
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.subTextLabel', {
          defaultMessage: 'X-Avg Label',
        })}
        paramName="xAvgLabel"
        value={stateParams.xAvgLabel}
         setValue={setValue}
/>)}
	
				{stateParams.showAvg && stateParams.setAvgLabels && (<TextInputOption
       
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.subTextLabel', {
          defaultMessage: 'Y-Avg Label',
        })}
        paramName="yAvgLabel"
        value={stateParams.yAvgLabel}
         setValue={setValue}
/>)}
		
		<EuiSpacer size="s" />
	  <EuiSpacer size="s" />
	   <EuiSpacer size="s" />
	    <EuiSpacer size="s" />
		
		
					 <SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Show Median on Axes',
        })}
        paramName="showMedian"
        value={stateParams.showMedian}
        setValue={setValue}
      />
			
	 {stateParams.showMedian && (  <SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Show Label on Medians',
        })}
        paramName="setMedianLabels"
        value={stateParams.setMedianLabels}
        setValue={setValue}
      />
		)}
		
				{stateParams.showMedian && stateParams.setMedianLabels && (<TextInputOption
       
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.subTextLabel', {
          defaultMessage: 'X-Median Label',
        })}
        paramName="xMedianLabel"
        value={stateParams.xMedianLabel}
         setValue={setValue}
/>)}
	
				{stateParams.showMedian && stateParams.setMedianLabels && (<TextInputOption
       
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.subTextLabel', {
          defaultMessage: 'Y-Median Label',
        })}
        paramName="yMedianLabel"
        value={stateParams.yMedianLabel}
         setValue={setValue}
/>)}

<EuiSpacer size="s" />
	  <EuiSpacer size="s" />
	   <EuiSpacer size="s" />
	    <EuiSpacer size="s" />
		
		<SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Show Goals on Axes',
        })}
        paramName="setGoals"
        value={stateParams.setGoals}
        setValue={setValue}
      />
			
	
		
				{stateParams.setGoals && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'X-Goal',
        })}
        paramName="xGoal"
        value={stateParams.xGoal}
        setValue={setValue}
			/>)}
	
				{stateParams.setGoals && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Y-Goal',
        })}
        paramName="yGoal"
        value={stateParams.yGoal}
        setValue={setValue}
			/>)}
			
			
			{stateParams.setGoals && (<SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Show Label on Goals',
        })}
        paramName="setGoalLabels"
        value={stateParams.setGoalLabels}
        setValue={setValue}
			/>)}
			
			
			
					{stateParams.setGoals && stateParams.setGoalLabels && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'X-Goal Label',
        })}
        paramName="xGoalLabel"
        value={stateParams.xGoalLabel}
        setValue={setValue}
			/>)}
	
				{stateParams.setGoals && stateParams.setGoalLabels && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Y-Goal Label',
        })}
        paramName="yGoalLabel"
        value={stateParams.yGoalLabel}
        setValue={setValue}
			/>)}
		
		
		<EuiSpacer size="s" />
	  <EuiSpacer size="s" />
	   <EuiSpacer size="s" />
	    <EuiSpacer size="s" />
		
		<SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Set X-Axis Extents',
        })}
        paramName="setXExtents"
        value={stateParams.setXExtents}
        setValue={setValue}
      />
			
	
		
				{stateParams.setXExtents && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'X-Max',
        })}
        paramName="max"
        value={stateParams.xAxis.max}
        setValue={(paramName, value) =>
              setValue('xAxis', { ...stateParams.xAxis, [paramName]: value })
            }
			/>)}
	
				{stateParams.setXExtents && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'X-Min',
        })}
         paramName="min"
        value={stateParams.xAxis.min}
        setValue={(paramName, value) =>
              setValue('xAxis', { ...stateParams.xAxis, [paramName]: value })
            }
			/>)}
			
			<EuiSpacer size="s" />
	  <EuiSpacer size="s" />
	   <EuiSpacer size="s" />
	    <EuiSpacer size="s" />
		
			<SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Set Y-Axis Extents',
        })}
        paramName="setYExtents"
        value={stateParams.setYExtents}
        setValue={setValue}
      />
			
	
		
				{stateParams.setYExtents && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Y-Max',
        })}
        paramName="max"
        value={stateParams.yAxis.max}
        setValue={(paramName, value) =>
              setValue('yAxis', { ...stateParams.xAxis, [paramName]: value })
            }
			/>)}
	
				{stateParams.setYExtents && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Y-Min',
        })}
         paramName="min"
        value={stateParams.yAxis.min}
        setValue={(paramName, value) =>
              setValue('yAxis', { ...stateParams.xAxis, [paramName]: value })
            }
			/>)}
			
			
				<EuiSpacer size="s" />
	  <EuiSpacer size="s" />
	   <EuiSpacer size="s" />
	    <EuiSpacer size="s" />
		
				<SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Scale Axis to Data Bounds',
        })}
        paramName="defaultExtents"
		 disabled={stateParams.setYExtents}
        value={stateParams.defaultExtents}
        setValue={setValue}
      />
	  
	  		<EuiSpacer size="s" />
	  <EuiSpacer size="s" />
	   <EuiSpacer size="s" />
	    <EuiSpacer size="s" />
		
		<SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'SetMinDocCount',
        })}
        paramName="setDocCount"
        value={stateParams.setDocCount}
        setValue={setValue}
		/>
		
		
		   {stateParams.setDocCount  && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Count Value',
        })}
        paramName="docMinCount"
        value={stateParams.docMinCount}
        setValue={setValue}
			/>)}
			
					<EuiSpacer size="s" />
	  <EuiSpacer size="s" />
	   <EuiSpacer size="s" />
	    <EuiSpacer size="s" />
		
		
		<SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Set Node Extents',
        })}
        paramName="setMaxMinExtents"
        value={stateParams.setMaxMinExtents}
        setValue={setValue}
      />
			
	
		
				{stateParams.setMaxMinExtents && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Max Node Size',
        })}
        paramName="max"
        value={stateParams.node.max}
        setValue={(paramName, value) =>
              setValue('node', { ...stateParams.node, [paramName]: value })
            }
			/>)}
	
				{stateParams.setMaxMinExtents && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Min Node Size',
        })}
         paramName="min"
        value={stateParams.node.min}
        setValue={(paramName, value) =>
              setValue('node', { ...stateParams.node, [paramName]: value })
            }
			/>)}
		
      </EuiPanel>
    

      <EuiSpacer size="s" />

      
    </>
  );
}

export { ScatterBubbleOptions };
