import $ from 'jquery';
import template from 'plugins/network/response_handler/_tooltip.html';

export function NetworkTooltipFormatterProvider($compile, $rootScope) {
	let $tooltipScope = $rootScope.$new();
	let $tooltip = $(template);
	$compile($tooltip)($tooltipScope);
	function titleCase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	return function () {
	return function tooltipFormatter(feature) {
		var datum = feature.datum;
		var details = $tooltipScope.details = [];
		var fieldname = feature.data.series_data.aggConfig.params.field;
		var metric = feature.data.series_data.aggConfig.aggConfigs.bySchemaName['metric'][0];
		var metricLabel = "";
		if ((metric.params.customLabel == "") || (metric.params.customLabel == undefined)) {
				(metric.params.field == undefined) ? metricLabel = titleCase(metric.type):metricLabel = titleCase(metric.__type.title + " " + metric.params.field.displayName);
			} else {
					metricLabel = metric.params.customLabel;
				}
		//console.dir(feature);
		if (('customLabel' in feature.data.series_data.aggConfig.params) && feature.data.series_data.aggConfig.params.customLabel != "") {
			fieldname = feature.data.series_data.aggConfig.params.customLabel;
		}
		var detail = {
			label: fieldname, //datum.vh,
			value: datum.name,
			metric_label: metricLabel,
			metric_value: Math.round(datum.value * 100) / 100
		};
		details.push(detail);
		$tooltipScope.$apply();
		return $tooltip[0].outerHTML;
	};
};
};


let _tooltipFormatter;
export const getNetworkTooltipFormatter = () => {
  if (!_tooltipFormatter) {
    throw new Error('tooltip formatter not initialized');
  }
  return _tooltipFormatter;
};

export const setNetworkTooltipFormatter = Private => {
  _tooltipFormatter = Private(NetworkTooltipFormatterProvider);
};