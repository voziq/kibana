"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkOptions = NetworkOptions;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _common = require("plugins/kbn_vislib_vis_types/components/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function NetworkOptions(props) {
  var stateParams = props.stateParams,
  	   vis = props.vis,
      setValue = props.setValue;

  var setLabels = function setLabels(paramName, value) {
    return setValue('labels', _objectSpread({}, stateParams.labels, _defineProperty({}, paramName, value)));
  };

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_eui.EuiPanel, {
      paddingSize: "s"
  }, _react["default"].createElement(_eui.EuiTitle, {
          size: "xs"
      }, _react["default"].createElement("h3", null, _react["default"].createElement(_react2.FormattedMessage, {
                  id: "kbnVislibVisTypes.editors.pie.pieSettingsTitle",
                  defaultMessage: "Network settings"
              }))), _react["default"].createElement(_eui.EuiSpacer, {
          size: "s"
      }),_react["default"].createElement(_eui.EuiTitle, {
          size: "xs"
      }, _react["default"].createElement("h3", null, _react["default"].createElement(_react2.FormattedMessage, {
                  id: "kbnVislibVisTypes.editors.pie.pieSettingsTitle",
                  defaultMessage: "Relationship style"
              }))), _react["default"].createElement(_eui.EuiSpacer, {
          size: "s"
      }),_react["default"].createElement(_eui.EuiTitle, {
          size: "xs"
      }, _react["default"].createElement("h3", null, _react["default"].createElement(_react2.FormattedMessage, {
                  id: "kbnVislibVisTypes.editors.pie.pieSettingsTitle",
                  defaultMessage: "Size"
              }))), _react["default"].createElement(_eui.EuiSpacer, {
          size: "s"
      }),_react.default.createElement(_common.NumberInputOption, {  
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.fontSize', {
defaultMessage: 'Font Size'
}),
paramName: "fontSize",
value: stateParams.fontSize,
setValue: setValue
}),_react.default.createElement(_common.NumberInputOption, {  
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.maxNodeSize', {
defaultMessage: 'Max Node Size'
}),
paramName: "maxNodeSize",
value: stateParams.maxNodeSize,
setValue: setValue
}),_react.default.createElement(_common.NumberInputOption, {  
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.minNodeSize', {
defaultMessage: 'Min Node Size'
}),
paramName: "minNodeSize",
value: stateParams.minNodeSize,
setValue: setValue
}),_react.default.createElement(_common.NumberInputOption, {  
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.maxEdgeSize', {
defaultMessage: 'Max Edge Width'
}),
paramName: "maxEdgeSize",
value: stateParams.maxEdgeSize,
setValue: setValue
}),_react.default.createElement(_common.NumberInputOption, {  
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.minEdgeSize', {
defaultMessage: 'Min Edge Width'
}),
paramName: "minEdgeSize",
value: stateParams.minEdgeSize,
setValue: setValue
}),_react["default"].createElement(_eui.EuiTitle, {
          size: "xs"
      }, _react["default"].createElement("h3", null, _react["default"].createElement(_react2.FormattedMessage, {
                  id: "kbnVislibVisTypes.editors.pie.pieSettingsTitle",
                  defaultMessage: "Shapes"
              }))), _react["default"].createElement(_eui.EuiSpacer, {
          size: "s"
      }), _react.default.createElement(_common.SelectOption, {
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmap_dn.firstNodeShapes', {
defaultMessage: 'Node:'
}),
options: vis.type.editorConfig.collections.firstNodeShapes,
paramName: "shapeFirstNode",
value: stateParams.shapeFirstNode,
setValue: setValue
}), _react.default.createElement(_common.SelectOption, {
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmap_dn.secondNodeShapes', {
defaultMessage: 'Second Node:'
}),
options: vis.type.editorConfig.collections.secondNodeShapes,
paramName: "shapeSecondNode",
value: stateParams.shapeSecondNode,
setValue: setValue
}),_react.default.createElement(_common.NumberInputOption, {  
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.nodeBoarderWidth', {
defaultMessage: 'Node Boarder Width'
}),
paramName: "nodeBoarderWidth",
value: stateParams.nodeBoarderWidth,
setValue: setValue
}),_react["default"].createElement(_eui.EuiTitle, {
          size: "xs"
      }, _react["default"].createElement("h3", null, _react["default"].createElement(_react2.FormattedMessage, {
                  id: "kbnVislibVisTypes.editors.pie.pieSettingsTitle",
                  defaultMessage: "Directional Edges"
              }))), _react["default"].createElement(_eui.EuiSpacer, {
          size: "s"
      }), _react["default"].createElement(_common.SwitchOption, {
label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.displayArrow", {
defaultMessage: "Display directional edge:"
}),
paramName: "displayArrow",
value: stateParams.displayArrow,
setValue: setValue
}), _react.default.createElement(_common.SelectOption, {
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmap_dn.endPoints', {
defaultMessage: 'Endpoint position:'
}),
options: vis.type.editorConfig.collections.endPoints,
paramName: "posArrow",
value: stateParams.posArrow,
setValue: setValue
}),_react.default.createElement(_common.SelectOption, {
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmap_dn.endPointTypes', {
defaultMessage: 'Endpoint Type:'
}),
options: vis.type.editorConfig.collections.endPointTypes,
paramName: "shapeArrow",
value: stateParams.shapeArrow,
setValue: setValue
}),_react.default.createElement(_common.NumberInputOption, {  
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.scaleArrow', {
defaultMessage: 'Scale Factor:'
}),
paramName: "scaleArrow",
value: stateParams.scaleArrow,
setValue: setValue
}),_react.default.createElement(_common.SelectOption, {
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmap_dn.smoothTypes', {
defaultMessage: 'Endpoint Type:'
}),
options: vis.type.editorConfig.collections.smoothTypes,
paramName: "smoothType",
value: stateParams.smoothType,
setValue: setValue
}),_react["default"].createElement(_eui.EuiTitle, {
          size: "xs"
      }, _react["default"].createElement("h3", null, _react["default"].createElement(_react2.FormattedMessage, {
                  id: "kbnVislibVisTypes.editors.pie.pieSettingsTitle",
                  defaultMessage: "Extra"
              }))), _react["default"].createElement(_eui.EuiSpacer, {
          size: "s"
      }), _react["default"].createElement(_common.SwitchOption, {
          label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
              defaultMessage: "Show labels"
          }),
          paramName: "showLabels",
          value: stateParams.showLabels,
          setValue: setValue
      }), _react["default"].createElement(_common.SwitchOption, {
          label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showPopup", {
              defaultMessage: "Show Popup"
          }),
          paramName: "showPopup",
          value: stateParams.showPopup,
          setValue: setValue
      }), _react["default"].createElement(_common.SwitchOption, {
          label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showColorLegend", {
              defaultMessage: "Show Color Legend (Node Color selected)"
          }),
          paramName: "showColorLegend",
          value: stateParams.showColorLegend,
          setValue: setValue
      }), _react["default"].createElement(_common.SwitchOption, {
          label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.nodePhysics", {
              defaultMessage: "Nodes Acting like Springs"
          }),
          paramName: "nodePhysics",
          value: stateParams.nodePhysics,
          setValue: setValue
      }),_react["default"].createElement(_eui.EuiTitle, {
          size: "xs"
      }, _react["default"].createElement("h3", null, _react["default"].createElement(_react2.FormattedMessage, {
                  id: "kbnVislibVisTypes.editors.pie.pieSettingsTitle",
                  defaultMessage: "Network constants"
              }))), _react["default"].createElement(_eui.EuiSpacer, {
          size: "s"
      }),_react.default.createElement(_common.NumberInputOption, {  
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.gravitationalConstant', {
defaultMessage: 'Attraction Force'
}),
paramName: "gravitationalConstant",
value: stateParams.gravitationalConstant,
setValue: setValue
}),_react.default.createElement(_common.NumberInputOption, {  
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.springConstant', {
defaultMessage: 'Spring Force'
}),
paramName: "springConstant",
value: stateParams.springConstant,
setValue: setValue
}),_react["default"].createElement(_eui.EuiTitle, {
          size: "xs"
      }, _react["default"].createElement("h3", null, _react["default"].createElement(_react2.FormattedMessage, {
                  id: "kbnVislibVisTypes.editors.pie.pieSettingsTitle",
                  defaultMessage: "Don't show nodes below this value:"
              }))), _react["default"].createElement(_eui.EuiSpacer, {
          size: "s"
      }),_react.default.createElement(_common.NumberInputOption, {  
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.minCutMetricSizeNode', {
defaultMessage: 'Node Size'
}),
paramName: "minCutMetricSizeNode",
value: stateParams.minCutMetricSizeNode,
setValue: setValue
})));
}