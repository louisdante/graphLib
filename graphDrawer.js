/* Return an object with the following members:
 * - n: the number of vertices
 * - hasEdge(i, j): function which returns true iff. ij is an edge
 * - canvas: an HTML 5 canvas element
 * - position(i): determine the position of vertex i on the canvas
 * - timeInterval: the amount of time it takes to draw a vertex or edge
 * - showVertices: if true, display the vertices as dots
 * - draw(): start drawing the graph
 * - stop(): stop drawing the graph
 * - reset(): start over from the beginning next time a vertex/edge would be drawn
 */
var graphDrawer = function(n, hasEdge, canvas, position, timeInterval, showVertices) {
	var drawer = {
		n: n, 
		hasEdge: hasEdge, 
		canvas: canvas, 
		position: position, 
		timeInterval: timeInterval,
		showVertices: showVertices,
	};

	var verticesDrawn = false;
	var i = 0;
	var j = 1;

	var drawNext = function() {
		var ctx = drawer.canvas.getContext("2d");

		// First draw the vertices
		if(!verticesDrawn && drawer.showVertices) {
			ctx.beginPath();
			var point = drawer.position(i);
			ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
			ctx.fill();
			if(++i >= drawer.n) {
				i = 0;
				verticesDrawn = true;
			}
		}
		else {
			var edgeDrawn = false;
			while(!edgeDrawn) {
				if(drawer.hasEdge(i, j)) {
					ctx.beginPath();
					iCoords = drawer.position(i);
					jCoords = drawer.position(j);
					ctx.moveTo(iCoords.x, iCoords.y);
					ctx.lineTo(jCoords.x, jCoords.y);
					ctx.stroke();
					edgeDrawn = true;
				}
				// Increment i and j
				if(++j >= drawer.n) {
					j = ++i + 1;
					if(i >= drawer.n - 1) {
						// No more vertices to draw
						drawer.stop()
					}
				}
			}
		}
	};

	var timer = null;
	drawer.draw = function() {
		timer = setInterval(drawNext, drawer.timeInterval);
	};

	drawer.reset = function() {
		i = j = 0;
		verticesDrawn = false;
	};

	drawer.stop = function() {
		clearInterval(timer);
	};

	return drawer;
};
