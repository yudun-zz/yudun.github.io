/*
 Name: flowerfunc.js
 Author: yudun
 Description: all the calculations and functions that are needed for rendering the bouquet
 */

//////////////////////////////////// Func to Calculate the position of each flower //////////////
var initialflowerangle = 15
var floweranglestep = 5
var flowerradiusstep = 10
var flowerradiuslist = []
var positioncorrection_x
var positioncorrection_y
for (var i = 0; i < yearlist.length; i++) {
    var year = yearlist[i]
    var yeardata = all_yeardata[year]
    var extrarate = 1
    if (yeardata.maxlikeother == 0) extrarate = minpetalscale_x
    var flowerradius = flowersizescale(yeardata.maxmonthintimacy) * (originpetalradius * extrarate + baseheartradius)
    flowerradiuslist.push(flowerradius)
};

var flowerposition = []
var leftborder = -width / 2;
var rightborder = width / 2;
var growleft = true
var turnarounddis = 0 // distance to the border to turn around
for (var i = 0; i < flowerradiuslist.length; i++) {
    var result = getFlowerPosition(flowerposition, flowerradiuslist[i])
    flowerposition.push({
        "r": flowerradiuslist[i],
        "x": result.x,
        "y": result.y
    })
};

//calculate the actual border after the above arrangement
var minpositionx = rightborder,
    maxpositionx = leftborder,
    minpositiony = height,
    maxpositiony = -height;
for (var i = 0; i < flowerposition.length; i++) {
    if (flowerposition[i].x - flowerposition[i].r < minpositionx) minpositionx = flowerposition[i].x - flowerposition[i].r
    if (flowerposition[i].x + flowerposition[i].r > maxpositionx) maxpositionx = flowerposition[i].x + flowerposition[i].r
    flowerposition[i].y = -flowerposition[i].y
    if (flowerposition[i].y - flowerposition[i].r < minpositiony) minpositiony = flowerposition[i].y - flowerposition[i].r
    if (flowerposition[i].y + flowerposition[i].r > maxpositiony) maxpositiony = flowerposition[i].y + flowerposition[i].r
}
positioncorrection_x = -(minpositionx + maxpositionx) / 2
positioncorrection_y = flowerposition[0].r
for (var i = 0; i < flowerposition.length; i++) {
    flowerposition[i].x += positioncorrection_x
    flowerposition[i].y -= positioncorrection_y
}

function getFlowerPosition(flowerposition, r) {
    var result = {
        x: 0,
        y: 0
    }
    if (flowerposition.length == 0) return result
    var basex = flowerposition[flowerposition.length - 1].x
    var basey = flowerposition[flowerposition.length - 1].y
    var baser = flowerposition[flowerposition.length - 1].r
    var angle, x, y, testr
    var breakflag = false;
    while (true) {
        if (growleft) {
            testr = baser + r
            // console.log("left: flowernum:" + flowerposition.length)
            //test alone the radius from baser+r to border
            while (true) {
                console.log("left")
                angle = 180 - initialflowerangle
                //test from left to up
                for (; angle >= 90; angle -= floweranglestep) {
                    x = basex + testr * Math.cos(angle * Math.PI / 180)
                    y = basey + testr * Math.sin(angle * Math.PI / 180)
                    if (x - r <= leftborder) {
                        growleft = false;
                        basex = x;
                        basey = y;
                        baser = r;
                        breakflag = true;
                        break;
                    }
                    if (checkFlowerPosition(flowerposition, x, y, r)) {
                        if (x - r <= leftborder + turnarounddis) growleft = false
                        return {
                            x: x,
                            y: y
                        }
                    }
                }
                if (breakflag) {
                    breakflag = false;
                    break;
                }
                testr += flowerradiusstep
            }
        } else {
            testr = baser + r
            // console.log("right: flowernum:" + flowerposition.length)

            //test alone the radius from baser+r to border
            while (true) {
                console.log("right")
                angle = initialflowerangle
                for (; angle <= 90; angle += floweranglestep) {
                    x = basex + testr * Math.cos(angle * Math.PI / 180)
                    y = basey + testr * Math.sin(angle * Math.PI / 180)
                    if (x + r >= rightborder) {
                        growleft = true;
                        basex = x;
                        basey = y;
                        baser = r;
                        breakflag = true;
                        break;
                    }
                    if (checkFlowerPosition(flowerposition, x, y, r)) {
                        if (x + r >= rightborder - turnarounddis) growleft = true
                        return {
                            x: x,
                            y: y
                        }
                    }
                }
                if (breakflag) {
                    breakflag = false;
                    break;
                }
                testr += flowerradiusstep
            }
        }
    }
}

function checkFlowerPosition(flowerposition, x, y, r) {
    for (var i = 0; i < flowerposition.length - 1; i++) {
        if (dis(x, y, flowerposition[i].x, flowerposition[i].y) <= r + flowerposition[i].r)
            return false
    };
    return true
}


//////////////////////////////////// Func to Calculate the position of each stamen //////////////
// scale 1 ---- pi*basicstamenradius*basicstamenradius 
var basicstamenradius = 7
var basicarea = Math.PI * basicstamenradius * basicstamenradius
var totalarea = Math.PI * stamenarearadius * stamenarearadius

