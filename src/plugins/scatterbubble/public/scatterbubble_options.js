"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScatterBubbleOptions = ScatterBubbleOptions;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _common = require("plugins/kbn_vislib_vis_types/components/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ScatterBubbleOptions(props) {
  var stateParams = props.stateParams,
      setValue = props.setValue,
      yExtentsValidate=false,
      error="";

	if(stateParams.setYExtents)
	{
			if(stateParams.yAxis.min==undefined||stateParams.yAxis.max==undefined)
		{
				yExtentsValidate=true;
        error="Enter Value"; 					
		}else
		{
			if(Number(stateParams.yAxis.max)<Number(stateParams.yAxis.min))
			{
				yExtentsValidate=true;
        error="max should greater than min";	
			}
		}
	}
  var setLabels = function setLabels(paramName, value) {
    return setValue('labels', _objectSpread({}, stateParams.labels, _defineProperty({}, paramName, value)));
  };

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_eui.EuiPanel, {
      paddingSize: "s"
  }, _react["default"].createElement(_eui.EuiTitle, {
          size: "xs"
      }, _react["default"].createElement("h3", null, _react["default"].createElement(_react2.FormattedMessage, {
                  id: "kbnVislibVisTypes.editors.pie.pieSettingsTitle",
                  defaultMessage: "Basic settings"
              }))), _react["default"].createElement(_eui.EuiSpacer, {
          size: "s"
      }), _react["default"].createElement(_common.SwitchOption, {
          label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
              defaultMessage: "Show labels"
          }),
          paramName: "showLabels",
          value: stateParams.showLabels,
          setValue: setValue
      }),stateParams.showLabels && _react.default.createElement(_common.NumberInputOption, {
    	//isInvalid: isColorsNumberInvalid,
    	  label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.setLabelSize', {
    	  defaultMessage: 'Set Label Font size'
    	  }),
    	  paramName: "setLabelSize",
    	  value: stateParams.setLabelSize,
    	  setValue: setValue
    	  }), _react["default"].createElement(_common.BasicOptions, props)), _react["default"].createElement(_eui.EuiSpacer, {
      size: "s"
  }), _react.default.createElement(_eui.EuiPanel, {
paddingSize: "s"
}, _react.default.createElement(_eui.EuiTitle, {
size: "xs"
}, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
id: "kbnVislibVisTypes.editors.pie.labelsSettingsTitle",
defaultMessage: "Scatter Bubble settings"
}))), _react.default.createElement(_eui.EuiSpacer, {
size: "s"
}),_react["default"].createElement(_common.SwitchOption, {
label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
defaultMessage: "Show Mid-Point on Axes"
}),
paramName: "showMid",
value: stateParams.showMid,		  
setValue: setValue
}),stateParams.showMid && _react["default"].createElement(_common.SwitchOption, {
label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
defaultMessage: "Show Label on Mid-Points"
}),
paramName: "setMidLabels",
value: stateParams.setMidLabels,		  
setValue: setValue		 
}), stateParams.showMid && stateParams.setMidLabels && _react.default.createElement(_common.TextInputOption, {    
disabled: !stateParams.setMidLabels,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'X-Mid Label'
}),
paramName: "xMidLabel",
value: stateParams.xMidLabel,
setValue: setValue
}),  stateParams.showMid && stateParams.setMidLabels && _react.default.createElement(_common.TextInputOption, {    
disabled: !stateParams.setMidLabels,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'Y-Mid Label'
}),
paramName: "yMidLabel",
value: stateParams.yMidLabel,
setValue: setValue
}),_react["default"].createElement(_common.SwitchOption, {
label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
defaultMessage: "Show Average on Axes"
}),
paramName: "showAvg",
value: stateParams.showAvg,		  
setValue: setValue
}),stateParams.showAvg && _react["default"].createElement(_common.SwitchOption, {
label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
defaultMessage: "Show Label on Average"
}),
paramName: "setAvgLabels",
value: stateParams.setAvgLabels,		  
setValue: setValue		 
}), stateParams.showAvg && stateParams.setAvgLabels && _react.default.createElement(_common.TextInputOption, {    
disabled: !stateParams.setAvgLabels,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'X-Avg Label'
}),
paramName: "xAvgLabel",
value: stateParams.xAvgLabel,
setValue: setValue
}),  stateParams.showAvg && stateParams.setAvgLabels && _react.default.createElement(_common.TextInputOption, {    
disabled: !stateParams.setAvgLabels,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'Y-Avg Label'
}),
paramName: "yAvgLabel",
value: stateParams.yAvgLabel,
setValue: setValue
}),_react["default"].createElement(_common.SwitchOption, {
label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
defaultMessage: "Show Median on Axes"
}),
paramName: "showMedian",
value: stateParams.showMedian,		  
setValue: setValue
}),stateParams.showMedian && _react["default"].createElement(_common.SwitchOption, {
label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
defaultMessage: "Show Label on Medians"
}),
paramName: "setMedianLabels",
value: stateParams.setMedianLabels,		  
setValue: setValue		 
}), stateParams.showMedian && stateParams.setMedianLabels && _react.default.createElement(_common.TextInputOption, {    
disabled: !stateParams.setMedianLabels,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'X-Median Label'
}),
paramName: "xMedianLabel",
value: stateParams.xMedianLabel,
setValue: setValue
}),  stateParams.showMedian && stateParams.setMedianLabels && _react.default.createElement(_common.TextInputOption, {    
disabled: !stateParams.setMedianLabels,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'Y-Median Label'
}),
paramName: "yMedianLabel",
value: stateParams.yMedianLabel,
setValue: setValue
}),_react["default"].createElement(_common.SwitchOption, {
label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
defaultMessage: "Show Goals on Axes"
}),
paramName: "setGoals",
value: stateParams.setGoals,		  
setValue: setValue
}),stateParams.setGoals && _react.default.createElement(_common.NumberInputOption, {    
disabled: !stateParams.setGoals,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'X-Goal'
}),
paramName: "xGoal",
value: stateParams.xGoal,
setValue: setValue
}),stateParams.setGoals && _react.default.createElement(_common.NumberInputOption, {    
disabled: !stateParams.setGoals,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'Y-Goal'
}),
paramName: "yGoal",
value: stateParams.yGoal,
setValue: setValue
}),stateParams.setGoals && _react["default"].createElement(_common.SwitchOption, {
label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
defaultMessage: "Show Label on Goals"
}),
paramName: "setGoalLabels",
value: stateParams.setGoalLabels,		  
setValue: setValue
}),stateParams.setGoals && stateParams.setGoalLabels && _react.default.createElement(_common.TextInputOption, {    
disabled: !stateParams.setGoalLabels,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'X-Goal Label'
}),
paramName: "xGoalLabel",
value: stateParams.xGoalLabel,
setValue: setValue
}),stateParams.setGoals && stateParams.setGoalLabels &&  _react.default.createElement(_common.TextInputOption, {    
disabled: !stateParams.setGoalLabels,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'Y-Goal Label'
}),
paramName: "yGoalLabel",
value: stateParams.yGoalLabel,
setValue: setValue
}),_react["default"].createElement(_common.SwitchOption, {
label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
defaultMessage: "Set X-Axis Extents"
}),
paramName: "setXExtents",
value: stateParams.setXExtents,		  
setValue: setValue
}),stateParams.setXExtents && _react.default.createElement(_common.NumberInputOption, {    
disabled: !stateParams.setXExtents,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'X-Max'
}),
paramName: "max",
value: stateParams.xAxis.max,
setValue: function setXaxisMax(paramName, value) {
  return setValue("xAxis", _objectSpread({}, stateParams.xAxis, _defineProperty({}, paramName, value)))
}
}),stateParams.setXExtents &&  _react.default.createElement(_common.NumberInputOption, {    
disabled: !stateParams.setXExtents,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'X-Min'
}),
paramName: "min",
value: stateParams.xAxis.min,
setValue: function setXaxisMin(paramName, value) {
  return setValue("xAxis", _objectSpread({}, stateParams.xAxis, _defineProperty({}, paramName, value)))
}
}),_react["default"].createElement(_common.SwitchOption, {
label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
defaultMessage: "Set Y-Axis Extents"
}),
paramName: "setYExtents",
value: stateParams.setYExtents,		  
setValue: setValue
}),stateParams.setYExtents && _react.default.createElement(_common.NumberInputOption, {    
disabled: !stateParams.setYExtents,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'Y-Max'
}),
paramName: "max",
value: stateParams.yAxis.max,
setValue: function setYaxisMax(paramName, value) {
  return setValue("yAxis", _objectSpread({}, stateParams.yAxis, _defineProperty({}, paramName, value)))
}
}),stateParams.setYExtents &&  _react.default.createElement(_common.NumberInputOption, {    
disabled: !stateParams.setYExtents,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'Y-Min'
}),
paramName: "min",
value: stateParams.yAxis.min,
setValue: function setYaxisMin(paramName, value) {
  return setValue("yAxis", _objectSpread({}, stateParams.yAxis, _defineProperty({}, paramName, value)))
}
}),
_react["default"].createElement(_eui.EuiSpacer, {
    size: "xs"
}), yExtentsValidate && error && _react["default"].createElement(_eui.EuiFormErrorText, null, error), _react["default"].createElement(_eui.EuiSpacer, {
    size: "s"
})


