/*
 Name: flowerfilter.js
 Author: yudun
 Description:  prepare all the filter and gradient that is needed for rendering the bouquet
 */

//filter
var filter = svgflower.append("defs")
//blur
filter.append("filter")
    .attr("id", "bouquet_blur")
    .attr("height", "2")
    .append("feGaussianBlur")
    .attr("in", "SourceGraphic")
    .attr("stdDeviation", 10)
//spotblur
filter.append("filter")
    .attr("id", "spotblur")
    .attr("height", "2")
    .append("feGaussianBlur")
    .attr("in", "SourceGraphic")
    .attr("stdDeviation", .7)
//lightblur
filter.append("filter")
    .attr("id", "lightblur")
    .attr("height", "2")
    .append("feGaussianBlur")
    .attr("in", "SourceGraphic")
    .attr("stdDeviation", 3)
//pedicelblur
filter.append("filter")
    .attr("id", "pedicelblur")
    .attr("height", "2")
    .append("feGaussianBlur")
    .attr("in", "SourceGraphic")
    .attr("stdDeviation", 1)
//shadow
var shadow = filter.append("filter")
    .attr("id", "dropShadow");
shadow.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 10);
shadow.append("feOffset").attr("dx", -20).attr("dy", 20);
var t = shadow.append("feMerge");
t.append('feMergeNode');
t.append("feMergeNode").attr("in", "SourceGraphic");

//legendShadow    
var shadow = filter.append("filter")
    .attr("id", "legendDropShadow");
shadow.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 3);
shadow.append("feOffset").attr("dx", 4).attr("dy", 4);
var t = shadow.append("feMerge");
t.append('feMergeNode');
t.append("feMergeNode").attr("in", "SourceGraphic");

//crumpled
var crumpled = filter.append("filter")
    .attr("id", "crumpled")
    .attr("height", "2")
    .append("feGaussianBlur")
    .attr("in", "SourceGraphic")
    .attr("stdDeviation", 2)
    .attr("result", "blur");

var gradient = svgflower.append("defs")
var t = gradient.append("svg:radialGradient")
    .attr("id", "petalcolor")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("fx", "50%")
    .attr("fy", "50%")
    .attr("r", "50%");
t.append("svg:stop")
    .attr("offset", "40%")
    .attr("stop-color", "white")
    .attr("stop-opacity", 0.5);
t.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", outterPetalStrokeColor)
    .attr("stop-opacity", 0.8)

var t = gradient.append("svg:radialGradient")
    .attr("id", "vacant_petalcolor")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("fx", "50%")
    .attr("fy", "50%")
    .attr("r", "50%");
t.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "white")
    .attr("stop-opacity", .5);
t.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", vancant_outterPetalColor)
    .attr("stop-opacity", 1)

var t = gradient.append("svg:radialGradient")
    .attr("id", "stamencolor")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("fx", "50%")
    .attr("fy", "50%")
    .attr("r", "50%");
t.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", stamenColorInner)
    .attr("stop-opacity", 1);
t.append("svg:stop")
    .attr("offset", "60%")
    .attr("stop-color", stamenColorOutter)
    .attr("stop-opacity", 1);
t.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", stamenColorOutter)
    .attr("stop-opacity", 1)

var t = gradient.append("svg:radialGradient")
    .attr("id", "stamencolor_hover")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("fx", "50%")
    .attr("fy", "50%")
    .attr("r", "50%");
t.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", stamenColorInner_hover)
    .attr("stop-opacity", 1);
t.append("svg:stop")
    .attr("offset", "60%")
    .attr("stop-color", stamenColorOutter_hover)
    .attr("stop-opacity", 1);
t.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", stamenColorOutter_hover)
    .attr("stop-opacity", 1)

var t = gradient.append("svg:radialGradient")
    .attr("id", "outterstameheadcolor")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("fx", "50%")
    .attr("fy", "50%")
    .attr("r", "50%");
t.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", outterstamenheadInner)
    .attr("stop-opacity", 1);
t.append("svg:stop")
    .attr("offset", "60%")
    .attr("stop-color", outterstamenheadOutter)
    .attr("stop-opacity", 1);
t.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", outterstamenheadOutter)
    .attr("stop-opacity", 1)

var t = gradient.append("svg:linearGradient")
    .attr("id", "outterstamebodycolor")
    .attr("x1", "0%")
    .attr("x2", "150%");
t.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", outterstamenbody)
    .attr("stop-opacity", 1);
t.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", outterstamenbody)
    .attr("stop-opacity", .6);

var t = gradient.append("svg:linearGradient")
    .attr("id", "pedicelbodycolor")
    .attr("x1", "0%")
    .attr("x2", "100%");
t.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", pedicelbodyoutercolor)
    .attr("stop-opacity", 1);
t.append("svg:stop")
    .attr("offset", "50%")
    .attr("stop-color", pedicelbodyinnercolor)
    .attr("stop-opacity", 1);
t.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", pedicelbodyoutercolor)
    .attr("stop-opacity", 1);

var t = gradient.append("svg:linearGradient")
    .attr("id", "userpetalcolor")
    .attr("x1", "0%")
    .attr("x2", "150%");
t.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "white")
    .attr("stop-opacity", 0.8);
t.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", userpetalcolor)
    .attr("stop-opacity", 1)

var t = gradient.append("svg:linearGradient")
    .attr("id", "userpetalcolor_hover")
    .attr("x1", "0%")
    .attr("x2", "150%");
t.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", userpetalcolor)
    .attr("stop-opacity", 0.8);
t.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", userpetalcolor_hover)
    .attr("stop-opacity", 1)

for (var i = 0; i < innerPetalColor.length; i++) {
    var t = gradient.append("svg:linearGradient")
        .attr("id", "petalcolor" + (i + 1))
        .attr("x1", "0%")
        .attr("x2", "150%");
    t.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", innerPetalColor[i])
        .attr("stop-opacity", 1);
    t.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", innerPetalColor[i])
        .attr("stop-opacity", 0)
}