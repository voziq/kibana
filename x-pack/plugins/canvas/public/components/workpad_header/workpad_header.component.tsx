/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
// @ts-expect-error no @types definition
import { Shortcuts } from 'react-shortcuts';
import { EuiFlexItem, EuiFlexGroup, EuiButtonIcon, EuiToolTip , EuiFormRow, EuiButtonEmpty} from '@elastic/eui';
import { ComponentStrings } from '../../../i18n';
import { ToolTipShortcut } from '../tool_tip_shortcut/';
import { RefreshControl } from './refresh_control';
// @ts-expect-error untyped local
import { FullscreenControl } from './fullscreen_control';
import { EditMenu } from './edit_menu';
import { ElementMenu } from './element_menu';
import { ShareMenu } from './share_menu';
import { ViewMenu } from './view_menu';
import { CommitFn } from '../../../types';

import {
  MAX_ZOOM_LEVEL,
  MIN_ZOOM_LEVEL,
  CONTEXT_MENU_TOP_BORDER_CLASSNAME,
} from '../../../../common/lib/constants';

const { WorkpadHeader: strings } = ComponentStrings;

export interface Props {
  isWriteable: boolean;
  canUserWrite: boolean;
  commit: CommitFn;
  onSetWriteable?: (writeable: boolean) => void;
   /**
   * zooms to fit entire workpad into view
   */
  fitToWindow: () => void;
  /**
   * current workpad zoom level
   */
  zoomScale: number;
  
  setZoomScale: (scale: number) => void;
}

export const WorkpadHeader: FunctionComponent<Props> = ({
  isWriteable,
  canUserWrite,
  commit,
  onSetWriteable = () => {},
  fitToWindow,
  zoomScale,
  setZoomScale,
}) => {
  const toggleWriteable = () => onSetWriteable(!isWriteable);

  const keyHandler = (action: string) => {
    if (action === 'EDITING') {
      toggleWriteable();
    }
  };

  const fullscreenButton = ({ toggleFullscreen }: { toggleFullscreen: () => void }) => (
    <EuiToolTip
      position="bottom"
      content={
        <span>
          {strings.getFullScreenTooltip()}{' '}
          <ToolTipShortcut namespace="PRESENTATION" action="FULLSCREEN" />
        </span>
      }
    >
      <EuiButtonIcon
        iconType="fullScreen"
        aria-label={strings.getFullScreenButtonAriaLabel()}
        onClick={toggleFullscreen}
      />
    </EuiToolTip>
  );

  const getEditToggleToolTipText = () => {
    if (!canUserWrite) {
      return strings.getNoWritePermissionTooltipText();
    }

    const content = isWriteable
      ? strings.getHideEditControlTooltip()
      : strings.getShowEditControlTooltip();

    return content;
  };

  const getEditToggleToolTip = ({ textOnly } = { textOnly: false }) => {
    const content = getEditToggleToolTipText();

    if (textOnly) {
      return content;
    }

    return (
      <span>
        {content} <ToolTipShortcut namespace="EDITOR" action="EDITING" />
      </span>
    );
  };

  return (
    <EuiFlexGroup
      gutterSize="none"
      alignItems="center"
      justifyContent="spaceBetween"
      className="canvasLayout__stageHeaderInner"
    >
      <EuiFlexItem grow={false}>
        <EuiFlexGroup alignItems="center" gutterSize="none">
          {isWriteable && (
            <EuiFlexItem grow={false}>
              <ElementMenu />
            </EuiFlexItem>
          )}
          <EuiFlexItem grow={false}>
            <ViewMenu />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EditMenu  commit={commit} />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <ShareMenu />
          </EuiFlexItem>
          
                   <EuiFlexItem grow={false}>
   
              <EuiButtonEmpty size="xs"  onClick={fitToWindow}>
              {strings.getFitWindow()}
            </EuiButtonEmpty>
        
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFlexGroup alignItems="center" gutterSize="s">
      
          <EuiFlexItem grow={false}>
            <RefreshControl />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <FullscreenControl>{fullscreenButton}</FullscreenControl>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

WorkpadHeader.propTypes = {
  isWriteable: PropTypes.bool,
  commit: PropTypes.func,
  onSetWriteable: PropTypes.func,
  canUserWrite: PropTypes.bool,
  zoomScale: PropTypes.number,
  fitToWindow: PropTypes.func,
   setZoomScale: PropTypes.func,
  
};
