
$("#status").text("Rendering Conventional vis...")

d3.select('body').append('svg').attr("id","conventionalsvg").style("display", "none")
  
var yearlist
var all_timedata
var frienddata
var all_yeardata
var all_posts

//Make sure the data processing is after the data transmission
$.ajaxSetup({
    async: false
});
  
$.getJSON( URL_PREFIX + "data/" + username_id +"/" + username_id + "_flower2_result.json", function( response ) {
  yearlist = response.yearlist
  all_timedata = response.timedata
  frienddata = response.frienddata
  all_yeardata = response.yeardata
  all_posts = response.posts
})
var frienddataList = []
for (var id in frienddata) {
	frienddata[id]["id"] = id;
	frienddataList.push(frienddata[id]);
};
frienddataList.sort(function(a,b){
  return b.totallikeother - a.totallikeother; 
})
var top3likeother = []
var count = 0
while(count<frienddataList.length && count<3) top3likeother.push(frienddataList[count++])

frienddataList.sort(function(a,b){
  return b.totallikeme - a.totallikeme; 
})
var top3likeme = []
var count = 0
while(count<frienddataList.length && count<3) top3likeme.push(frienddataList[count++])

frienddataList.sort(function(a,b){
  return b.totalintimacy - a.totalintimacy; 
})
var top3touch = []
var count = 0
while(count<frienddataList.length && count<3) top3touch.push(frienddataList[count++])

var margin = {top: 0, right: 100/1366*screen.availWidth, 
				bottom: 0, left: 100/1366*screen.availWidth};
var width = screen.availWidth - margin.left - margin.right,
    height = $( window ).height() - margin.top - margin.bottom - $("#mainviewtitle").outerHeight();

