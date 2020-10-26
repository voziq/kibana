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
} from '../../../../../charts/public';
import { SankeyVisParams } from '../../../sankey';


function SankeyOptions(props: VisOptionsProps<SankeyVisParams>) {
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

        <BasicOptions {...props} />

         <SwitchOption
        label={i18n.translate('visTypeVislib.controls.gaugeOptions.showLabelsLabel', {
          defaultMessage: 'Show labels',
        })}
        paramName="showLabels"
        value={stateParams.showLabels}
     setValue={setValue}
      />
      </EuiPanel>

      <EuiSpacer size="s" />

    

      <EuiSpacer size="s" />

      
    </>
  );
}

export { SankeyOptions };
