/*
 Name: flower.js
 Author: yudun
 Description: the renderer for the bouquet in this order:

 1. petals
 1.1 outerpetal
 1.2 innerpetal
 2. petalspots
 3. outstamens
 3.1 outstamenbody
 3.2 outstamenhead
 4. flowerheart
 4.1 userpetal (small petal around heart)
 4.2 innerstamens
 5. pedicels
 6. the vase
 */

//////////////////////////// RENDER FLOWERS /////////////////////////////////////
for (var flowernum = 0; flowernum < yearlist.length; flowernum++) {

    // get data for the current flower to be rendered
    var year = yearlist[flowernum]
    var timedata = all_timedata[year]
    var yeardata = all_yeardata[year]
    var maxmonthintimacy = yeardata.maxmonthintimacy
    var totaluserintimacy = yeardata.totaluserintimacy
    var maxuserintimacy = yeardata.maxuserintimacy
    var maxlikeother = yeardata.maxlikeother
    var maxlikeme = yeardata.maxlikeme
    var maxratio = yeardata.maxratio
    var userid = yeardata.userid
    var total = timedata["total"]
    var month = timedata["month"]
    var toplist = timedata["toplist"]
    var posts = []
    var stamenlist = []
    var maxpostlikes = 0
    var totalpostlikes = 0
    if ("maxpostlikes" in yeardata) {
        maxpostlikes = yeardata["maxpostlikes"]
        totalpostlikes = yeardata["totalpostlikes"]
        posts = all_posts[year]
        if (posts.length > 100) {
            posts = posts.slice(0, 100)
        }
    }

    // create group for this flower
    var flower = svgflower
        .append("g")
        .attr('id', "bouquet_flower" + year)
        .attr("transform", "translate(" + (width / 2 + flowerposition[flowernum].x) + "," + (height / 2 + flowerposition[flowernum].y + bouquet_correctiony) + "), scale(" + flowersizescale(maxmonthintimacy) + ")")
        .style("filter", "url(#dropShadow)")

    var heartradius = baseheartradius * flowersizescale(maxmonthintimacy)
    if ("maxpostlikes" in yeardata) {
        //////////////////// Calculate the position of each stamen //////////////
        // initialize their positions
        for (var i = 0; i < posts.length; i++) {
            var id = posts[i].id
            var likecount = posts[i].likecount
            stamenlist.push({})
            stamenlist[i].id = id
            stamenlist[i].scale = getStamenScale(likecount / totalpostlikes)
            stamenlist[i].x = 0
            stamenlist[i].y = 0
            stamenlist[i].r = stamenlist[i].scale * basicstamenradius
        };
        //Sort stamen(user) by their radius large --> small
        stamenlist.sort(function(a, b) {
            return b.r - a.r
        })
        //calculating their positions
        for (var i = 0; i < stamenlist.length; i++) {
            var point = stamenlist[i]
            var result = spiralDetect(stamenlist, point.r, i)
            stamenlist[i].x = result.x
            stamenlist[i].y = result.y
            // console.log(i+" isdone s:"+ point.scale+" "+point.x+","+point.y)
            $("#status").text("Rendering Bouquet for flower " + year + " (" + (i / stamenlist.length) * 100 + "%)")
        };
    }


    //////////////////////////////////// RENDER PETAL ////////////////////////////
    var sizescale_x = d3.scale.pow().exponent(0.5)
        .domain([0, maxlikeother])
        .range([minpetalscale_x, 1]);
    var sizescale_y = d3.scale.pow().exponent(0.5)
        .domain([0, maxmonthintimacy])
        .range([minpetalscale_y, 1]);
    var strokescale = d3.scale.pow().exponent(0.5)
        .domain([0, maxlikeme])
        .range([minstrokescale * flowersizerate, 10 * flowersizerate]);
    var innersizescale = d3.scale.pow().exponent(0.5)
        .domain([0, 1])
        .range([mininnerpetalscale, 1]);

    var petal = flower.selectAll("#bouquet_flower" + year + ".bouquet_petal")
        .data(month).enter()
        .append('g')
        .attr("class", "bouquet_petal")
        .attr('id', function(d, i) {
            return "petal_" + flowernum + "_" + i
        })


    ///////////////////////// OUTER PETAL ////////////////////
    petal.append("path")
        .attr('class', "basicpetal")
        .attr('d', function(d, i) {
            // Don't draw anything if it's vacant
            if (total[i] == 0) return ""
            var V = [
                [0, 0],
                [98, -41],
                [186, -55],
                [276, -16],
                [219, 27],
                [145, 43],
                [70, 30],
                [0, 0]
            ]
            var sx = sizescale_x(d[3])
            var sy = sizescale_y(total[i])
            for (var i = 0; i < V.length; i++) {
                V[i][0] *= sx;
                V[i][1] *= sy;
            };
            var cp = getControlPoint(V)
            var px = cp.px,
                py = cp.py
            var result = "M" + V[0][0] + "," + V[0][1]
            for (var j = 0; j < 7; j++) {
                result += " C" + px.p1[j] + "," + py.p1[j] + "," + px.p2[j] + "," + py.p2[j] + "," + V[j + 1][0] + "," + V[j + 1][1]
            }
            return result
        })
        .attr('fill', function(d, i) {
            if (total[i] == 0) return "url(#vacant_petalcolor)"
            return "url(#petalcolor)";
        })
        // .attr('fill-opacity', function(d,i){
        //     if(total[i]==0) return 0.5;
        // })
        .attr('stroke', function(d, i) {
            if (total[i] == 0) return outterPetalColor
            else return outterPetalStrokeColor
        })
        .attr('stroke-width', function(d, i) {
            var factor = flowersizescale(maxmonthintimacy)
            return strokescale(d[4]) / factor
        })
        // .attr('stroke-dasharray', "20,10,5,5,5,10")
        .attr("transform", function(d, i) {
            var factor = flowersizescale(maxmonthintimacy)
            return "translate(" + (heartradius / factor) + ", 0), rotate(" + (i * 30 - 75) + "," + (-heartradius / factor) + ",0)"
        })
        .style('filter', function(d, i) {
            if (total[i] == 0) return "url(#crumpled)"
            else return ""
        })


    ///////////////////////// INNER PETAL ////////////////////
    for (var innerpetalnum = 1; innerpetalnum <= 3; innerpetalnum++) {
        petal.append("path")
            .attr('class', "petal" + innerpetalnum)
            .attr('d', function(d, i) {
                if (total[i] == 0 || d[innerpetalnum - 1] == 0) return ""
                var V = [
                    [0, 0],
                    [106, -48],
                    [166, -57],
                    [218, -49],
                    [234, -10],
                    [175, 11],
                    [114, 15],
                    [0, 0]
                ]
                var sx = sizescale_x(d[3])
                var sy = sizescale_y(total[i])
                for (var i = 0; i < V.length; i++) {
                    V[i][0] *= sx;
                    V[i][1] *= sy;
                };

                var cp = getControlPoint(V)
                var px = cp.px,
                    py = cp.py
                // console.log(cp)
                var result = "M" + V[0][0] + "," + V[0][1]
                for (var j = 0; j < V.length - 1; j++) {
                    result += " C" + px.p1[j] + "," + py.p1[j] + "," + px.p2[j] + "," + py.p2[j] + "," + V[j + 1][0] + "," + V[j + 1][1]
                }
                return result
            })
            .attr('fill', "url(#petalcolor" + innerpetalnum + ")")
            .attr('fill-opacity', function(d, i) {
                if (total[i] == 0) return 0;
            })
            .attr('stroke', function(d, i) {
                if (total[i] == 0) return outterPetalColor
                else return ""
            })
            .attr('stroke-width', function(d, i) {
                if (total[i] == 0) return 4
                else return 0
            })
            .attr('stroke-dasharray', "20,10,5,5,5,10")
            .attr("transform", function(d, i) {
                var innerfactor = innersizescale(d[innerpetalnum - 1])
                if (innerfactor == 0) return ""
                var factor = innerfactor * flowersizescale(maxmonthintimacy)
                return "scale(" + innerfactor + "), translate(" + (heartradius / factor) + ",0), rotate(" + (i * 30 - 75) + "," + (-heartradius / factor) + ",0)"
            })
        // .style("filter",function(d,i){
        //     if(total[i]!=0){
        //     	if(innerpetalnum!=4) return "url(#bouquet_blur)"
        //     	else return "url(#lightblur)"
        //     }
        //     else return ""
        // })
    }


    //////////////////// NEW FRIENDS SPOTS ////////////////
    for (var monthnum = 0; monthnum < 12; monthnum++) {
        var newfriendnum = month[monthnum][5]
        if (newfriendnum > 50) {
            newfriendnum = 50
        }
        // Get the vetexes of each petal
        var V = [
            [0, 0],
            [98, -41],
            [186, -55],
            [276, -16],
            [219, 27],
            [145, 43],
            [70, 30],
            [0, 0]
        ]
        var sx = sizescale_x(month[monthnum][3])
        var sy = sizescale_y(total[monthnum])
        for (var i = 0; i < V.length; i++) {
            V[i][0] *= sx;
            V[i][1] *= sy;
        };

        var spotslist = getSpotsList(V, newfriendnum)

        var petalspots = d3.select("#petal_" + flowernum + "_" + monthnum)
            .append('g')
            .attr('class', "petalspots");

        petalspots.selectAll(".spots")
            .data(spotslist).enter()
            .append('path')
            .attr('class', "spots")
            .attr('d', function(d, i) {
                var V = [
                    [0, 0],
                    [-1, -12],
                    [36, -6],
                    [0, 0]
                ]
                var sx = 0.1
                var sy = 0.1
                for (var i = 0; i < V.length; i++) {
                    V[i][0] *= sx;
                    V[i][1] *= sy;
                };
                var cp = getControlPoint(V)
                var px = cp.px,
                    py = cp.py
                // console.log(cp)
                var result = "M" + V[0][0] + "," + V[0][1]
                for (var j = 0; j < V.length - 1; j++) {
                    result += " C" + px.p1[j] + "," + py.p1[j] + "," + px.p2[j] + "," + py.p2[j] + "," + V[j + 1][0] + "," + V[j + 1][1]
                }
                console.log(result)
                return result
            })
            .attr('fill', petalspotcolor)
            .attr('transform', function(d, i) {
                var factor = flowersizescale(maxmonthintimacy)
                return "translate(" + (heartradius / factor + d[0]) + "," + d[1] + "), rotate(" + (monthnum * 30 - 75) + "," + (-(heartradius / factor + d[0])) + "," + (-d[1]) + ")"
            })
        // .style('filter', 'url(#spotblur)')
    }


    //////////////////////// OUTSTAMEN ////////////////////
    for (var monthnum = 0; monthnum < 12; monthnum++) {
        var outstamen = d3.select("#petal_" + flowernum + "_" + monthnum)
            .append('g')
            .attr('class', "outstamen");

        var monthtoplist = toplist[monthnum]
        // console.log(monthnum+": "+monthtoplist.length)
        //////////////////// RENDER OUTSTAMEN BODY ////////////////////
        outstamen.selectAll(".outstamenbody")
            .data(monthtoplist).enter()
            .append('polygon')
            .attr('class', "outstamenbody")
            .attr('id', function(d, i) {
                return "outstamen_" + flowernum + "_" + monthnum + "_" + i;
            })
            .attr("points", function(d, i) {
                var len = getOutStamenLen(month[monthnum], d.type, sizescale_x(month[i][3]))
                var pouter = generateOutStamen(d.ratio, d.clockwise, len, 0, maxratio)
                var pinner = generateOutStamen(d.ratio, d.clockwise, len, 1, maxratio)
                // petalPointList[i] = [[0,0]].concat(pouter).concat(pinner.reverse())
                return [
                    [0, 0]
                ].concat(pouter).concat(pinner.reverse())
            })
            .attr("fill", function(d, i) {
                return "url(#outterstamebodycolor)"
            })
            .attr("stroke-width", 0.5)
            .attr("stroke", function(d) {
                return "gray"
            })
            .attr("transform", function(d, i) {
                var factor = flowersizescale(maxmonthintimacy)
                return "translate(" + (heartradius / factor) + ",0), rotate(" + (monthnum * 30 - 75 - 5 + 5 * i) + "," + (-heartradius / factor) + ",0)"
            })

        //////////////////// RENDER OUTSTAMEN HEAD ////////////////////
        outstamen.selectAll(".outstamenhead")
            .data(monthtoplist).enter()
            .append('circle')
            .attr('class', "outstamenhead")
            .attr('cx', function(d, i) {
                return getOutStamenLen(month[monthnum], d.type, sizescale_x(month[i][3]))
            })
            .attr('r', outstamenradius)
            .attr('fill', "url(#outterstameheadcolor)")
            .attr("transform", function(d, i) {
                var factor = flowersizescale(maxmonthintimacy)
                return "translate(" + (heartradius / factor) + ",0), rotate(" + (monthnum * 30 - 75 - 5 + 5 * i) + "," + (-heartradius / factor) + ",0)"
            })
    }


    /////////////////////// FLOWER HEART //////////////////////
    var heart = flower.append('g').attr("class", "heartbase")

    ///////////////////////// USERPETAL //////////////////////
    var userpetallist = []
    var userpetalsizescale = d3.scale.pow().exponent(0.5)
        .domain([0, maxuserintimacy])
        .range([0.3, 1.5]);

    for (var i = 0; i < userid.length; i++) {
        var id = userid[i]
        var intimacy = frienddata[id].intimacy[year]
        userpetallist.push({})
        userpetallist[i].id = id
        userpetallist[i].scale = userpetalsizescale(intimacy)
    };

    if (userid.length > 20)
        userpetalstep = 13
    else userpetalstep = 360 / userid.length

    userpetallist.sort(function(a, b) {
        return b.scale - a.scale;
    })
    all_userpetallist[year] = userpetallist

    heart.selectAll(".userpetal")
        .data(userpetallist).enter()
        .append("path")
        .attr('id', function(d, i) {
            return "userpetal_" + flowernum + "_" + i
        })
        .attr('class', "userpetal")
        .attr('d', function(d) {
            var V = [
                [0, 0],
                [35, -22],
                [62, -27],
                [102, -2],
                [66, 23],
                [38, 25],
                [20, 10],
                [0, 0]
            ]
            for (var i = 0; i < V.length; i++) {
                V[i][0] *= 0.3
                V[i][1] *= 0.3
            };

            var cp = getControlPoint(V)
            var px = cp.px,
                py = cp.py
            // console.log(cp)
            var result = "M" + V[0][0] + "," + V[0][1]
            for (var j = 0; j < V.length - 1; j++) {
                result += " C" + px.p1[j] + "," + py.p1[j] + "," + px.p2[j] + "," + py.p2[j] + "," + V[j + 1][0] + "," + V[j + 1][1]
            }
            return result
        })
        .attr('fill', "url(#userpetalcolor)")
        .attr('stroke', "black")
        .attr('stroke-width', 1)
        .attr('transform', function(d, i) {
            var factor = d.scale
            return "scale(" + factor + "), translate(" + ((userpetalradius - 10 * factor) / factor) + ", 0), rotate(" + (userpetalstep * i - 90) + ", " + (-(userpetalradius - 10 * factor) / factor) + ", 0)"
        })

    heart.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', baseheartradius)
        .attr('fill', outterPetalColor)
        .attr('opacity', .5)


    ///////////////////////// STAMEN //////////////////////
    var heart = flower.append("g").attr('class', "heart")
    heart.selectAll(".stamen")
        .data(stamenlist).enter()
        .append("path")
        .attr('id', function(d, i) {
            return "stamen_" + flowernum + "_" + i
        })
        .attr('class', "bouquet_stamen")
        .style('cursor', 'pointer')
        .attr('d', function(d) {
            var stamensidelen = 5
            var V = [
                [stamensidelen, stamensidelen],
                [-stamensidelen, stamensidelen],
                [-stamensidelen, -stamensidelen],
                [stamensidelen, -stamensidelen],
                [stamensidelen, stamensidelen]
            ]

            var cp = getControlPoint(V)
            var px = cp.px,
                py = cp.py

            var result = "M" + V[0][0] + "," + V[0][1]
            for (var j = 0; j < V.length - 1; j++) {
                result += " C" + px.p1[j] + "," + py.p1[j] + "," + px.p2[j] + "," + py.p2[j] + "," + V[j + 1][0] + "," + V[j + 1][1]
            }
            return result
        })
        .attr('fill', "url(#stamencolor)")
        .attr('stroke', "black")
        .attr('stroke-width', 1)
        .attr('transform', function(d, i) {
            var factor = d.scale
            if (factor == 0) factor = 1
            return "scale(" + factor + "), translate(" + (d.x / factor) + "," + (d.y / factor) + ")"
        })
};


