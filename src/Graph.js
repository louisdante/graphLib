function Graph() {
    this.vertices = [];
    this.edges = [];

}

Graph.prototype.addVertex = function(vertex) {
    if (this.vertices.indexOf(vertex) == -1) {
        this.vertices.push(vertex);
    };
};

Graph.prototype.addEdge = function(sVertex, dVertex, weight) {
    var tempEdge = new Edge(sVertex, dVertex, weight);
    this.edges.push(tempEdge);
};

Graph.prototype.getEdges = function(vertex) {
    return this.edges.filter(function(tempEdge) {
        return tempEdge.source == vertex;
    }, this);
};

Graph.prototype.getNeighbors = function(sVertex) {
    var currVertex = sVertex;
    var currEdges = this.getEdges(currVertex);
    return currEdges.map(function(tempEdge) {
        return tempEdge.dest;
    }, this);
};

Graph.prototype.depthVisit = function(edge, dPath) {
    var dVertex = edge.dest;

    if (dPath[dVertex.label] == undefined) {
        dPath[dVertex.label] = {
            pred: edge.source,
            pathWeight: ((dPath[edge.source.label].pathWeight) + edge.weight)
        };
        var destEdges = this.getEdges(dVertex);
        destEdges.forEach(function(dEdge) {
            this.depthVisit(dEdge, dPath);
        }, this);

    };
};

Graph.prototype.depthSearch = function(initVert) {
    var initV = initVert;
    var dPath = {
        initialVertex: initV
    };
    dPath[initV.label] = {
        pred: null,
        pathWeight: 0
    };
    var currEdges = this.getEdges(initV);
    currEdges.forEach(function(cEdge) {
        this.depthVisit(cEdge, dPath);
    }, this);
    console.log(dPath);
    return dPath;
};

Graph.prototype.breadthSearch = function(initVert) {
    var initV = initVert;
    var bPath = {
        initialVertex: initVert
    };
    bPath[initV.label] = {
        pred: null,
        depth: 0
    };
    var level = 1;
    var bQueue = [initV];
    while (bQueue.length > 0) {
        var currV = bQueue.shift();

        var currNeighbors = this.getNeighbors(currV);

        var frontier = [];
        currNeighbors.forEach(function function_name(nVertex) {
            if (bPath[nVertex.label] == undefined) {
                bPath[nVertex.label] = {
                    pred: currV,
                    depth: level
                };

                frontier.push(nVertex);
            };
        }, this);
        bQueue = frontier;
        level++;

    }
    console.log(bPath);
    return bPath;

};




Graph.prototype.hasPath = function(initVert, termVert) {
    var bPath = this.breadthSearch(initVert);
    console.log("hasPath method was called");
    console.log(bPath);
    if (bPath[termVert.label] == undefined) {
        return false;
    } else if (bPath[termVert.label] != undefined) {
        return true;
    };
};

Graph.prototype.dijkstra = function(initVert, termVert) {
    if (this.hasPath(initVert, termVert) == false) {
        return false;
    } else {
        var reachables = this.breadthSearch(initVert);
        var inspectionQueue = [initV];
        var solutionSet = {};
        solutionSet[initV.label] = {
            pred: null,
            pathWeight: 0
        };
        while (inspectionQueue.lenght > 0) {
            var currV = inspectionQueue.shift();
            var currEdges = this.getEdges(currV);

            currEdges.forEach(function(tempEdge) {
                var currWeight = reachables[tempEdge.dest.label].pathWeight;
                var dijkstraWeight = solutionSet[tempEdge.source.label].pathWeight + tempEdge.weight;
                if (solutionSet[tempEdge.dest.label] == false) {
                    inspectionQueue.push(tempEdge.dest);
                    if (currWeight > dijkstraWeight) {
                        solutionSet[tempEdge.dest.label] = {
                            pred: (tempEdge.source),
                            pathWeight: dijkstraWeight
                        };
                    } else {
                        solutionSet[tempEdge.dest.label] = bPath[tempEdge.dest.label];
                    };
                }
            }, this);


        }
        return solutionSet;
    };
    // body...
};