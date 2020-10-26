"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SankeyOptions = SankeyOptions;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _common = require("plugins/kbn_vislib_vis_types/components/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function SankeyOptions(props) {
  var stateParams = props.stateParams,
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
      }), _react["default"].createElement(_common.BasicOptions, props)), _react["default"].createElement(_eui.EuiSpacer, {
      size: "s"
  }));
}