///////////////////////////// RENDER PEDICEL ////////////////////////////////
var pediceltop_xscale = d3.scale.linear()
    .domain([minpositionx + positioncorrection_x, maxpositionx + positioncorrection_x])
    .range([(vasecorrect_x + vasestartx) * vasesizerate_x, (vasecorrect_x + vasestartx + vasetopwidth) * vasesizerate_x]);
var pediceltop_y = (vasestarty + vasecorrect_y) * vasesizerate_y
var pedicelroot_x = 0
var pedicelroot_y = pediceltop_y + 100

svgpedicel.attr('transform', "translate(" + (width / 2) + "," + (height / 2 + bouquet_correctiony) + ")")

var minflowerradius = originpetalradius
var maxflowerradius = 0
for (var i = 0; i < flowerposition.length; i++) {
    if (flowerposition[i].r > maxflowerradius)
        maxflowerradius = flowerposition[i].r
    if (flowerposition[i].r < minflowerradius)
        minflowerradius = flowerposition[i].r
};
var pedicelwidthscale = d3.scale.linear()
    .domain([minflowerradius, maxflowerradius])
    .range([6, 14]);

svgpedicel.selectAll(".pedicel")
    .data(flowerposition.reverse()).enter()
    .append('path')
    .attr('d', function(d, i) {
        var halfpedicelwidth = pedicelwidthscale(d.r) / 2
        var topx = pediceltop_xscale(d.x)
        var V = [
            [pedicelroot_x + halfpedicelwidth, pedicelroot_y],
            [topx + halfpedicelwidth, pediceltop_y],
            [d.x + halfpedicelwidth, d.y],
            [d.x + halfpedicelwidth / 2, d.y],
            [d.x, d.y],
            [d.x - halfpedicelwidth / 2, d.y],
            [d.x - halfpedicelwidth, d.y],
            [topx - halfpedicelwidth, pediceltop_y],
            [pedicelroot_x - halfpedicelwidth, pedicelroot_y],
            [pedicelroot_x + halfpedicelwidth, pedicelroot_y]
        ]

        var cp = getControlPoint(V)
        var px = cp.px,
            py = cp.py
        var pedicelcontrolpointrate = 1.5
        px.p1[1] = d.x + halfpedicelwidth;
        py.p1[1] = d.y / pedicelcontrolpointrate;
        px.p2[1] = d.x + halfpedicelwidth;
        py.p2[1] = d.y / pedicelcontrolpointrate;
        px.p1[6] = d.x + halfpedicelwidth;
        py.p1[6] = d.y / pedicelcontrolpointrate;
        px.p2[6] = d.x - halfpedicelwidth;
        py.p2[6] = d.y / pedicelcontrolpointrate;
        // console.log(cp)
        var result = "M" + V[0][0] + "," + V[0][1]
        for (var j = 0; j < V.length - 1; j++) {
            result += " C" + px.p1[j] + "," + py.p1[j] + "," + px.p2[j] + "," + py.p2[j] + "," + V[j + 1][0] + "," + V[j + 1][1]
        }
        return result
    })
    .attr("fill", function(d, i) {
        return "url(#pedicelbodycolor)"
    })
    .attr("stroke-width", 2)
    .attr("stroke", pedicelstroke)
    .style('filter', 'url(#pedicelblur)')


