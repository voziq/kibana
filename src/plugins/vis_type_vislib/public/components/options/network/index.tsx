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
  TextInputOption,
} from '../../../../../charts/public';
import { NetworkVisParams } from '../../../network';
import { ValueAxis } from '../../../types';
import { LabelsPanel } from './labels_panel';

function NetworkOptions(props: VisOptionsProps<TreemapVisParams>) {
  const { stateParams, vis, uiState, setValue } = props;
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
              defaultMessage="Network settings"
            />
          </h3>          
        </EuiTitle>
        <EuiSpacer size="s" />
      <EuiTitle size="xs">
          <h3>
            <FormattedMessage
              id="visTypeVislib.editors.heatmap.basicRelationTitle"
              defaultMessage="Relationship style"
            />
          </h3>        
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiTitle size="xs">
          <h3>
            <FormattedMessage
              id="visTypeVislib.editors.heatmap.basicSizeTitle"
              defaultMessage="Size"
            />
          </h3>        
        </EuiTitle>
        <EuiSpacer size="s" />        
<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.fontSize', {
          defaultMessage: 'Font Size',
        })}
        paramName="fontSize"
        value={stateParams.fontSize}
        setValue={setValue}
			/>
<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.maxNodeSize', {
          defaultMessage: 'Max Node Size',
        })}
        paramName="maxNodeSize"
        value={stateParams.maxNodeSize}
        setValue={setValue}
			/>
<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.minNodeSize', {
          defaultMessage: 'Min Node Size',
        })}
        paramName="minNodeSize"
        value={stateParams.minNodeSize}
        setValue={setValue}
			/>
<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.maxEdgeSize', {
          defaultMessage: 'Max Edge Width',
        })}
        paramName="maxEdgeSize"
        value={stateParams.maxEdgeSize}
        setValue={setValue}
			/>
<NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.minEdgeSize', {
          defaultMessage: 'Min Edge Width',
        })}
        paramName="minEdgeSize"
        value={stateParams.minEdgeSize}
        setValue={setValue}
			/>
<EuiSpacer size="s" />
<EuiTitle size="xs">
          <h3>
            <FormattedMessage
              id="visTypeVislib.editors.heatmap.basicShapesTitle"
              defaultMessage="Shapes"
            />
          </h3>        
        </EuiTitle>
        <EuiSpacer size="s" />
        <SelectOption
        label={i18n.translate('visTypeTagCloud.visParams.Node', {
          defaultMessage: 'Node',
        })}
		options={vis.type.editorConfig.collections.firstNodeShapes}
        paramName="shapeFirstNode"
        value={stateParams.shapeFirstNode}
        setValue={setValue}
			/>
      <SelectOption
        label={i18n.translate('visTypeTagCloud.visParams.secondNode', {
          defaultMessage: 'Second Node',
        })}
		options={vis.type.editorConfig.collections.secondNodeShapes}
        paramName="shapeSecondNode"
        value={stateParams.shapeSecondNode}
        setValue={setValue}
			/>
      <NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.nodeBoarderWidth', {
          defaultMessage: 'Node Boarder Width',
        })}
        paramName="nodeBoarderWidth"
        value={stateParams.nodeBoarderWidth}
        setValue={setValue}
			/>
      <EuiSpacer size="s" />
      <EuiTitle size="xs">
          <h3>
            <FormattedMessage
              id="visTypeVislib.editors.heatmap.directionalEdgesTitle"
              defaultMessage="Directional Edges"
            />
          </h3>        
        </EuiTitle>
        <EuiSpacer size="s" />
         <SwitchOption
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.directionalEdges', {
          defaultMessage: 'Directional Edges',
        })}
        paramName="displayArrow"

			value={stateParams.displayArrow}
        setValue={setValue}
      />
        <SelectOption
        label={i18n.translate('visTypeTagCloud.visParams.endpointPosition', {
          defaultMessage: 'Endpoint position:',
        })}
		options={vis.type.editorConfig.collections.endPoints}
        paramName="posArrow"
        value={stateParams.posArrow}
        setValue={setValue}
			/>
      <SelectOption
        label={i18n.translate('visTypeTagCloud.visParams.endpointType', {
          defaultMessage: 'Endpoint Type:',
        })}
		options={vis.type.editorConfig.collections.endPointTypes}
        paramName="shapeArrow"
        value={stateParams.shapeArrow}
        setValue={setValue}
			/>
      <NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.scaleArrow', {
          defaultMessage: 'Scale Factor:',
        })}
        paramName="scaleArrow"
        value={stateParams.scaleArrow}
        setValue={setValue}
			/>
      <SelectOption
        label={i18n.translate('visTypeTagCloud.visParams.smoothTypes', {
          defaultMessage: 'Endpoint Type:',
        })}
		options={vis.type.editorConfig.collections.smoothTypes}
        paramName="smoothType"
        value={stateParams.smoothType}
        setValue={setValue}
			/> 
      <EuiSpacer size="s" />
      <EuiTitle size="xs">
          <h3>
            <FormattedMessage
              id="visTypeVislib.editors.heatmap.extra"
              defaultMessage="Extra"
            />
          </h3>        
        </EuiTitle>
        <EuiSpacer size="s" />
        <SwitchOption
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.showLabels', {
          defaultMessage: 'Show labels',
        })}
        paramName="showLabels"

			value={stateParams.showLabels}
        setValue={setValue}
      />
      <SwitchOption
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.showPopup', {
          defaultMessage: 'Show Popup',
        })}
        paramName="showPopup"

			value={stateParams.showPopup}
        setValue={setValue}
      />
      <SwitchOption
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.showColorLegend', {
          defaultMessage: 'Show Color Legend (Node Color selected)',
        })}
        paramName="showColorLegend"

			value={stateParams.showColorLegend}
        setValue={setValue}
      />
      <SwitchOption
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.nodePhysics', {
          defaultMessage: 'Nodes Acting like Springs',
        })}
        paramName="nodePhysics"

			value={stateParams.nodePhysics}
        setValue={setValue}
      />
      <EuiSpacer size="s" />
      <EuiTitle size="xs">
          <h3>
            <FormattedMessage
              id="visTypeVislib.editors.heatmap.networkConstants"
              defaultMessage="Network constants"
            />
          </h3>        
        </EuiTitle>
        <EuiSpacer size="s" />
        <NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.gravitationalConstant', {
          defaultMessage: 'Attraction Force',
        })}
        paramName="gravitationalConstant"
        value={stateParams.gravitationalConstant}
        setValue={setValue}
			/>
      <NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.springConstant', {
          defaultMessage: 'Spring Force',
        })}
        paramName="springConstant"
        value={stateParams.springConstant}
        setValue={setValue}
			/>     
      <EuiSpacer size="s" />
      <EuiTitle size="xs">
          <h3>
            <FormattedMessage
              id="visTypeVislib.editors.heatmap.showNodesBelow"
              defaultMessage="Don't show nodes below this value:"
            />
          </h3>        
        </EuiTitle>
        <EuiSpacer size="s" />
        <NumberInputOption
        label={i18n.translate('visTypeTagCloud.visParams.minCutMetricSizeNode', {
          defaultMessage: 'Node Size',
        })}
        paramName="minCutMetricSizeNode"
        value={stateParams.minCutMetricSizeNode}
        setValue={setValue}
			/>
      <EuiSpacer size="s" /> 
      </EuiPanel>



      
    </>
  );
}

export { NetworkOptions };