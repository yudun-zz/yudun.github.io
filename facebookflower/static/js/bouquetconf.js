/*
 Name: flowerconf.js
 Author: yudun
 Description: configuration for the shape of the bouquet
 */

/////////////////////////////////////////////////  GET DATA //////////////////////////////////////////////////
//Make sure the data processing is after the data transmission
$.ajaxSetup({
    async: false
});
var yearlist
var all_timedata
var frienddata
var all_yeardata
var all_posts
var all_userpetallist = []

$.getJSON(URL_PREFIX + "data/" + username_id + "/" + username_id + "_flower2_result.json", function(response) {
    yearlist = response.yearlist
    all_timedata = response.timedata
    frienddata = response.frienddata
    all_yeardata = response.yeardata
    all_posts = response.posts
})

/////////////////////////////////////////////////  FLOWER PARAMETERS //////////////////////////////////////////////////    
// flowersize
var flowersizerate = 0.45
var max_maxmonthintimacy = 0
for (var i = 0; i < yearlist.length; i++) {
    if (all_yeardata[yearlist[i]].maxmonthintimacy > max_maxmonthintimacy)
        max_maxmonthintimacy = all_yeardata[yearlist[i]].maxmonthintimacy
}
var flowersizescale = d3.scale.linear()
    .domain([0, max_maxmonthintimacy])
    .range([0.4 * flowersizerate, 1 * flowersizerate]);

// flower heart 
var baseheartradius = 60
var stamenarearadius = baseheartradius * 1
var userpetalradius = baseheartradius * 0.98

// outstamen
var maxoutstamenlen = 250
var outstmenwidth = 2
var outstamenradius = 3
var outstamenpositionrate = 0.7
var stepscale = d3.scale.linear()
    .domain([0, maxoutstamenlen])
    .range([50, 200]);
var alpha = Math.PI * (30 / 180),
    beta = Math.PI * (45 / 180)

// petal
var originpetalradius = 280
var minpetalscale = 0.5
var emptypetalsize_x = 0.4
var emptypetalsize_y = 0.3
var minpetalscale_x = emptypetalsize_x
var minpetalscale_y = emptypetalsize_y
var minstrokescale = 1
var mininnerpetalscale = 0.3
var petalspotradius = 1

// pedicel
var vasesizerate_x = 0.7
var vasesizerate_y = 0.4
var vasecorrect_x = -150
var vasecorrect_y = 100
var vasetopwidth = 130
var vasestartx = 80
var vasestarty = 30

//////////////////////////////////////////////////  Color Scheme  //////////////////////////////////////////////////    
//////////////// violet ///////////////
var outterPetalColor = "DarkViolet"
var outterPetalStrokeColor = "DarkViolet"
var outterPetalStrokeColor_hover = "Crimson"
var userpetalcolor = "DarkRed"
var userpetalcolor_hover = "Crimson"
var vancant_outterPetalColor = "white"
var innerPetalColor = ["hotpink", "yellow", "green", "green"]

var petalspotcolor = "brown"

var stamenColorInner = "Orchid"
var stamenColorInner_hover = "DarkRed"
var stamenColorOutter = "Indigo"
var stamenColorOutter_hover = "Crimson"

var outterstamenheadInner = "Khaki"
var outterstamenheadOutter = "red"
var outterstamenbody = "white"

var pedicelbodyoutercolor = "GreenYellow"
var pedicelbodyinnercolor = "green"
var pedicelstroke = "black"


//////////////////////////////////////////////////  CREATE SVG  //////////////////////////////////////////////////    
d3.select('body').append('svg').attr("id", "bouquetsvg")
    .style('display', 'none')

var margin = {
    top: 50 / 1366 * screen.availWidth,
    right: 10 / 1366 * screen.availWidth,
    bottom: 60 / 1366 * screen.availWidth,
    left: 0
};
var bouquetleftdistance = screen.availWidth / 2.5,
    bouquetrightdistance = screen.availWidth / 6;
var width = screen.availWidth - margin.left - margin.right - bouquetleftdistance - bouquetrightdistance,
    height = $(window).height() - margin.top - margin.bottom - $("#mainviewtitle").outerHeight();
var svgbouquetheight = height,
    svgbouquetleftmargin = bouquetleftdistance;
var svg = d3.select("#bouquetsvg")
    .attr("width", width + margin.left + margin.right + bouquetleftdistance + bouquetrightdistance)
    .attr("height", height + margin.top + margin.bottom)
    .append('g')
    .attr('id', "bouquet")
var bouquetlegend = d3.select("#bouquetsvg")
    .attr("height", height + margin.top + margin.bottom)
    .append('g')
    .attr('id', "bouquetlegend")
var svgpedicel = svg.append('g').attr('id', "pedicel")
var svgvase = svg.append('g').attr('id', "vase")
var svgflower = svg.append('g').attr('id', "mainflower")