///////////////////////////// RENDER VASE ////////////////////////////////
///// load the vase svg file
$.get(URL_PREFIX + "static/svg/vase.svg", null, function(data) {
    var svgNode = $("svg", data);
    var docNode = document.adoptNode(svgNode[0]);
    // console.log(docNode.childNodes[1])
    $("#vase").append(docNode.childNodes[1].childNodes[1])
    svgvase.attr('transform', "scale(" + vasesizerate_x + "," + vasesizerate_y + "), translate(" + ((width / 2) / vasesizerate_x + vasecorrect_x) + "," + ((height / 2 + bouquet_correctiony) / vasesizerate_y + vasecorrect_y) + ")")
    $("#vase").html($("#vase").html());

    ///// bottle top reference line
    // svgvase.append('line')
    // .attr('x1', vasestartx)
    // .attr('y1', vasestarty)
    // .attr('x2', vasestartx+vasetopwidth)
    // .attr('y2', vasestarty)
    // .attr("stroke", "black")
    // .attr("stroke-width", 10)
}, 'xml');

///// reference points for pedicel
// svgpedicel.append('circle')
// 	.attr('cx', minpositionx + positioncorrection_x)
// 	.attr('cy', (vasestarty + vasecorrect_y) * vasesizerate_y)
// 	.attr('r', 5)
// 	.attr('fill', "red")
// svgpedicel.append('circle')
// 	.attr('cx', maxpositionx + positioncorrection_x)
// 	.attr('cy', (vasestarty + vasecorrect_y) * vasesizerate_y)
// 	.attr('r', 5)
// 	.attr('fill', "red")
// svgpedicel.append('circle')
// 	.attr('cx', pedicelroot_x)
// 	.attr('cy', pedicelroot_y)
// 	.attr('r', 5)
// 	.attr('fill', "red")
// for (var i = 0; i < flowerposition.length; i++) {
// 	svgpedicel.append('circle')
// 	.attr('cx', pediceltop_xscale(flowerposition[i].x))
// 	.attr('cy', (vasestarty + vasecorrect_y) * vasesizerate_y)
// 	.attr('r', pedicelwidthscale(flowerposition[i].r)/2)
// 	.attr('fill', "blue")
// };


