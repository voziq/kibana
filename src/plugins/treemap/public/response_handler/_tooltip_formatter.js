   import $ from 'jquery';
   import template from './_tooltip.html';
   export function TreemapTooltipFormatterProvider($compile, $rootScope) {
   	var $tooltipScope = $rootScope.$new();
   	const $tooltip = $(template);
   	$compile($tooltip)($tooltipScope);
   	function titleCase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
   	return function () {
        return function tooltipFormatter(feature) {
            var detail;
            var datum = feature.datum;
            var details = $tooltipScope.details = [];
            var gname = "";
            var metricLabel = "";
            var colorLabel = "";
            try {
                var metric = datum.parent.aggConfig.aggConfigs.bySchemaName("metric")[0];
                if (metric != undefined) {
                    if (metric.params.customLabel == "" || metric.params.customLabel == undefined) {
                        metric.params.field == undefined ? metricLabel = titleCase(metric.type.title) : metricLabel = titleCase(metric.__type.title + " " + metric.params.field.displayName)
                    } else {
                        metricLabel = metric.params.customLabel
                    }
                }
                var metric1 = datum.parent.aggConfig.aggConfigs.bySchemaName("metric1")[0];
                if (metric1 != undefined) {
                    if (metric1.params.customLabel == "" || metric1.params.customLabel == undefined) {
                        metric1.params.field == undefined ? colorLabel = titleCase(metric1.type.title) : colorLabel = titleCase(metric1.__type.title + " " + metric1.params.field.displayName)
                    } else {
                        colorLabel = metric1.params.customLabel
                    }
                }
                if (datum.name == "flare" && datum.children != undefined) {
                    var field1 = feature.data.parent.aggConfig.aggConfigs.bySchemaName("group")[0].params;
					if(field1.filters == undefined){
                    gname = datum.parent.aggConfig.aggConfigs.aggs[1].params.field.displayName;
                    "customLabel" in field1 && field1.customLabel != "" ? gname = field1.customLabel : gname;
					}else if("filters" in field1){
						gname = "filters";
					}
                    var subname = gname;
                    if (feature.data.children[0].aggConfig.aggConfigs.aggs.length == 3) {
                        var field2 = feature.data.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params;
						if(field2.filters == undefined){
                        subname = datum.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params.field.displayName;
                        "customLabel" in field2 && field2.customLabel != "" ? subname = field2.customLabel : subname
						}else if("filters" in field2){
						subname = "filters";
					}
                    } else if (feature.data.children[0].aggConfig.aggConfigs.aggs.length == 4) {
                        var field2 = feature.data.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params;
						if(field2.filters == undefined){
                        subname = datum.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params.field.displayName;
                        "customLabel" in field2 && field2.customLabel != "" ? subname = field2.customLabel : subname
						}else if("filters" in field2){
						subname = "filters";
					}
                    }
                    detail = {
                        group: gname,
                        gvalue: datum.children[0].gvalue,
                        svalue: datum.children[0].svalue,
                        metric: metricLabel,
                        subgroup: subname,
                        colorLabel: colorLabel,
                        colorValue: datum.colorValue,
                        size: Math.round(datum.size * 100) / 100
                    }
                } else if (datum.parent != undefined) {
                    var field1 = "";
                    var field2 = "";									
                    field1 = feature.data.parent.aggConfig.aggConfigs.bySchemaName("group")[0].params;
					if(field1.filters == undefined){
                    gname = datum.parent.aggConfig.params.field.displayName;
                    "customLabel" in field1 && field1.customLabel != "" ? gname = field1.customLabel : gname;
					}else if("filters" in field1){
						gname = "filters";
					}
                    var subname = gname;
                    if ("aggConfig" in feature.data && feature.data.aggConfig.aggConfigs.aggs.length == 3) {
                        field2 = feature.data.aggConfig.aggConfigs.aggs[2].params;
						if(field2.filters == undefined){
                        subname = datum.parent.aggConfig.aggConfigs.aggs[2].params.field.displayName;										
                        "customLabel" in field2 && field2.customLabel != "" ? subname = field2.customLabel : subname
						}else if("filters" in field2){
						subname = "filters";
					}
                    } else if (feature.data.parent.aggConfig.aggConfigs.aggs.length == 3) {										
                        field2 = feature.data.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params;
						if(field2.filters == undefined){
                        subname = datum.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params.field.displayName;
                        "customLabel" in field2 && field2.customLabel != "" ? subname = field2.customLabel : subname
						}else if("filters" in field2){
						subname = "filters";
					}
                    } else if (feature.data.parent.aggConfig.aggConfigs.aggs.length == 4) {
                        field2 = feature.data.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params;
						if(field2.filters == undefined){
                        subname = datum.parent.aggConfig.aggConfigs.bySchemaName("segment")[0].params.field.displayName;
                        "customLabel" in field2 && field2.customLabel != "" ? subname = field2.customLabel : subname
						}else if("filters" in field2){
						subname = "filters";
					}
                    }
                    detail = {
                        group: gname,
                        gvalue: datum.parent.gvalue,
                        svalue: datum.name,
                        subgroup: subname,
                        metric: metricLabel,
                        colorLabel: colorLabel,
                        colorValue: datum.colorValue,
                        size: Math.round(datum.size * 100) / 100
                    }
                }
            } catch (e) {
                console.dir("exception in tooltip")
            }
            if (detail != undefined) {
                details.push(detail);
                $tooltipScope.$apply();
                return $tooltip[0].outerHTML
            } else {
                return null
            }
        }
    };
   }
   
   
   let _tooltipFormatter;
   export const getTreemapTooltipFormatter = () => {
     if (!_tooltipFormatter) {
       throw new Error('tooltip formatter not initialized');
     }
     return _tooltipFormatter;
   };

   export const setTreemapTooltipFormatter = Private => {
     _tooltipFormatter = Private(TreemapTooltipFormatterProvider);
   };