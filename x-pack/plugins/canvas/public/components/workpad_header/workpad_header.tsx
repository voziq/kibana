/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
//import { canUserWrite } from '../../state/selectors/app';
import { getSelectedPage, isWriteable } from '../../state/selectors/workpad';
//import { setWriteable } from '../../state/actions/workpad';
import { State , CanvasWorkpadBoundingBox } from '../../../types';
import { WorkpadHeader as Component, Props as ComponentProps } from './workpad_header.component';





import { compose, withHandlers } from 'recompose';



// @ts-expect-error untyped local
//import { fetchAllRenderables } from '../../state/actions/elements';
// @ts-expect-error untyped local
import { setZoomScale, setFullscreen, selectToplevelNodes } from '../../state/actions/transient';
import {
  setWriteable,
  setRefreshInterval,
  enableAutoplay,
  setAutoplayInterval,
} from '../../state/actions/workpad';
import { getZoomScale, canUserWrite } from '../../state/selectors/app';
import {
  getWorkpadBoundingBox,
  getWorkpadWidth,
  getWorkpadHeight,
  
  getRefreshInterval,
  getAutoplay,
} from '../../state/selectors/workpad';
//import { ViewMenu as Component, Props as ComponentProps } from './view_menu.component';
import { getFitZoomScale } from './view_menu/lib/get_fit_zoom_scale';


interface StateProps {
  zoomScale: number;
  boundingBox: CanvasWorkpadBoundingBox;
  workpadWidth: number;
  workpadHeight: number;
  isWriteable: boolean;
}

interface DispatchProps {
  setWriteable: (isWorkpadWriteable: boolean) => void;
  setZoomScale: (scale: number) => void;
  setFullscreen: (showFullscreen: boolean) => void;
}

const mapStateToProps = (state: State) => ({
  isWriteable: isWriteable(state) && canUserWrite(state),
  canUserWrite: canUserWrite(state),
  selectedPage: getSelectedPage(state),
    zoomScale: getZoomScale(state),
    boundingBox: getWorkpadBoundingBox(state),
    workpadWidth: getWorkpadWidth(state),
    workpadHeight: getWorkpadHeight(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetWriteable: (isWorkpadWriteable: boolean) => dispatch(setWriteable(isWorkpadWriteable)),
   setZoomScale: (scale: number) => dispatch(setZoomScale(scale)),
});








const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: ComponentProps
): ComponentProps => {
  const { boundingBox, workpadWidth, workpadHeight, ...remainingStateProps } = stateProps;

  return {
    ...remainingStateProps,
    ...dispatchProps,
    ...ownProps,
    toggleWriteable: () => dispatchProps.setWriteable(!stateProps.isWriteable),
    enterFullscreen: () => dispatchProps.setFullscreen(true),
    fitToWindow: () =>
      dispatchProps.setZoomScale(getFitZoomScale(boundingBox, workpadWidth, workpadHeight)),
  };
};




export const WorkpadHeader = connect(mapStateToProps, mapDispatchToProps,mergeProps)(Component);
