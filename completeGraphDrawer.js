var completeGraphDrawer = function(n, canvas, timeInterval, showVertices) {
	drawer = graphDrawer(n, null, canvas, null, timeInterval, showVertices);
	drawer.hasEdge = function(i, j) {
		return true;
	};
	drawer.position = function(i) {
		var center = {x: drawer.canvas.width / 2, y: drawer.canvas.height / 2};
		var xRad = center.x - 4;
		var yRad = center.y - 4;
		var angle = 2 * Math.PI * i / drawer.n;
	    return {x: center.x + xRad * Math.cos(angle), y: center.y + yRad * Math.sin(angle)};
	};
	return drawer;
};
