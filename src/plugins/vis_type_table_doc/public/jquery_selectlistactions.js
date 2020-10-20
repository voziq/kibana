/**
 *  jQuery.SelectListActions
 *  https://github.com/esausilva/jquery.selectlistactions.js
 *
 *  (c) http://esausilva.com
 */

(function ($) {
	//Moves selected item(s) from sourceList to destinationList

	$.fn.moveToList1 = function (sourceList, destinationList) {
		var opts = $(sourceList + ' option:selected');
		if (opts.length == 0) {
			console.dir("Nothing to move");
		}
		var data=$(destinationList + ' option');
		var opt=[];for(var j = 0; j < opts.length; j++) {
			var found=false;
			for(var i = 0; i < data.length; i++) {
				console.dir(data[i].value === opts[j].value);
				if (data[i].value === opts[j].value) {
					found=true;
				}
			}
			if(!found){
				$(destinationList).append($(opts[j]).clone());
			}
		}        
		//$(destinationList + ' option').prop('selected', true);
		//$(destinationList).trigger("onchange");
	};

	//Moves all items from sourceList to destinationList
	$.fn.moveAllToList = function (sourceList, destinationList) {
		var opts = $(sourceList + ' option');
		if (opts.length == 0) {
			console.dir("Nothing to move");
		}

		$(destinationList).append($(opts).clone());
	};

	//Moves selected item(s) from sourceList to destinationList and deleting the
	// selected item(s) from the source list
	$.fn.moveToListAndDelete = function (sourceList, destinationList) {
		var opts = $(sourceList + ' option:selected');
		if (opts.length == 0) {
			console.dir("Nothing to move");
		}

		$(opts).remove();
		$(destinationList).append($(opts).clone());
	};

	//Moves all items from sourceList to destinationList and deleting
	// all items from the source list
	$.fn.moveAllToListAndDelete = function (sourceList, destinationList) {
		var opts = $(sourceList + ' option');
		if (opts.length == 0) {
			console.dir("Nothing to move");
		}

		$(opts).remove();
		$(destinationList).append($(opts).clone());
	};

	//Removes selected item(s) from list
	$.fn.removeSelected = function (list) {
		var opts = $(list + ' option:selected');
		if (opts.length == 0) {
			console.dir("Nothing to remove");
		}
		 ///$('#viewList option').prop('selected', true);
		 //$('#exportList option').prop('selected', true)
		 
		$(opts).remove();
	};

	//Moves selected item(s) up or down in a list
	$.fn.moveUpDown = function (list, btnUp, btnDown) {
		var opts = $(list + ' option:selected');
		if (opts.length == 0) {
			console.dir("Nothing to move");
		}

		if (btnUp) {
			opts.first().prev().before(opts);
		} else if (btnDown) {
			opts.last().next().after(opts);
		}
		// $('#viewList option').prop('selected', 'selected');
		// $('#exportList option').prop('selected', 'selected');
	};
})(jQuery);
