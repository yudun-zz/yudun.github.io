var showvis = (function() {
	var currentvis = "none";
	var currentvissvg = "none";
	var oldtransform;

	var reover = function(visnamesvg) {
		if (visnamesvg == "bouquetsvg") {
			d3.select('#bouquet')
				.attr('transform', oldtransform)
			d3.select('#bouquet_guidance').attr('transform', 'translate(' + (170 / 1366 * screen.availWidth) + ',' + 0 + ')')
		} else {
			if (visnamesvg == "sparksvg") {
				d3.select('#spark_guidance').attr('transform', 'translate(' + (170 / 1366 * screen.availWidth) + ',' + 0 + ')')
			}
			d3.select('#main_' + visnamesvg)
				.attr('transform', oldtransform)
		}
		$("#" + visnamesvg).css({
			"margin-left": 0,
			"margin-top": 0
		})
	}

	return function(visname) {
		var visnamesvg = "none"

		if (visname.search('_') >= 0) {
			visnamesvg = visname.split("_")[1] + "svg";
		}

		if (currentvis != "none") {
			$("#" + currentvis).fadeOut(500)
			$("#" + currentvissvg).fadeOut(500)
			reover(currentvissvg)
			setTimeout(function() {
				//同下方else
				$("#" + visname).fadeIn(1000)
			}, 600);
		} else {
			$("#" + visname).fadeIn(1000)
		}

		currentvis = visname
		currentvissvg = visnamesvg
	}
})()