//////////////////// GUIDANCE ///////////////
var guidance = bouquetlegend.append("g").attr("class", "guidance").attr('id', "bouquet_guidance")
    .attr('transform', 'translate(' + 170 / 1366 * screen.availWidth + ',' + 0 / 1366 * screen.availWidth + ')')

guidance.append('text')
    .attr('font-family', legendFont)
    .attr('fill', "black")
    .attr('y', 20)
    .attr('x', 8)
    .attr('font-size', 15)
    .attr('font-weight', "bold")
    .text('HOW TO READ IT?')

guidance.append('rect')
    .attr("class", "btn btn-primary btn-lg guidanceBtn")
    .attr('data-toggle', "modal")
    .attr("data-target", "#bouquetguidance")
    .attr("width", 170)
    .attr('height', 30)
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('fill', "white")
    .attr('fill-opacity', .5)
    .attr("stroke", "steelblue")


////////////////// YEAR LEGEND ///////////////
var yearlegend = bouquetlegend.append("g").attr("class", "yearlegend")
    .attr("transform", "translate(" + 120 / 1366 * screen.availWidth + "," + (10 + (6 - (yearlist.length + 1) / 2) / 2 * 30) / 1366 * screen.availWidth + ")")
var yearlistFirst6 = yearlist.slice(0, (yearlist.length + 1) / 2)
var yearlistLast5 = yearlist.slice((yearlist.length + 1) / 2, yearlist.length)

