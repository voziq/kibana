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
import { RadarVisParams } from '../../../bubble';


function RadarOptions(props: VisOptionsProps<RadarVisParams>) {
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
        paramName="show"
        value={stateParams.labels.show}
      setValue={(paramName, value) =>
              setValue('labels', { ...stateParams.labels, [paramName]: value })
            }
      />

        <BasicOptions {...props} />
		
		
		<SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Set Y-Axis Extents',
        })}
        paramName="setRadialMin"
        value={stateParams.setRadialMin}
        setValue={setValue}
      />
			
	
		
				{stateParams.setRadialMin && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Y-Max',
        })}
        paramName="max"
        value={stateParams.radial.max}
        setValue={(paramName, value) =>
              setValue('radial', { ...stateParams.radial, [paramName]: value })
            }
			/>)}
	
				{stateParams.setRadialMin && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Y-Min',
        })}
         paramName="min"
        value={stateParams.radial.min}
        setValue={(paramName, value) =>
              setValue('radial', { ...stateParams.radial, [paramName]: value })
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
        paramName="defaultYExtents"
		 disabled={stateParams.setRadialMin}
        value={stateParams.defaultYExtents}
        setValue={setValue}
      />
	  
	  
	  <SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Set Minimum Count',
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
        value={stateParams.docCount.docMinCount}
         setValue={(paramName, value) =>
              setValue('docCount', { ...stateParams.docCount, [paramName]: value })
            }
			/>)}
	  


  <SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Custom Ranges',
        })}
        paramName="setMaxMin"
        value={stateParams.setMaxMin}
        setValue={setValue}
		/>
		
		
		{stateParams.setMaxMin &&  (<TextInputOption
       
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.subTextLabel', {
          defaultMessage: 'Min',
        })}
        paramName="minVal"
        value={stateParams.maxmin.minVal}
         setValue={(paramName, value) =>
              setValue('maxmin', { ...stateParams.maxmin, [paramName]: value })
            }
/>)}
{stateParams.setMaxMin && (<TextInputOption
       
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.subTextLabel', {
          defaultMessage: 'Max',
        })}
        paramName="maxVal"
        value={stateParams.maxmin.maxVal}
        setValue={(paramName, value) =>
              setValue('maxmin', { ...stateParams.maxmin, [paramName]: value })
            }
/>)}


<SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Set marker Value',
        })}
        paramName="setMarkerValue"		
		disabled={!stateParams.setMaxMin}
        value={!stateParams.setMaxMin ? false : stateParams.setMarkerValue}
        setValue={setValue}
		/>
		
		
		{stateParams.setMarkerValue && (<TextInputOption
       
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.subTextLabel', {
          defaultMessage: 'Max',
        })}
        paramName="docMarkerCount"
        value={stateParams.docmarker.docMarkerCount}
				 disabled={!stateParams.setMarkerValue || !stateParams.setMaxMin}
        setValue={(paramName, value) =>
              setValue('docmarker', { ...stateParams.docmarker, [paramName]: value })
            }
/>)}
        
      </EuiPanel>

      <EuiSpacer size="s" />

    

      <EuiSpacer size="s" />

      
    </>
  );
}

export { RadarOptions };
