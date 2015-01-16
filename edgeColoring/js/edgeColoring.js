// remove a value from the set
Array.prototype.remove = function(value){
	for (var i = 0; i < this.length; i++) {
		if (this[i] === value) break;
	}
	if(i != this.length)
		this.splice(i, 1);
	return this;
}
// add a value from an array if not in it (add to a set)
Array.prototype.add = function(value){
	for (var i = 0; i < this.length; i++) {
		if(this[i] === value) return this
	};
	this.push(value)
	return this;
}


function main(){
	var m,n
	var g, gv, ge 
	var c
	var U
	var free
	//input 
	m = 10
	n = 7
        //0 1 2 3 4 5 6   
	g = [[1,0,0,0,0,1,0],
		 [1,1,0,0,0,0,0],
		 [0,1,1,0,0,0,0],
		 [0,0,1,1,0,0,0],
		 [0,0,0,1,1,0,0],
		 [0,0,0,0,1,1,0],
		 [1,0,0,0,0,0,1],
		 [0,1,0,0,0,0,1],
		 [0,0,0,1,0,0,1],
		 [0,0,0,0,1,0,1] ]
	ge = [[0, 5],
			[0, 1],
			[1, 2],
			[2, 3],
			[3, 4],
			[4, 5],
			[0, 6],
			[1, 6],
			[3, 6],
			[4, 6] ]	 
	gv = [[0, 1, 6],
			[1, 2, 7],
			[2, 3],
			[3, 4, 8],
			[4, 5, 9],
			[0, 5],
			[6, 7, 8, 9]]		

	//init
	//最大顶点度数
	var delta = 0
	for (var i = 0; i < gv.length; i++) {
		if(gv[i].length > delta) delta = gv[i].length
	};
	c = []
	U = []
	free = []	 
	for (var i = 0; i < m; i++) {
		c.push(0) //color[i] == 0 means edge i not be colored yet
		U.push(i) //U contains all edge
	};
	for (var i = 0; i < n; i++) {
		free.push([])
		for (var j = 1; j <= delta+1; j++) {
			free[i].push(j)
		};
	};

	while(U.length!=0){
		//Let (u,v) be any edge in U.
		var e = U[0]
		var u = ge[e][0], v = ge[e][1]
		//Let F[1:k] be a maximal fan of u starting at F[1]=v.
		var f = getMaxFan(gv, u, v, free, c)
		//Let fc.c be a color that is free on u and fc.d be a color that is free on F[k].
		var fc = {c:free[u][0], d:free[f[f.length-1]][0]}
		//Invert the cd_u path
		invertCduPath(gv, ge, fc.c, fc.d, u, c, free)
		//Let w ∈ V(G) be such that w ∈ F, F2=[F[1]...w] is a fan and d is free on w.
		var f2 = getNewFan(f, gv, ge, u, v, fc.d, free)
		var w = f2[f2.length-1]
		//Rotate F2 and set c(u,w)=d.
		rotateF(f2, ge, u, free)
		var uwindex = getEdgeIndex(ge, u,w)
		c[uwindex] = fc.d
		free[u].remove(fc.d)
		free[w].remove(fc.d)
		//U := U - {(u,v)}
		U.remove(e)
	}
	console.log(c)
}

//Let F[1:k] be a maximal fan of u starting at F[1]=v.
function getMaxFan(gv, u, v, free, c){
	var result = [v]
	var neighbor = getColoredNeighbor(gv[u], c)

	var endflag = false
	while(neighbor.length > 0 && !endflag){
		var flag = false
		for (var i = 0; i < free[v].length; i++) {
			for (var j = 0; j < neighbor.length; j++) {
				if(c[neighbor[j]] == free[v][i]){
					v = neighbor[j]
					result.push(v)
					neighbor.splice(j, 1)
					flag = true
					break
				}
			};
			if(flag) break;
		};
		// if can not find next fan edge, end this procedure
		if(flag == false) endflag = true
	}
	return result;
}

// remove all uncolored edge in ori (neighbor edges of u) 
function getColoredNeighbor(ori, c){
	var neighbor = ori.slice()
	// remove all uncolored edge in neighbor edges of u
	for (var i = neighbor.length-1; i >= 0 ; i--) {
		if(c[neighbor[i]] == 0) neighbor.splice(i,1)
	};
	return neighbor;
}

//Invert the cd_u path
function invertCduPath(gv, ge, fc_c, fc_d, u, c, free){
	var color = [fc_c, fc_d]

	// invert left-hand path: dcdcd..dc-u-
	var currentColorIndex = 0
	var currentu = u
	while(true){
		var i
		for (i = 0; i < gv[currentu].length; i++) {
			var e = gv[currentu][i]
			if(c[e] == color[currentColorIndex]){
				currentColorIndex = 1 - currentColorIndex
				c[e] = color[currentColorIndex]
				currentu = (ge[e][0] == currentu) ? ge[e][1] : ge[e][0]
				break;
			}
		};
		if(i==gv[currentu].length) break;
	}
	free[currentu].remove(color[currentColorIndex])
	free[currentu].add(color[1-currentColorIndex])

	// invert left-hand path: -u-dcdcd..cd
	var currentColorIndex = 1
	var currentu = u
	while(true){
		var i
		for (i = 0; i < gv[currentu].length; i++) {
			var e = gv[currentu][i]
			if(c[e] == color[currentColorIndex]){
				currentColorIndex = 1 - currentColorIndex
				c[e] = color[currentColorIndex]
				currentu = (ge[e][0] == currentu) ? ge[e][1] : ge[e][0]
				break;
			}
		};
		if(i==gv[currentu].length) break;
	}
	free[currentu].remove(color[currentColorIndex])
	free[currentu].add(color[1-currentColorIndex])
	return ;
}
 
//Let w ∈ V(G) be such that w ∈ F, F2=[F[1]...w] is a fan and d is free on w.
function getNewFan(f, gv, ge, u, v, d, free){
	var f2 = []
	for (var i = 0; i < f.length; i++) {
		var dfound = false
		for (var j = 0; j < free[f[i]].length; j++) {
			if(free[f[i]][j] == d){
				dfound = true
				break
			}
		};
		if(dfound) break
		else f2.push(f[i])
	};
	return f2
}

//Rotate F
function rotateF(f, ge, u, free){
	for (var i = 0; i < f.length - 1; i++) {
		var v = f[i], vnext = f[i+1]
		free[v].remove(c[getEdgeIndex(ge, u, vnext)])
		c[getEdgeIndex(ge, u, v)] =  c[getEdgeIndex(ge, u, vnext)]
	}
	return ;
}

// get the index of an edge by its two end points
function getEdgeIndex(ge, u, w){
	for (var i = 0; i < ge.length; i++) {
		if(ge[i][0] == u && ge[i][1] == w || ge[i][0] == w && ge[i][1] == u)
			return i
	};
}