var leftGraphWidth = width/4.5
var yearwidth = (width-leftGraphWidth) / 6
var yearnum = yearlist.length
width = yearwidth * yearnum + leftGraphWidth
var svg = d3.select("#conventionalsvg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append('g')
	.attr('id', "main_conventionalsvg")

var monthwidth = yearwidth/12
var scale_x = d3.scale.linear().domain([1, 12]).range([monthwidth/2, yearwidth-monthwidth/2]);
var legendFont = "Verdana"
var fontSize = yearwidth * 0.3
var monthFontSize = 10/211 * yearwidth
var fillOpacity = 0.5
var yearLegendHeight = yearwidth * 0.2
var yearLegendFontSize = yearwidth * 0.2

var yearLegend = svg.append('g')
    .attr('transform', "translate("+(margin.left+leftGraphWidth)+","+margin.top+")")
var graph = svg.append('g')
    .attr('transform', "translate("+(margin.left+leftGraphWidth)+","+(margin.top+yearLegendHeight)+")")
var leftGraph = svg.append('g')
    .attr('transform', "translate("+margin.left+","+(margin.top+yearLegendHeight)+")")

//////////////////////////// YEAR LEGEND ///////////////////////////
for (var i = 0; i < yearnum; i++) {
	yearLegend.append('text')
	.attr('x', yearwidth * i + yearLegendFontSize)
	.attr('y', yearLegendHeight*0.9)
	.attr('font-size', yearLegendFontSize)
	.attr('font-weight', "bold")
	.attr('font-family', legendFont)
	.attr('fill', "gray")
	.text(yearlist[i])
};

//////////////////////////// BACKGROUND GRID ///////////////////////
var grid = graph.append('g').attr('id', "backgroundGrid")
for (var i = 1; i < yearnum; i++) {
	grid.append('line')
	.attr('x1', yearwidth*i)
	.attr('y1', 0)
	.attr('x2', yearwidth*i)
	.attr('y2', yearwidth * 3.2)
	.attr('stroke', "lightgray")
	.attr('stroke-width', 2)
};

////////////////////////////////// TOTAL ACTIVITY /////////////////////////
var totalcolor = "#F68932"
var totalHSize = 0.6
var TotalColor = ["#DC3522","#FFD80F","#FFFFFF","#2B978A"]
////// TOTAL ACTIVITY LEFTGRAPH //////
var totalLegendFontSize = yearwidth*totalHSize*0.15
var colorlegendwidth = totalLegendFontSize*5.5
var totalLeft = leftGraph.append('g').attr('id', "totalLeft")
totalLeft.append('rect')
.attr('width', leftGraphWidth)
.attr('height', yearwidth*totalHSize)
.attr('fill', totalcolor)

totalLeft.append('text')
.attr('x', totalLegendFontSize*1.5)
.attr('y', totalLegendFontSize*1.5)
.attr('font-size', totalLegendFontSize)
.attr('font-family', legendFont)
.attr('fill', "white")
.attr('fill-opacity', 0.8)
.attr('font-weight', "bold")
.text("different colors represent ")
totalLeft.append('text')
.attr('x', totalLegendFontSize*1.5)
.attr('y', totalLegendFontSize * 2.5)
.attr('font-size', totalLegendFontSize)
.attr('font-family', legendFont)
.attr('fill', "white")
.attr('fill-opacity', 0.8)
.attr('font-weight', "bold")
.text("different types of activity")

/////// color legend
var para = [[2.5, 3, 1.5, "message"],
			[9.5, 3, 1.5, "like"],
			[2.5, 5, 1.5, "comment"],
			[9.5, 5, 1.5, "other"]]
totalLeft.selectAll(".colorlegend")
.data(para).enter()
.append('rect')
.attr('class', "colorlegend")
.attr('x', function(d,i){
	return totalLegendFontSize*d[0]
})
.attr('y', function(d,i){
	return totalLegendFontSize*d[1]
})
.attr('width', colorlegendwidth)
.attr('height', function(d,i){
	return totalLegendFontSize*d[2]
})
.attr('fill', function(d,i){
	return TotalColor[i]
})
//////// color legend text
totalLeft.selectAll(".colorlegendtext")
.data(para).enter()
.append('text')
.attr('class', "colorlegendtext")
.attr('x', function(d,i){
	return totalLegendFontSize*(d[0])
})
.attr('y', function(d,i){
	return totalLegendFontSize*(d[1]+1)
})
.attr('font-size', totalLegendFontSize)
.attr('font-family', legendFont)
.attr('fill', totalcolor)
.attr('fill-opacity', 1)
.attr('font-weight', "bold")
.text(function(d,i){
	return d[3]
})

/////// BACKGROUND
var totalLineChart = graph.append('g').attr('id', "totalLineChart")
totalLineChart.append('rect')
.attr('x', 0)
.attr('width', (width-leftGraphWidth))
.attr('height', yearwidth*totalHSize)
.attr('fill', totalcolor)
.attr('fill-opacity', .2)

for(var i = 0; i < yearnum; i++){
	for (var j = 0; j < 12; j++) {
		totalLineChart.append('text')
		.attr('x', yearwidth * i + monthwidth * j)
		.attr('y', yearwidth*totalHSize + monthFontSize)
		.attr('font-size', monthFontSize)
		.attr('font-weight', "bold")
		.attr('font-family', legendFont)
		.attr('fill', "black")
		.text((j+1))
	};
}
////// Activity Number Within Each Month
totalLineChart.append('text')
.attr('x', fontSize/4)
.attr('y', fontSize)
.attr('font-size', fontSize) 
.attr('font-weight', "bold")
.attr('font-family', legendFont) 
.attr('fill', totalcolor)
.attr('fill-opacity', fillOpacity)
.text("ACTIVITIES")

/////// GET TOTAL MAX INTIMACY
var maxmonthintimacy = 0
for (var i = 0; i < yearlist.length; i++) {
	var year=yearlist[i]
	if(all_yeardata[year].maxmonthintimacy > maxmonthintimacy)
		maxmonthintimacy = all_yeardata[year].maxmonthintimacy
};
var totalScale_y = d3.scale.linear()
	.domain([0, maxmonthintimacy])
	.range([totalHSize*yearwidth, totalHSize*yearwidth*0.1]);

////// DRAW LINE CHART
var pointList = []
for (var i = 0; i < yearlist.length; i++) {
	var year = yearlist[i]
	var totalList = all_timedata[year]["total"]
	var monthList = all_timedata[year]["month"]
	for(var j=1; j<=12; j++){
		var total = totalList[j-1]
		pointList.push([totalScale_y(total),totalScale_y(monthList[j-1][6]*total),totalScale_y(monthList[j-1][7]*total),totalScale_y(monthList[j-1][8]*total)])
	}
};

totalLineChart.selectAll('.area')
.data(TotalColor).enter()
.append('polygon')
.attr('class', function(d, i){
	return "area"+i+" area"
})
.attr('points', function(d, i){
	var s=(monthwidth/2)+","+(totalHSize*yearwidth)+" ";
	var thisPointList=[]
	for (var j = 0; j < pointList.length; j++) {
		thisPointList.push([(monthwidth/2)+monthwidth*j, pointList[j][i]])
	};
	s+=thisPointList;
	s+=" "+(width-monthwidth/2)+","+(totalHSize*yearwidth);
	return s;
})
.attr('fill', function(d){
	return d
})

// for (var i = 1; i < pointList.length; i++) {
// 	totalLineChart.append('line')	
// 	.attr('x1', monthwidth/2 + monthwidth *(i-1))
// 	.attr('y1', pointList[i-1])	
// 	.attr('x2', monthwidth/2 + monthwidth * i)
// 	.attr('y2', pointList[i])
// 	.attr('stroke', "orange")
// 	.attr('stroke-width', 5)
// };

// totalLineChart.selectAll('.totalPoint')
// 	.data(pointList).enter()
// 	.append('circle')
// 	.attr('cx', function(d,i){
// 		return monthwidth/2 + monthwidth *i
// 	})
// 	.attr('cy', function(d,i){
// 		return d
// 	})
// 	.attr('r', 3)
// 	.attr('fill', "red")

////////////////////// LIKE HISTOGRAM //////////////////////////
var likebgcolor = "#31A4BE"
var likeLeftFontSize = totalLegendFontSize
var likeHSize = 0.6
var likeHistogram = graph.append('g').attr('id', "likeHistogram")
					.attr('transform', 'translate(' + 0 + ',' + (0.8*yearwidth) + ')')
var likeOtherColor = "#049DBF"
var likeMeColor = "#034C8C"
var LikeGap = 1.5 * monthFontSize

////// LIKE HISTOGRAM LEFTGRAPH //////
var likeLeft = leftGraph.append('g').attr('id', "likeLeft")
				.attr('transform', 'translate(' + 0 + ',' + (0.8*yearwidth) + ')')
likeLeft.append('rect')
.attr('width', leftGraphWidth)
.attr('height', yearwidth*likeHSize*2 + LikeGap)
.attr('fill', likebgcolor)

likeLeft.append('text')
.attr('x', likeLeftFontSize*0.5)
.attr('y', likeLeftFontSize*1.5)
.attr('font-size', likeLeftFontSize) 
.attr('font-weight', "bold")
.attr('font-family', legendFont) 
.attr('fill', "white")
.attr('fill-opacity', 0.8)
.text("Top 3 friends you like most")


likeLeft.selectAll(".top3likeother")
.data(top3likeother).enter()
.append('svg:image')
.attr('x', function(d,i){
	return leftGraphWidth*0.1 + leftGraphWidth*0.3*i
})
.attr('y', likeLeftFontSize*2)
.attr("xlink:href", function(d,i){
	return "https://"+d.pic
})
.attr('width', leftGraphWidth*0.2)
.attr('height', leftGraphWidth*0.2)

likeLeft.selectAll(".top3likeother")
.data(top3likeother).enter()
.append('text')
.attr('x', function(d,i){
	return leftGraphWidth*0.1 + leftGraphWidth*0.3*i
})
.attr('y', yearwidth*likeHSize)
.attr('font-size', likeLeftFontSize*0.7) 
.attr('font-family', legendFont) 
.attr('fill', "white")
.attr('fill-opacity', 0.8)
.text(function(d){
	return d.name.split(" ")[0]
})

likeLeft.append('text')
.attr('x', likeLeftFontSize*0.5)
.attr('y', yearwidth*likeHSize + likeLeftFontSize*1.5)
.attr('font-size', likeLeftFontSize) 
.attr('font-weight', "bold")
.attr('font-family', legendFont)
.attr('fill', "white")
.attr('fill-opacity', 0.8)
.text("Top 3 friends like you most")

likeLeft.selectAll(".top3likeme")
.data(top3likeme).enter()
.append('svg:image')
.attr('x', function(d,i){
	return leftGraphWidth*0.1 + leftGraphWidth*0.3*i
})
.attr('y', yearwidth*likeHSize + likeLeftFontSize*2)
.attr("xlink:href", function(d,i){
	return "https://"+d.pic
})
.attr('width', leftGraphWidth*0.2)
.attr('height', leftGraphWidth*0.2)

likeLeft.selectAll(".top3likeme")
.data(top3likeme).enter()
.append('text')
.attr('x', function(d,i){
	return leftGraphWidth*0.1 + leftGraphWidth*0.3*i
})
.attr('y', yearwidth*likeHSize*2)
.attr('font-size', likeLeftFontSize*0.7) 
.attr('font-family', legendFont) 
.attr('fill', "white")
.attr('fill-opacity', 0.8)
.text(function(d){
	return d.name.split(" ")[0]
})
///// BACKGROUND
likeHistogram.append('rect')
.attr('x', 0)
.attr('width', (width-leftGraphWidth))
.attr('height', yearwidth*likeHSize*2 + LikeGap)
.attr('fill', likebgcolor)
.attr('fill-opacity', .2)

likeHistogram.append('text')
.attr('x', fontSize/4)
.attr('y', fontSize)
.attr('font-size', fontSize) 
.attr('font-weight', "bold")
.attr('font-family', legendFont) 
.attr('fill', likebgcolor)
.attr('fill-opacity', fillOpacity)
.text("I \"LIKE\" OTHERS")
likeHistogram.append('text')
.attr('x', fontSize/4)
.attr('y', yearwidth*likeHSize*2 + LikeGap - fontSize/4)
.attr('font-size', fontSize) 
.attr('font-weight', "bold")
.attr('font-family', legendFont) 
.attr('fill', likebgcolor)
.attr('fill-opacity', fillOpacity)
.text("OTHERS \"LIKE\" ME")

likeHistogram.append('line')
.attr('x1', 0)
.attr('y1', yearwidth*likeHSize+LikeGap/2)
.attr('x2', width)
.attr('y2', yearwidth*likeHSize+LikeGap/2)
.attr('stroke', "white")
.attr('stroke-width', LikeGap)

for(var i = 0; i < yearnum; i++){
	for (var j = 0; j < 12; j++) {
		likeHistogram.append('text')
		.attr('x', yearwidth * i + monthwidth * j)
		.attr('y', yearwidth*likeHSize + monthFontSize)
		.attr('font-size', monthFontSize)
		.attr('font-weight', "bold")
		.attr('font-family', legendFont)
		.attr('fill', "black")
		.text((j+1))
	};
}

var maxlikeme=0, 
	maxlikeother=0;
for (var i = 0; i < yearlist.length; i++) {
	var year = yearlist[i]
	if(all_yeardata[year]["maxlikeother"] > maxlikeother)
		maxlikeother = all_yeardata[year]["maxlikeother"]
	if(all_yeardata[year]["maxlikeme"] > maxlikeme)
		maxlikeme = all_yeardata[year]["maxlikeme"]
};
// var maxlike = maxlikeme > maxlikeother ? maxlikeme : maxlikeother
var likeHistogramScale_y1 = d3.scale.linear()
							.domain([0, maxlikeother])
							.range([likeHSize*yearwidth, likeHSize*yearwidth*0.1]);
var likeHistogramScale_y2 = d3.scale.linear()
							.domain([0, maxlikeme])
							.range([likeHSize*yearwidth + LikeGap, likeHSize*yearwidth*1.9 + LikeGap]);
pointList = []							
var maxotheri=0, maxmei=0;
for (var i = 0; i < yearnum; i++) {
	var year = yearlist[i]
	var monthList = all_timedata[year]["month"]
	for (var j = 1; j <= 12; j++) {
		if(monthList[j-1][3] == maxlikeother) maxotheri = i*12+j-1
		if(monthList[j-1][4] == maxlikeme) maxmei = i*12+j-1
		pointList.push([likeHistogramScale_y1(monthList[j-1][3]),likeHistogramScale_y2(monthList[j-1][4])])
	};
};

//////////////// MAX NUMBER LEGEND
likeHistogram.append('text')
.attr('x', maxotheri*monthwidth)
.attr('y', likeHistogramScale_y1(maxlikeother)-likeLeftFontSize/3)
.attr('font-size', likeLeftFontSize) 
.attr('font-weight', "bold")
.attr('font-family', legendFont) 
.attr('fill', likeOtherColor)
.attr('fill-opacity', 1)
.text(maxlikeother)
likeHistogram.append('text')
.attr('x', maxmei*monthwidth)
.attr('y', likeHistogramScale_y2(maxlikeme)+likeLeftFontSize)
.attr('font-size', likeLeftFontSize) 
.attr('font-weight', "bold")
.attr('font-family', legendFont) 
.attr('fill', likeMeColor)
.attr('fill-opacity', 1)
.text(maxlikeme)

likeHistogram.selectAll('.columnUp')
.data(pointList).enter()
.append('rect')
.attr('class', "columnUp")
.attr('x', function(d,i){
	return monthwidth*i
})
.attr('y', function(d,i){
	return d[0]
})
.attr('width', monthwidth)
.attr('height', function(d,i){
	return likeHSize*yearwidth - d[0]
})
.attr('fill', likeOtherColor)
.attr('stroke', "white")
.attr('stroke-width', 1)
likeHistogram.selectAll('.columnDown')
.data(pointList).enter()
.append('rect')
.attr('class', "columnDown")
.attr('x', function(d,i){
	return monthwidth*i
})
.attr('y', function(d,i){
	return likeHSize*yearwidth + LikeGap
})
.attr('width', monthwidth)
.attr('height', function(d,i){
	return d[1] - (likeHSize*yearwidth + LikeGap)
})
.attr('fill', likeMeColor)
.attr('stroke', "white")
.attr('stroke-width', 1)

//////////////////////////// NEW FRIEND LINE CHART /////////////////
var newfriendcolor = "#8FBA48"
var newfriendLeftFontSize = totalLegendFontSize
var NewFrinedLineColor = "#78AF16"
var NewFrinedPointColor = "#2C6217"
var newFriendLineChart = graph.append('g').attr('id', "newFriendLineChart")
					.attr('transform', 'translate(' + 0 + ',' + (2.2*yearwidth) + ')')

//////////////////// NEW FRIEND GRAPHLEFT /////////////////////
var newfriendLeft = leftGraph.append('g').attr('id', "likeLeft")
				.attr('transform', 'translate(' + 0 + ',' + (2.2*yearwidth) + ')')
newfriendLeft.append('rect')
.attr('width', leftGraphWidth)
.attr('height', yearwidth)
.attr('fill', newfriendcolor)

newfriendLeft.append('text')
.attr('x', newfriendLeftFontSize*0.5)
.attr('y', newfriendLeftFontSize*1.5)
.attr('font-size', newfriendLeftFontSize) 
.attr('font-weight', "bold")
.attr('font-family', legendFont) 
.attr('fill', "white")
.attr('fill-opacity', 0.8)
.text("Top 3 friends you interact most")

/////// TOP3 HISTOGRAM
newfriendLeft.selectAll(".top3touch")
.data(top3touch).enter()
.append('text')
.attr('x', leftGraphWidth * 0.3)
.attr('y', function(d,i){
	return newfriendLeftFontSize*3 + yearwidth*0.25*i
})
.attr('font-size', likeLeftFontSize*0.7) 
.attr('font-family', legendFont) 
.attr('fill', "white")
.attr('fill-opacity', 0.8)
.text(function(d){
	return d.name.split(" ")[0]
})

var top3touchScale = d3.scale.linear()
.domain([0, top3touch[0].totalintimacy])
.range([0, leftGraphWidth * 0.6]);

newfriendLeft.selectAll('.top3touch')
.data(top3touch).enter()
.append('rect')
.attr('x', leftGraphWidth * 0.25)
.attr('y', function(d,i){
	return newfriendLeftFontSize*3.2 + yearwidth*0.25*i
})
.attr('width', function(d){
	return top3touchScale(d.totalintimacy)
})
.attr('height', newfriendLeftFontSize)
.attr('fill', "white")
.attr('fill-opacity', 0.5)

newfriendLeft.selectAll(".top3touch")
.data(top3touch).enter()
.append('svg:image')
.attr('x', leftGraphWidth * 0.15)
.attr('y', function(d,i){
	return newfriendLeftFontSize*2.5 + yearwidth*0.25*i
})
.attr("xlink:href", function(d,i){
	return "https://"+d.pic
})
.attr('width', leftGraphWidth*0.13)
.attr('height', leftGraphWidth*0.13)
/////// BACKGROUND
newFriendLineChart.append('rect')
.attr('width', (width-leftGraphWidth))
.attr('height', yearwidth)
.attr('fill', newfriendcolor)	
.attr('fill-opacity', 0.3)

for(var i = 0; i < yearnum; i++){
	for (var j = 0; j < 12; j++) {
		newFriendLineChart.append('text')
		.attr('x', yearwidth * i + monthwidth * j)
		.attr('y', yearwidth + monthFontSize)
		.attr('font-size', monthFontSize)
		.attr('font-weight', "bold")
		.attr('font-family', legendFont)
		.attr('fill', "black")
		.text((j+1))
	};
}

newFriendLineChart.append('text')
.attr('x', fontSize/4)
.attr('y', fontSize)
.attr('font-size', fontSize) 
.attr('font-weight', "bold")
.attr('font-family', legendFont) 
.attr('fill', newfriendcolor)
.attr('fill-opacity', fillOpacity)
.text("FRIENDS")

var pointList = []
var friendNum = 0 
for (var i = 0; i < yearnum; i++) {
	var year = yearlist[i]
	var monthList = all_timedata[year]["month"]
	for (var j = 0; j< 12; j++) {
		friendNum += monthList[j][5]
		pointList.push(friendNum)
	};
};
var friendNumScale_y = d3.scale.linear()
						.domain([0,friendNum])
						.range([yearwidth, yearwidth*0.1]);

////// NEW FRIEND NUMBER LEGEND
for(var i=1; i<=yearnum; i++){
	newFriendLineChart.append('text')
	.attr('x', yearwidth*i - fontSize*0.3*2)
	.attr('y', friendNumScale_y(pointList[12*i-1]) - fontSize*0.3/2)
	.attr('font-size', fontSize*0.3) 
	.attr('font-weight', "bold")
	.attr('font-family', legendFont) 
	.attr('fill', NewFrinedPointColor)
	.attr('fill-opacity', 1)
	.text(pointList[12*i-1])
}

for (var i = 1; i < pointList.length; i++) {
	newFriendLineChart.append('line')
	.attr('x1', monthwidth/2 + monthwidth * (i-1))
	.attr('y1', friendNumScale_y(pointList[i-1]))
	.attr('x2', monthwidth/2 + monthwidth * i)
	.attr('y2', friendNumScale_y(pointList[i]))
	.attr('stroke', NewFrinedLineColor)
	.attr('stroke-width', 5)

	// var V =[[monthwidth/2 + monthwidth * (i-1),friendNumScale_y(pointList[i-1])],
	// 		[monthwidth/2 + monthwidth * i,friendNumScale_y(pointList[i])],
	// 		[monthwidth/2 + monthwidth * i,yearwidth],
	// 		[monthwidth/2 + monthwidth * (i-1),yearwidth]]
	// var area = (2*yearwidth-friendNumScale_y(pointList[i-1])-friendNumScale_y(pointList[i]))*monthwidth/2
	// var spots = getSpotsList(V, area/100)
	// for(var	j=0; j<spots.length; j++){
	// 	newFriendLineChart.append('circle')
	// 	.attr('cx', spots[j][0])
	// 	.attr('cy', spots[j][1])
	// 	.attr('r', 2)
	// 	.attr('fill', NewFrinedPointColor)
	// }
};
newFriendLineChart.selectAll(".newFriend")
.data(pointList).enter()
.append('circle')
.attr('cx', function(d,i){
	return monthwidth/2 + monthwidth *i
})
.attr('cy', function(d,i){
	return friendNumScale_y(d)
})
.attr('r', 3)
.attr('fill', NewFrinedPointColor)


///////////////////////////// Spots function ////////////////////////
function getTriangleArea(x1,y1,x2,y2,x3,y3){ 
	return 0.5 * Math.abs( x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2))
}
//get a random point within triangle ABC
function getTriangleRandom(A, B, C){
	var r1=Math.random()
	var r2=Math.random()
	var x = (1-Math.sqrt(r1)) * A[0] + Math.sqrt(r1)*(1-r2)*B[0] + Math.sqrt(r1) * r2 *C[0]
	var y = (1-Math.sqrt(r1)) * A[1] + Math.sqrt(r1)*(1-r2)*B[1] + Math.sqrt(r1) * r2 *C[1]
	return [x, y]
}
function getSpotsList(V, spotsnum){
	if(spotsnum<1) return []
	var trianglearealist = []
	var totalarea = 0
	var resultlist = []
	for(var i=0; i<V.length-3; i++){
		var area = getTriangleArea(V[0][0],V[0][1], V[i+1][0],V[i+1][1], V[i+2][0],V[i+2][1])
		totalarea += area
		trianglearealist.push(totalarea)
	}
	for(var i=0; i<trianglearealist.length-3; i++){
		trianglearealist[i] /= totalarea
	}

	/// Generate spotsnum spots within polygon "V"
	for(var num=1; num<=spotsnum; num++){
		var r = Math.random()
		var i
		for (i = 0; i < trianglearealist.length; i++) {
			if(r <= trianglearealist[i]) break
		};
		resultlist.push(getTriangleRandom(V[0],V[i+1],V[i+2]))
	}

	return resultlist
}

$("#status").text("Conventional vis is done...")


