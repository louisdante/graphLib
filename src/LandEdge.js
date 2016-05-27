function LandEdge(sV, dV, w) {
    Edge.call(this, sV, dV, w);
}

LandEdge.prototype = Object.create(Edge.prototype);