for (var i = 0; i < yearlistFirst6.length; i++) {
    var id;
    id = "bouquetrec_" + yearlistFirst6[i]
    yearlegend.append("rect")
        .attr("class", "bouquetyear")
        .attr("id", id)
        .attr("x", -5)
        .attr("y", 30 * i + 10)
        .attr("width", 125)
        .attr("height", 22)
        .attr("fill", "white")
        .attr("stroke", "gray")
        .attr("stroke-width", .5)
        .style('filter', 'url(#legendDropShadow)')
};
for (var i = 0; i < yearlistLast5.length + 1; i++) {
    var id;
    if (i == yearlistLast5.length) id = "bouquetrec_all"
    else id = "bouquetrec_" + yearlistLast5[i]
    yearlegend.append("rect")
        .attr("class", "bouquetyear")
        .attr("id", id)
        .attr("x", i == yearlistLast5.length ? 150 - 1 : 150 - 5)
        .attr("y", 30 * i + 10)
        .attr("width", 125)
        .attr("height", 22)
        .attr("fill", "white")
        .attr("stroke", "gray")
        .attr("stroke-width", .5)
        .style('filter', i == yearlistLast5.length ? '' : 'url(#legendDropShadow)')
};

yearlegend.selectAll().data(yearlistFirst6)
    .enter().append("text")
    .attr("class", "bouquetyear")
    .attr("id", function(d) {
        return "bouquet" + d;
    })
    .attr("x", 30)
    .attr("font-family", legendFont)
    .attr("y", function(d, i) {
        return 30 * (i + 1)
    })
    .attr("font-size", 20)
    .attr("fill", "black")
    .style('cursor', 'default')
    .text(function(d) {
        return d;
    })