,_react["default"].createElement(_common.SwitchOption, {
label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
defaultMessage: "Scale Axis to Data Bounds"
}),
paramName: "defaultExtents",
value: stateParams.defaultExtents,
disabled: stateParams.setYExtents,		  
setValue: setValue
}),_react["default"].createElement(_common.SwitchOption, {
label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
defaultMessage: "SetMinDocCount"
}),
paramName: "setDocCount",
value: stateParams.setDocCount,				 
setValue: setValue
}),stateParams.setDocCount && _react.default.createElement(_common.NumberInputOption, {    
disabled: !stateParams.setDocCount,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'Count Value'
}),
paramName: "docMinCount",
value: stateParams.docMinCount,
setValue: setValue
}),_react["default"].createElement(_common.SwitchOption, {
label: _i18n.i18n.translate("kbnVislibVisTypes.editors.pie.showLabelsLabel", {
defaultMessage: "Set Node Extents"
}),
paramName: "setMaxMinExtents",
value: stateParams.setMaxMinExtents,		  
setValue: setValue
}),stateParams.setMaxMinExtents && _react.default.createElement(_common.NumberInputOption, {    
disabled: !stateParams.setMaxMinExtents,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'Max Node Size'
}),
paramName: "max",
value: stateParams.node.max,
setValue: function setYaxisMax(paramName, value) {
  return setValue("node", _objectSpread({}, stateParams.node, _defineProperty({}, paramName, value)))
}
}),stateParams.setMaxMinExtents &&  _react.default.createElement(_common.NumberInputOption, {    
disabled: !stateParams.setMaxMinExtents,
//isInvalid: isColorsNumberInvalid,
label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
defaultMessage: 'Min Node Size'
}),
paramName: "min",
value: stateParams.node.min,
setValue: function setYaxisMin(paramName, value) {
  return setValue("node", _objectSpread({}, stateParams.node, _defineProperty({}, paramName, value)))
}
})));
}