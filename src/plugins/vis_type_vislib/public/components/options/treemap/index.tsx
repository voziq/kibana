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
  ColorRanges,
  ColorSchemaOptions,
  NumberInputOption,
  SelectOption,
  SwitchOption,
  SetColorSchemaOptionsValue,
  SetColorRangeValue,
} from '../../../../../charts/public';
import { HeatmapVisParams } from '../../../treemap';
import { ValueAxis } from '../../../types';
import { LabelsPanel } from './labels_panel';

function TreemapOptions(props: VisOptionsProps<TreemapVisParams>) {
  const { stateParams, vis, uiState, setValue, setValidity, setTouched } = props;
  //const [valueAxis] = stateParams.valueAxes;
 // const isColorsNumberInvalid = stateParams.colorsNumber < 2 || stateParams.colorsNumber > 10;
 // const [isColorRangesValid, setIsColorRangesValid] = useState(false);



  /* useEffect(() => {
    setValidity(stateParams.setColorRange ? isColorRangesValid : !isColorsNumberInvalid);
  }, [stateParams.setColorRange, isColorRangesValid, isColorsNumberInvalid, setValidity]); */

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

        <BasicOptions {...props} />

    
      </EuiPanel>

      <EuiSpacer size="s" />

      <EuiPanel paddingSize="s">
        <EuiTitle size="xs">
          <h3>
            <FormattedMessage
              id="visTypeVislib.editors.heatmap.heatmapSettingsTitle"
              defaultMessage="Treemap settings"
            />
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
		    <SelectOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Sort Nodes',
        })}
        options={vis.type.editorConfig.collections.treemapSortOptions}
        paramName="treemapSortOption"
        value={stateParams.treemapSortOption}
        setValue={setValue}
      />
	   <EuiSpacer size="s" />
   <SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Show color schema',
        })}
        paramName="setColorRange"
        value={stateParams.setColorRange}
        setValue={setValue}
      />
        {stateParams.setColorRange && ( <ColorSchemaOptions
          colorSchema={stateParams.colorSchema}
          colorSchemas={vis.type.editorConfig.collections.colorSchemas}
          invertColors={stateParams.invertColors}
          uiState={uiState}
          setValue={setValue as SetColorSchemaOptionsValue}
        />
		)}
		
		
				{stateParams.setColorRange && (<SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Apply Group Color Schema',
        })}
        paramName="groupColors"
        value={stateParams.groupColors}
        setValue={setValue}
		/>)}
		
		
        <EuiSpacer size="s" />
		 <EuiSpacer size="s" />
		  <EuiSpacer size="s" />
		  
		{stateParams.showLabels && (<SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Show group1 labels',
        })}
        paramName="showGroupLabels"
        value={stateParams.showGroupLabels}
        setValue={setValue}
		/>)}
		 <EuiSpacer size="s" />
      	    {stateParams.showLabels && stateParams.showGroupLabels && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Set group1 label size',
        })}
        paramName="setGroupLabelSize"
        value={stateParams.setGroupLabelSize}
        setValue={setValue}
			/>)}
			
			<EuiSpacer size="s" />
		 <EuiSpacer size="s" />
		  <EuiSpacer size="s" />
		  
			{stateParams.showLabels && (<SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Show group2 labels',
        })}
        paramName="showGroup2Labels"
        value={stateParams.showGroup2Labels}
        setValue={setValue}
		/>)}
		 <EuiSpacer size="s" />
      	    {stateParams.showLabels && stateParams.showGroup2Labels && (<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Set group2 label size',
        })}
        paramName="setGroup2LabelSize"
        value={stateParams.setGroup2LabelSize}
        setValue={setValue}
			/>)}
			
			 <EuiSpacer size="s" />
			{stateParams.showLabels && stateParams.showGroup2Labels && (<SelectOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Group2 Label position',
        })}
		options={vis.type.editorConfig.collections.groupAlignment}
        paramName="setGroup2Position"
        value={stateParams.setGroup2Position}
        setValue={setValue}
			/>)}
			
			
			
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
			
      </EuiPanel>

      <EuiSpacer size="s" />

      
    </>
  );
}

export { TreemapOptions };