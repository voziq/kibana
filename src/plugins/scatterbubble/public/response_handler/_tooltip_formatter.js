import $ from 'jquery';
import template from 'plugins/scatterbubble/response_handler/_tooltip.html';

export function ScatterTooltipFormatterProvider($compile, $rootScope) {
	const $tooltipScope = $rootScope.$new();
	const $tooltip = $(template);
	$compile($tooltip)($tooltipScope);	
	return function () {
		return function tooltipFormatter(feature) {			
            var datum = feature.datum;
            var groupname = "";
            var subgroupname = "";
            var sgfield = "";
            var sgfieldLabel = "";
            var details = $tooltipScope.details = [];
            var aggLength = feature.data.series_data[0].aggConfig.aggConfigs.aggs.length;
            try {
                if (feature.data.series_data[0].aggConfig.aggConfigs.bySchemaName("group")) {
                    sgfield = feature.data.series_data[0].aggConfig.aggConfigs.bySchemaName("group")[0].params;
                    sgfieldLabel = feature.data.series_data[0].aggConfig.aggConfigs.bySchemaName("group")[0].params.field.displayName
                } else {
                    sgfield = feature.data.series_data[0].aggConfig.aggConfigs.bySchemaName("segment")[0].params;
                    sgfieldLabel = feature.data.series_data[0].aggConfig.aggConfigs.bySchemaName("segment")[0].params.field.displayName
                }
                "customLabel" in sgfield && sgfield.customLabel != "" ? subgroupname = sgfield.customLabel : subgroupname = sgfieldLabel
            } catch (e) {}
            var detail = {
                detailLength: aggLength,
                subgroup: subgroupname,
                subgroupValue: datum.subgroup,
                groupValue: datum.group,
                group: "",
                type: feature.data.series_data[0].sizeLabel,
                size: Math.round(datum.size * 100) / 100,
                xaxis: feature.data.series_data[0].xlabel,
                xvalue: Math.round(datum.xval * 100) / 100,
                yaxis: feature.data.series_data[0].ylabel,
                yvalue: Math.round(datum.yval * 100) / 100
            };			
            if (aggLength == 5) {
                var gfield = feature.data.series_data[0].aggConfig.aggConfigs.bySchemaName("segment")[0].params;
                var gfieldLabel = feature.data.series_data[0].aggConfig.aggConfigs.bySchemaName("segment")[0].params.field.displayName;
                "customLabel" in gfield && gfield.customLabel != "" ? groupname = gfield.customLabel : groupname = gfieldLabel;
                detail.group = groupname
            } else
                delete detail.group;            
			details.push(detail);
            $tooltipScope.$apply();
            return $tooltip[0].outerHTML
        };
	};
}


let _tooltipFormatter;
export const getScatterTooltipFormatter = () => {
  if (!_tooltipFormatter) {
    throw new Error('tooltip formatter not initialized');
  }
  return _tooltipFormatter;
};

export const setScatterTooltipFormatter = Private => {
  _tooltipFormatter = Private(ScatterTooltipFormatterProvider);
};