function getStamenScale(ratio) {
    var area = ratio * totalarea
    return Math.sqrt(area / basicarea)
}

var radiusStepNumEachCircle = 2
var degreeStepNumEachCircle = 360
var circleNum = stamenarearadius / radiusStepNumEachCircle
var radiusStep = radiusStepNumEachCircle / degreeStepNumEachCircle
var degreeStep = 360 / degreeStepNumEachCircle
var maxDetectNum = degreeStepNumEachCircle * circleNum

function spiralDetect(stamenlist, r, currentnum) {
    var rstep = 0;
    var dstep = 0;
    var currentx, currenty;
    var resultx, resulty;
    var stepnum = 0
    var result
    var maxmin = 0

    while (stepnum < maxDetectNum) {
        currentx = rstep * Math.cos(Math.PI * dstep / 180)
        currenty = rstep * Math.sin(Math.PI * dstep / 180)
        result = singleDetect(currentx, currenty, stamenlist, r, currentnum)
        if (result.success) {
            resultx = currentx
            resulty = currenty
            break
        } else if (maxmin < result.min) {
            maxmin = result.min
            resultx = currentx
            resulty = currenty
        }
        rstep += radiusStep
        dstep += degreeStep
        stepnum++
        if (rstep + r > stamenarearadius) break
    }
    return {
        x: resultx,
        y: resulty
    }
}

function singleDetect(x, y, stamenlist, r, currentnum) {
    var success = true
    var min = 100000
    for (var i = 0; i < currentnum; i++) {
        var d = dis(x, y, stamenlist[i].x, stamenlist[i].y)
        if (d < min) {
            min = d
        }
        if (d < r + stamenlist[i].r) success = false
    };
    return {
        success: success,
        min: min
    }
}

function dis(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}


///////////////////////////// Petal Rendering function ////////////////////////
// computes spline control points 
function getControlPoint(V) {
    /*grab (x,y) coordinates of the control points*/
    x = new Array();
    y = new Array();
    for (i = 0; i < V.length; i++) {
        /*use parseInt to convert string to int*/
        x[i] = V[i][0]
        y[i] = V[i][1]
    }

    /*computes control points p1 and p2 for x and y direction*/
    px = computeControlPoints(x);
    py = computeControlPoints(y);

    return {
        px: px,
        py: py
    }
}

// computes control points given knots K, this is the brain of the operation
function computeControlPoints(K) {
    p1 = new Array();
    p2 = new Array();
    n = K.length - 1;

    /*rhs vector*/
    a = new Array();
    b = new Array();
    c = new Array();
    r = new Array();

    /*left most segment*/
    a[0] = 0;
    b[0] = 2;
    c[0] = 1;
    r[0] = K[0] + 2 * K[1];

    /*internal segments*/
    for (i = 1; i < n - 1; i++) {
        a[i] = 1;
        b[i] = 4;
        c[i] = 1;
        r[i] = 4 * K[i] + 2 * K[i + 1];
    }

    /*right segment*/
    a[n - 1] = 2;
    b[n - 1] = 7;
    c[n - 1] = 0;
    r[n - 1] = 8 * K[n - 1] + K[n];

    /*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
    for (i = 1; i < n; i++) {
        m = a[i] / b[i - 1];
        b[i] = b[i] - m * c[i - 1];
        r[i] = r[i] - m * r[i - 1];
    }

    p1[n - 1] = r[n - 1] / b[n - 1];
    for (i = n - 2; i >= 0; --i)
        p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i];

    /*we have p1, now compute p2*/
    for (i = 0; i < n - 1; i++)
        p2[i] = 2 * K[i + 1] - p1[i + 1];

    p2[n - 1] = 0.5 * (K[n] + p1[n - 1]);

    return {
        p1: p1,
        p2: p2
    };
}


////////////////////// OutStamen Tool function /////////////////////////////
function getOutStamenLen(outstamenlist, type, sx) {
    var index
    switch (type) {
        case "msg":
            index = 0;
            break;
        case "cmt":
            index = 1;
            break;
        case "else":
            index = 2;
            break;
        case "like":
            index = 3;
            return maxoutstamenlen * sx
            break;
    }
    var r1 = innersizescale(outstamenlist[index]),
        r2 = innersizescale(outstamenlist[index + 1]);
    if (index == 2)
        len = (0 + (r1 - 0) / 2 * outstamenpositionrate) * maxoutstamenlen * sx
    else
        len = (r2 + (r1 - r2) / 2 * outstamenpositionrate) * maxoutstamenlen * sx
    return len
}

