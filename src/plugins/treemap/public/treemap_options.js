"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreemapOptions = TreemapOptions;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");
var _select = require("plugins/kbn_vislib_vis_types/components/common/select");

var _common = require("plugins/kbn_vislib_vis_types/components/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function TreemapOptions(props) {
  var stateParams = props.stateParams,
      setValue = props.setValue,
	  vis = props.vis,
uiState = props.uiState;
  var setLabels = function setLabels(paramName, value) {
    return setValue('labels', _objectSpread({}, stateParams.labels, _defineProperty({}, paramName, value)));
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiPanel, {
                            paddingSize: "s"
                        }, _react.default.createElement(_eui.EuiTitle, {
                                size: "xs"
                            }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
                                        id: "kbnVislibVisTypes.editors.heatmap.heatmapSettingsTitle",
                                        defaultMessage: "Treemap settings"
                                    }))), _react.default.createElement(_eui.EuiSpacer, {
                                size: "s"
                            }),_react.default.createElement(_select.SelectOption, {
                                label: _i18n.i18n.translate('kbnVislibVisTypes.controls.vislibBasicOptions.legendPositionLabel', {
                                    defaultMessage: 'Legend position'
                                  }),
                                  options: vis.type.editorConfig.collections.legendPositions,
                                  paramName: "legendPosition",
                                  value: stateParams.legendPosition,
                                  setValue: setValue
                                }),_react.default.createElement(_select.SelectOption, {
                                    label: _i18n.i18n.translate("kbnVislibVisTypes.controls.vislibBasicOptions.treemapSortOptionLabel", {
                                        defaultMessage: "Sort Nodes"
                                    }),
                                    options: vis.type.editorConfig.collections.treemapSortOptions,
                                    paramName: "treemapSortOption",
                                    value: stateParams.treemapSortOption,
                                    setValue: setValue
                                }), _react.default.createElement(_common.SwitchOption, {
                                label: _i18n.i18n.translate("visTypeTagCloud.visParams.timePeriodComparisonLabel", {
                                    defaultMessage: "Show color schema"
                                }),
                                paramName: "setColorRange",
                                value: stateParams.setColorRange,
                                setValue: setValue
                            }), stateParams.setColorRange && _react.default.createElement(_common.TreemapColorSchemaOptions, {
                                colorSchema: stateParams.colorSchema,
                                colorSchemas: vis.type.editorConfig.collections.colorSchemas,
                                invertColors: stateParams.invertColors,
                                groupColors : stateParams.groupColors,
                                uiState: uiState,
                                setValue: setValue
                            }), stateParams.showLabels && _react.default.createElement(_common.SwitchOption, {
                                label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
                                    defaultMessage: "Show group1 labels"
                                }),
                                paramName: "showGroupLabels",
                                value: stateParams.showGroupLabels,
                                setValue: setValue
                            }),stateParams.showLabels && stateParams.showGroupLabels && _react.default.createElement(_common.NumberInputOption, {
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'Set group1 label size'
}),
paramName: "setGroupLabelSize",
value: stateParams.setGroupLabelSize,
setValue: setValue
}),stateParams.showLabels && _react.default.createElement(_common.SwitchOption, {
                                label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
                                    defaultMessage: "Show group2 labels"
                                }),
                                paramName: "showGroup2Labels",
                                value: stateParams.showGroup2Labels,
                                setValue: setValue
                            }),stateParams.showLabels && stateParams.showGroup2Labels && _react.default.createElement(_common.NumberInputOption, {
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'Set group2 label size'
}),
paramName: "setGroup2LabelSize",
value: stateParams.setGroup2LabelSize,
setValue: setValue
}), stateParams.showLabels && stateParams.showGroup2Labels && _react.default.createElement(_select.SelectOption, {
    label: _i18n.i18n.translate("kbnVislibVisTypes.controls.vislibBasicOptions.groupAlignmentLabel", {
        defaultMessage: "Group2 Label position"
    }),
    options: vis.type.editorConfig.collections.groupAlignment,
    paramName: "setGroup2Position",
    value: stateParams.setGroup2Position,
    setValue: setValue
}), _react.default.createElement(_eui.EuiSpacer, {
                                size: "s"
                            })));
}