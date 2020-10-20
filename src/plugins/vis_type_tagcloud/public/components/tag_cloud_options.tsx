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

import React from 'react';
import { EuiPanel } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { VisOptionsProps } from '../../../vis_default_editor/public';
import { ValidatedDualRange } from '../../../kibana_react/public';
import { SelectOption, SwitchOption,ColorRanges } from '../../../charts/public';
import { TagCloudVisParams } from '../types';

function TagCloudOptions({ stateParams, setValue, vis ,setTouched}: VisOptionsProps<TagCloudVisParams>) {
  const handleFontSizeChange = ([minFontSize, maxFontSize]: [string | number, string | number]) => {
    setValue('minFontSize', Number(minFontSize));
    setValue('maxFontSize', Number(maxFontSize));
  };
  const fontSizeRangeLabel = i18n.translate('visTypeTagCloud.visParams.fontSizeLabel', {
    defaultMessage: 'Font size range in pixels',
  });

  return (
    <EuiPanel paddingSize="s">
      <SelectOption
        label={i18n.translate('visTypeTagCloud.visParams.textScaleLabel', {
          defaultMessage: 'Text scale',
        })}
        options={vis.type.editorConfig.collections.scales}
        paramName="scale"
        value={stateParams.scale}
        setValue={setValue}
      />

      <SelectOption
        label={i18n.translate('visTypeTagCloud.visParams.orientationsLabel', {
          defaultMessage: 'Orientations',
        })}
        options={vis.type.editorConfig.collections.orientations}
        paramName="orientation"
        value={stateParams.orientation}
        setValue={setValue}
      />

      <ValidatedDualRange
        allowEmptyRange={false}
        aria-label={fontSizeRangeLabel}
        compressed={true}
        fullWidth={true}
        label={fontSizeRangeLabel}
        max={100}
        min={1}
        value={[stateParams.minFontSize, stateParams.maxFontSize]}
        onChange={handleFontSizeChange}
        showInput
      />

      <SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.showLabelToggleLabel', {
          defaultMessage: 'Show label',
        })}
        paramName="showLabel"
        value={stateParams.showLabel}
        setValue={setValue}
      />
	    <SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.timePeriodComparisonLabel', {
          defaultMessage: 'Time Period Comparison',
        })}
        paramName="sentiment"
        value={stateParams.sentiment}
        setValue={setValue}
      />
  <SelectOption
        label={i18n.translate('visTypeTagCloud.visParams.PeriodLabel', {
          defaultMessage: 'Period',
        })}
        options={vis.type.editorConfig.collections.periods}
        paramName="period"
        value={stateParams.period}
        setValue={setValue}
      />
	    <SelectOption
        label={i18n.translate('visTypeTagCloud.visParams.colorSchemaLabel', {
          defaultMessage: 'Color schema',
        })}
        options={vis.type.editorConfig.collections.colorSchemas}
        paramName="colorSchema"
        value={stateParams.colorSchema}
        setValue={setValue}
      />
	      <SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.reverseColorSchemaLabel', {
          defaultMessage: 'Reverse Color Schema',
        })}
        paramName="invertColors"
        value={stateParams.invertColors}
        setValue={setValue}
      />
	        <SwitchOption
        label={i18n.translate('visTypeTagCloud.visParams.useCustomRangesLabel', {
          defaultMessage: 'Use custom ranges',
        })}
        paramName="setColorRange"
        value={stateParams.setColorRange}
        setValue={setValue}
      />
	       <ColorRanges
    data-test-subj= "visTypeTagCloudColorRange"
    colorsRange= {stateParams.colorsRange}
    setValue= {setValue}
    setTouched= {setTouched}
      />
    </EuiPanel>
  );
}

export { TagCloudOptions };
