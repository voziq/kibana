import $ from 'jquery';

export function RadarTooltipFormatter($compile, $rootScope) {
   const $tooltipScope = $rootScope.$new();
    const $tooltip = $(require('plugins/radar/response_handler/_tooltip.html'));
    $compile($tooltip)($tooltipScope);

    return function tooltipFormatter(feature) {
      var datum = feature.datum;
         var details = $tooltipScope.details = [];
		  var fieldname = feature.data.c_config.params.field.displayName;
			if (('customLabel' in feature.data.c_config._opts.params) && feature.data.c_config._opts.params.customLabel!="") {
				fieldname = feature.data.c_config._opts.params.customLabel;
			} 
			$tooltipScope.details = [
									  {
										label: fieldname,
										value: datum.axis
									  },
									  {
										label: datum.label,
										value: Math.round(datum.value * 100) / 100
									  }
									];
			if(datum.TooltipLabel){
				$tooltipScope.details.push({
				label: datum.TooltipLabel,
				value: datum.TooltipValue
			  });
			}
			/*if(datum.TooltipLabel!="Count" && datum.label!="Count"){
				$tooltipScope.details.push({
				label: "Count",
				value: datum.doc_count
			  });
			}*/
	       $tooltipScope.$apply();
	      return $tooltip[0].outerHTML;
    };
  };

