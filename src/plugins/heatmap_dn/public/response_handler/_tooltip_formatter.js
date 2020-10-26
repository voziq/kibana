import $ from 'jquery';

export function Heatmap_dnTooltipFormatter($compile, $rootScope) {
	let $tooltipScope = $rootScope.$new();
	let $tooltip = $(require('plugins/heatmap_dn/response_handler/_tooltip.html'));
	$compile($tooltip)($tooltipScope);
	function titleCase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	return function tooltipFormatter(feature) {
		var datum = feature.datum;
		var details = $tooltipScope.details = [];
		var field1 = feature.data.c_config.aggConfigs[1]._opts.params;
		var field1Lable = feature.data.c_config.aggConfigs[1].params.field.displayName;
		var metric = feature.data.c_config.aggConfigs.bySchemaName['metric'][0];
		//console.dir(feature.data.c_config.vis.aggs);
		var metricLabel = "";
		if ((metric._opts.params.customLabel == "") || (metric._opts.params.customLabel == undefined)) {
				(metric.params.field == undefined) ? metricLabel = titleCase(metric._opts.type):metricLabel = titleCase(metric.__type.title + " " + metric.params.field.displayName);
			} else {
					metricLabel = metric._opts.params.customLabel;
				}
		var groupname = field1Lable;
		if (('customLabel' in field1) && field1.customLabel != "") {
			groupname = field1.customLabel;
		};
		var subgroupname = groupname;
		if (feature.data.c_config.aggConfigs.length == 3) {
			var field2 = feature.data.c_config.aggConfigs[2]._opts.params;
			var field2Lable = feature.data.c_config.aggConfigs[2].params.field.displayName;
			subgroupname = field2Lable;
			if (('customLabel' in field2) && field2.customLabel != "") {
				subgroupname = field2.customLabel;
			};
		}
		var detail = {
			value: datum.value,
			x: datum.x,
			y: datum.y,
			xh: groupname, //datum.xh,
			yh: subgroupname, //datum.yh,
			vh: metricLabel
		};
		details.push(detail);
		$tooltipScope.$apply();
		return $tooltip[0].outerHTML;
	};

};