yearlegend.selectAll().data(yearlistLast5)
    .enter().append("text")
    .attr("class", "bouquetyear")
    .attr("id", function(d) {
        return "bouquet" + d;
    })
    .attr("x", 150 + 30)
    .attr("font-family", legendFont)
    .attr("y", function(d, i) {
        return 30 * (i + 1)
    })
    .attr("font-size", 20)
    .attr("fill", "black")
    .style('cursor', 'default')
    .text(function(d) {
        return d;
    })

yearlegend.append("text")
    .attr("class", "bouquetyear")
    .attr("id", "bouquetall")
    .attr("x", 150 + 6)
    .attr("font-family", legendFont)
    .attr("y", 30 * (yearlistLast5.length + 1))
    .attr("font-size", 20)
    .attr("fill", "lightgray")
    .style('cursor', 'default')
    .text("SHOW ALL")


//////////////// Guidance Button ////////////////////
$(".guidanceBtn").hover(
    function() {
        $(this).attr('fill-opacity', 0)
            .attr("stroke", "blue")
    },
    function() {
        $(this).attr('fill-opacity', .5)
            .attr("stroke", "steelblue")
    }
);
///////////// Guidance content
$(".guidance_keyword").attr("class", "label label-danger")
// $(".guidance_keysentence").attr("class", "label")


