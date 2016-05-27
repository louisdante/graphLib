function Location (label) {
	Vertex.call(this, label);
}

Location.prototype = Object.create(Vertex.prototype);