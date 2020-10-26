import $ from 'jquery';
import template from 'plugins/sankey/response_handler/_tooltip.html';

export function SankeyTooltipFormatterProvider($compile, $rootScope) {
	const $tooltipScope = $rootScope.$new();
	const $tooltip = $(template);
	$compile($tooltip)($tooltipScope);
	function titleCase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	return function () {
	return function tooltipFormatter(feature) {
		//console.log("feature...",feature);
		var datum = feature.datum;
		var detail = {};
		var label1name = "",
		label2name = "",
		label3name = "",
		metricLabel = "";		
		try {
            var metric = feature.data.c_config.aggConfigs.bySchemaName("metric")[0];
            if (metric.params.customLabel == "" || metric.params.customLabel == undefined) {
                metric.params.field == undefined ? metricLabel = titleCase(metric.type.title) : metricLabel = titleCase(metric.__type.title + " " + metric.params.field.displayName)
            } else {
                metricLabel = metric.params.customLabel
            }
            var details = $tooltipScope.details = [];
            if ("source" in datum) {
				var i = parseInt(datum.source.id[datum.source.id.length - 1]);
				var j = parseInt(datum.target.id[datum.target.id.length - 1]);
                var aggLength = feature.data.c_config.aggConfigs.aggs.length;
                var param1 = feature.data.c_config.aggConfigs.aggs[i].params;
                var param2 = feature.data.c_config.aggConfigs.aggs[j].params;
                if ("filters" in param1) {
                    label1name = "filters"
                } else {
					
                    label1name = feature.data.c_config.aggConfigs.aggs[i].params.field.displayName
                }
                if ("filters" in param2) {
                    label2name = "filters"
                } else {
					
                    label2name = feature.data.c_config.aggConfigs.aggs[j].params.field.displayName
                }
                "customLabel" in param1 && param1.customLabel != "" ? label1name = param1.customLabel : label1name;
                "customLabel" in param2 && param2.customLabel != "" ? label2name = param2.customLabel : label2name;
                if (aggLength == 4) {
                    var param3 = feature.data.c_config.aggConfigs.aggs[3].params;
                    if ("filters" in param3) {
                        label3name = "filters"
                    } else {
                        label3name = feature.data.c_config.aggConfigs.aggs[3].params.field.displayName
                    }
                    "customLabel" in param3 && param3.customLabel != "" ? label3name = param3.customLabel : label3name;
                    if (datum.target.name == datum.l3v) {
                        label1name = label2name;
                        label2name = label3name
                    }
                }
                detail = {
                    type: "link",
                    metric: metricLabel,
                    value: Math.round(datum.value * 100) / 100,
                    source: datum.source.name,
                    target: datum.target.name,
                    label1: label1name,
                    label2: label2name
                }
            } else if ("sourceLinks" in datum) {
                var i = parseInt(datum.id[datum.id.length - 1]);
                var nodelabel = "";
                var paramN = feature.data.c_config.aggConfigs.aggs[i].params;
                if ("filters" in paramN) {
                    nodelabel = "filters"
                } else {
                    nodelabel = feature.data.c_config.aggConfigs.aggs[i].params.field.displayName
                }
                "customLabel" in paramN && paramN.customLabel != "" ? nodelabel = paramN.customLabel : nodelabel;
                detail = {
                    type: "node",
                    metric: metricLabel,
                    value: Math.round(datum.value * 100) / 100,
                    node: datum.name,
                    nodelabel: nodelabel
                }
            }
        }catch(e){
			console.log("exception in tootip");
		}
		
		
		details.push(detail);
		$tooltipScope.$apply();
		return $tooltip[0].outerHTML;
	};
	};
}


let _tooltipFormatter;
export const getSankeyTooltipFormatter = () => {
  if (!_tooltipFormatter) {
    throw new Error('tooltip formatter not initialized');
  }
  return _tooltipFormatter;
};

export const setSankeyTooltipFormatter = Private => {
  _tooltipFormatter = Private(SankeyTooltipFormatterProvider);
};