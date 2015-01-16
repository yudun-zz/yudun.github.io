function main(){
	var colorbase = 23
	var color = 
		["#000000", "#FFFF00", "#1CE6FF", "#FF34FF", "#FF4A46", "#008941", "#006FA6", "#A30059",
        "#FFDBE5", "#7A4900", "#0000A6", "#63FFAC", "#B79762", "#004D43", "#8FB0FF", "#997D87",
        "#5A0007", "#809693", "#FEFFE6", "#1B4400", "#4FC601", "#3B5DFF", "#4A3B53", "#FF2F80",
        "#61615A", "#BA0900", "#6B7900", "#00C2A0", "#FFAA92", "#FF90C9", "#B903AA", "#D16100",
        "#DDEFFF", "#000035", "#7B4F4B", "#A1C299", "#300018", "#0AA6D8", "#013349", "#00846F",
        "#372101", "#FFB500", "#C2FFED", "#A079BF", "#CC0744", "#C0B9B2", "#C2FF99", "#001E09",
        "#00489C", "#6F0062", "#0CBD66", "#EEC3FF", "#456D75", "#B77B68", "#7A87A1", "#788D66",
        "#885578", "#FAD09F", "#FF8A9A", "#D157A0", "#BEC459", "#456648", "#0086ED", "#886F4C",

        "#34362D", "#B4A8BD", "#00A6AA", "#452C2C", "#636375", "#A3C8C9", "#FF913F", "#938A81",
        "#575329", "#00FECF", "#B05B6F", "#8CD0FF", "#3B9700", "#04F757", "#C8A1A1", "#1E6E00",
        "#7900D7", "#A77500", "#6367A9", "#A05837", "#6B002C", "#772600", "#D790FF", "#9B9700",
        "#549E79", "#FFF69F", "#201625", "#72418F", "#BC23FF", "#99ADC0", "#3A2465", "#922329",
        "#5B4534", "#FDE8DC", "#404E55", "#0089A3", "#CB7E98", "#A4E804", "#324E72", "#6A3A4C",
        "#83AB58", "#001C1E", "#D1F7CE", "#004B28", "#C8D0F6", "#A3A489", "#806C66", "#222800",
        "#BF5650", "#E83000", "#66796D", "#DA007C", "#FF1A59", "#8ADBB4", "#1E0200", "#5B4E51",
        "#C895C5", "#320033", "#FF6832", "#66E1D3", "#CFCDAC", "#D0AC94", "#7ED379", "#012C58"]
	var m,n
	var g, gv, ge
	var colorResult
	var c, colornum, maxDegree

	m = parseInt($("#m").val())
	n = parseInt($("#n").val())
	var s = $("#edge").val().split(/[\s,]+/).remove("")
	console.log(s)
	ge = []
	for (var i = 0; i < m; i++) {
		ge.push([])
		ge[i].push(parseInt(s[2*i]))
		ge[i].push(parseInt(s[2*i+1]))
	};
	console.log(ge)

	gv = []
	for (var i = 0; i < n; i++) {
		gv.push([])
	};
	for (var i = 0; i < ge.length; i++) {
		gv[ge[i][0]].push(i)
		gv[ge[i][1]].push(i)
	};




	colorResult = MisraGriesEdgeColoring(m, n, ge, gv)
	c = colorResult.color
	colornum = colorResult.num
	maxDegree = colorResult.maxDegree
	var resultDetail = ""
	var rn = Math.ceil(m/5)
	var index = 0
	for (var i = 0; i < rn; i++) {
		for (var j = 0; j < 5; j++, index++) {
			if(index >= c.length) break;
			resultDetail += "v"+ge[index][0]+"--v"+ge[index][1]
			+":<b style='color:"+color[(c[index]-1+colorbase)%64]+"'>color"+c[index]+"</b>&nbsp &nbsp &nbsp"
		};
		resultDetail += "<br>"
	};

	$("#maxDegree").text(maxDegree)
	$("#colornum").text(colornum)
	$("#resultDetail").html(resultDetail)
	$("#result").css("visibility","visible")

	var elesJson = {
	  nodes: [],   edges: []
	};
  	for (var i = 0; i < n; i++) {
  		elesJson.nodes.push({data:{id:'v'+i}})
  	};
	for (var i = 0; i < m; i++) {
  		elesJson.edges.push({data:{id:'e'+i, color: color[(c[i]-1+colorbase)%64], source: 'v'+ge[i][0], target: 'v'+ge[i][1]}})
  	};

	var nodeSize = 20
	$('#cy').cytoscape({
	  style: cytoscape.stylesheet()
	    .selector('node')
	      .css({
	        'background-color': '#B3767E',
	        'width': nodeSize,
	        'height': nodeSize,
	        'content': 'data(id)'
	      })
	    .selector('edge')
	      .css({
	        'line-color': 'data(color)',
	        'width': 10,
	        'opacity': 0.8
	      })
	    .selector(':selected')
	      .css({
	        'background-color': 'black',
	        'opacity': 1
	      })
	    .selector('.faded')
	      .css({
	        'opacity': 0.25,
	        'text-opacity': 0
	      }),
	  
	  elements: elesJson,
	  
	  layout: {
	    name: 'circle',
	    padding: 50
	  },
	  
	  ready: function(){
	    // ready 1
	  }
	});

}