//////////////// Year Legend Button ////////////////////

///////// select specific year
var selectedyear = "all"
var tyear
var lasttransform = ""

function zoominNewFower(year) {
    $("#pedicel").fadeOut(1000)
    $("#vase").fadeOut(1000)
    for (var i = 0; i < yearlist.length; i++) {
        if (yearlist[i] == year || yearlist[i] == selectedyear) continue;
        $('#bouquet_flower' + yearlist[i]).fadeOut(1000)
    }

    lasttransform = $('#bouquet_flower' + year).attr('transform')
    d3.select('#bouquet_flower' + year)
        .transition()
        .delay(500)
        .duration(1000)
        .attr('transform', "translate(" + width / 2 + "," + height / 2 / correctfactor + "), scale(" + 0.8 / correctfactor + ")")
}

$(".bouquetyear").click(function() {
    var year = $(this).attr("id").replace("bouquetrec_", "").replace("bouquet", "")
    // console.log("year:" + year+" selectedyear:" + selectedyear)
    // if(year!="all"){
    //   $("#yearlegend").text(year)
    // }
    // else  $("#yearlegend").text("")

    if (year != selectedyear) {
        //recover lasted year legend
        $("#bouquetrec_" + selectedyear).css("filter", "url(#legendDropShadow)")
        $("#bouquetrec_" + selectedyear).attr("x", parseInt($("#bouquetrec_" + selectedyear).attr("x")) - 4)
        $("#bouquet" + selectedyear).attr("x", parseInt($("#bouquet" + selectedyear).attr("x")) - 4)
        $("#bouquet" + selectedyear).attr("fill", "black")
        // push current year legend down
        $("#bouquetrec_" + year).css("filter", "")
        $("#bouquetrec_" + year).attr("x", parseInt($("#bouquetrec_" + year).attr("x")) + 4)
        $("#bouquet" + year).attr("x", parseInt($("#bouquet" + year).attr("x")) + 4)
        $("#bouquet" + year).attr("fill", "lightgray")


        if (year != "all") {
            if (selectedyear != "all") {
                //recover all the flower
                // console.log(lasttransform)
                tyear = selectedyear;
                d3.select('#bouquet_flower' + selectedyear)
                    .transition()
                    .duration(500)
                    .attr('transform', lasttransform)
                    .each("end", function() {
                        $('#bouquet_flower' + tyear).fadeOut(1000);
                    });

                $("#pedicel").fadeIn(1000)
                $("#vase").fadeIn(1000)
                for (var i = 0; i < yearlist.length; i++) {
                    $('#bouquet_flower' + yearlist[i]).fadeIn(1000)
                }

                setTimeout(zoominNewFower(year, selectedyear), 2000);
            } else {
                zoominNewFower(year, selectedyear)
            }

        } else {
            //year = "all", recover all the flower
            d3.select('#bouquet_flower' + selectedyear)
                .transition()
                .attr('transform', lasttransform)

            $("#pedicel").fadeIn(1000)
            $("#vase").fadeIn(1000)
            for (var i = 0; i < yearlist.length; i++) {
                if (yearlist[i] == selectedyear) continue;
                $('#bouquet_flower' + yearlist[i]).fadeIn(1000)
            }
        }
        selectedyear = year
    }
});