function generateOutStamen(ratio, clockwise, length, mode, maxratio) {
    var x1 = 0,
        y1 = 0,
        x2 = length,
        y2 = 0
    var r = outstmenwidth
    var bx = x2 + r * Math.cos(alpha),
        by = r * Math.sin(alpha);
    if (mode == 1) {
        bx = x2 - r * Math.cos(alpha);
        by = -r * Math.sin(alpha);
    }
    var cp = getStamenControlPoint(x2, r, mode, bx, by, ratio, maxratio)
    var cx1 = cp[0][0],
        cy1 = cp[0][1],
        cx2 = cp[1][0],
        cy2 = cp[1][1];
    if (clockwise == true) {
        cy1 = -cy1
        cy2 = -cy2
        by = -by
    }
    var p = []
    var step = 1.0 / stepscale(x2)
    for (i = 0; i <= 1; i += step) {
        p.push(getPoint(x1, y1, cx1, cy1, cx2, cy2, bx, by, i))
    }
    return p
}

// get Cubic Bezier points 
function getPoint(x0, y0, x1, y1, x2, y2, x3, y3, step) {
    var t = (1 - step);
    var x, y;
    x = step * step * step * x3 + t * (3 * step * step * x2 + t * (3 * step * x1 + t * x0))
    y = step * step * step * y3 + t * (3 * step * step * y2 + t * (3 * step * y1 + t * y0))
    return [x, y]
}

//mode = 0 --> clockwise up || anticlockwise down
function getStamenControlPoint(l, r, mode, bx, by, ratio, maxratio) {
    if (mode == 0) {
        a = Math.PI - alpha
        var a1, a2;
        var c = Math.sqrt(l * l + r * r - 2 * l * r * Math.cos(a))
        var aa = Math.asin(r / c * Math.sin(a))
        a1 = aa + beta
        a2 = alpha + Math.PI / 2

        var t;
        t = Math.PI / 2 - alpha + aa
        var maxc1 = c * Math.sin(t) / Math.sin(beta + t)
        var maxc2 = c * Math.sin(beta) / Math.sin(beta + t)

        var curva1 = d3.scale.linear()
                .domain([0, maxratio])
                .range([0, maxc1]),
            curva2 = d3.scale.linear()
                .domain([0, maxratio])
                .range([0, maxc2]);
        var l1 = curva1(ratio),
            l2 = curva2(ratio);

        // left control point
        return [
            [l1 * Math.cos(a1), l1 * Math.sin(a1)],
            //right control point
            [bx + l2 * Math.cos(a2), by + l2 * Math.sin(a2)]
        ]
    } else {
        a = alpha
        var a1, a2;
        var c = Math.sqrt(l * l + r * r - 2 * l * r * Math.cos(a))
        var aa = Math.asin(r / c * Math.sin(a))
        a1 = beta - aa
        a2 = alpha + Math.PI / 2

        var t;
        t = Math.PI / 2 - alpha - aa
        var maxc1 = c * Math.sin(t) / Math.sin(beta + t)
        var maxc2 = c * Math.sin(beta) / Math.sin(beta + t)

        var curva1 = d3.scale.linear()
                .domain([0, maxratio])
                .range([0, maxc1]),
            curva2 = d3.scale.linear()
                .domain([0, maxratio])
                .range([0, maxc2]);
        var l1 = curva1(ratio),
            l2 = curva2(ratio);

        // left control point
        return [
            [l1 * Math.cos(a1), l1 * Math.sin(a1)],
            //right control point
            [bx + l2 * Math.cos(a2), by + l2 * Math.sin(a2)]
        ]
    }
}


///////////////////////////// Petal Spots function ////////////////////////
function getTriangleArea(x1, y1, x2, y2, x3, y3) {
    return 0.5 * Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2))
}

//get a random point within triangle ABC
function getTriangleRandom(A, B, C) {
    var r1 = Math.random()
    var r2 = Math.random()
    var x = (1 - Math.sqrt(r1)) * A[0] + Math.sqrt(r1) * (1 - r2) * B[0] + Math.sqrt(r1) * r2 * C[0]
    var y = (1 - Math.sqrt(r1)) * A[1] + Math.sqrt(r1) * (1 - r2) * B[1] + Math.sqrt(r1) * r2 * C[1]
    return [x, y]
}

function getSpotsList(V, spotsnum) {
    var trianglearealist = []
    var totalarea = 0
    var resultlist = []
    for (var i = 0; i < V.length - 3; i++) {
        var area = getTriangleArea(V[0][0], V[0][1], V[i + 1][0], V[i + 1][1], V[i + 2][0], V[i + 2][1])
        totalarea += area
        trianglearealist.push(totalarea)
    }
    for (var i = 0; i < trianglearealist.length - 3; i++) {
        trianglearealist[i] /= totalarea
    }

    /// Generate spotsnum spots within polygon "V"
    for (var num = 1; num <= spotsnum; num++) {
        var r = Math.random()
        var i
        for (i = 0; i < trianglearealist.length; i++) {
            if (r <= trianglearealist[i]) break
        };
        resultlist.push(getTriangleRandom(V[0], V[i + 1], V[i + 2]))
    }

    return resultlist
}


// Correction
var vaseheight = 600 / 1475 * height
var bouquetheight = -minpositiony
if (bouquetheight < 2 * vaseheight) bouquetheight = 2 * vaseheight

var bouquet_correctiony = bouquetheight - height / 2
var correctfactor = height / (vaseheight + bouquetheight)

svg.attr('transform', 'translate(' + bouquetleftdistance + ',' + margin.top + '), scale(' + correctfactor + ')')