//////////////// Hover Event ////////////////////
console.log(yearlist)
var idnum
var parent
var monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
$(".basicpetal, .petal1, .petal2, .petal3").hover(
    function() {
        parent = $(this).parent()
        idnum = parent.attr('id').split("_")
        var yearindex = idnum[1],
            petalindex = idnum[2]
        var year = yearlist[yearindex]
        var newfriendnum = all_timedata[year]["month"][petalindex][5]
        var topfriendstring = ""
        var toplist = all_timedata[year]["toplist"][petalindex]
        for (var i = 0; i < toplist.length; i++) {
            var id = toplist[i]["id"]
            topfriendstring += frienddata[id]["name"] + "<br/>" + '<img src=\'https://' + frienddata[id]["pic"] + '\' width=\'50\'>' + "<br/><br/>"
        }
        Tip('<b>New friend:' + newfriendnum + '</b><br/><br/><b>Friend you interact most:</b><br/>' + topfriendstring,
            TITLE, monthname[petalindex] + ". " + year)
        // console.log(data[idnum].year)
        d3.select("#petal_" + idnum[1] + "_" + idnum[2] + "> .basicpetal")
            .attr('stroke', outterPetalStrokeColor_hover)
    },
    function() {
        d3.select("#petal_" + idnum[1] + "_" + idnum[2] + "> .basicpetal")
            .attr('stroke', outterPetalStrokeColor)
        UnTip()
    }
);

var usernum
$(".userpetal").hover(
    function() {
        usernum = $(this).attr('id').split("_")
        $(this).attr("fill", "url(#userpetalcolor_hover)")

        var year = yearlist[usernum[1]]
        var userindex = usernum[2]
        var id = all_userpetallist[year][userindex].id
        Tip('<img src=\'https://' + frienddata[id]["pic"] + '\' width=\'50\'>',
            TITLE, frienddata[id]["name"])
    },
    function() {
        $("#userpetal_" + usernum[1] + "_" + usernum[2]).attr("fill", "url(#userpetalcolor)")
        UnTip();
    }
);

var postnum
$(".bouquet_stamen").hover(
    function() {
        postnum = $(this).attr('id').split("_")
        $(this).attr("fill", "url(#stamencolor_hover)")

        var year = yearlist[postnum[1]]
        var postindex = postnum[2]

        Tip('This post gets ' + all_posts[year][postindex]["likecount"] + ' likes')
    },
    function() {
        $("#stamen_" + postnum[1] + "_" + postnum[2]).attr("fill", "url(#stamencolor)")
        UnTip();
    }
);
$(".bouquet_stamen").click(
    function() {
        postnum = $(this).attr('id').split("_")

        var year = yearlist[postnum[1]]
        var postindex = postnum[2]
        var link = all_posts[year][postindex]["actionlink"]
        window.open(link)
    }
)

$("#status").text("Bouquet vis is Done...");