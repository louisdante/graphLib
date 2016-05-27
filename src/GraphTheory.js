var myGraph = new Graph();


var v1 = new Vertex("v1");
var v2 = new Vertex("v2");
var v3 = new Vertex("v3");
var v4 = new Vertex("v4");
var v5 = new Vertex("v5");

myGraph.addVertex(v1);
myGraph.addVertex(v2);
myGraph.addVertex(v3);
myGraph.addVertex(v4);
myGraph.addVertex(v5);

myGraph.addEdge(v1, v2, 2);
myGraph.addEdge(v2, v3, 4);
myGraph.addEdge(v3, v4, 6);
myGraph.addEdge(v4, v5, 8);
myGraph.addEdge(v5, v1, 10);

console.log(myGraph);

var nodes = myGraph.vertices;
var links = [];

myGraph.edges.forEach(function(tEdge) {
    var sIndex = nodes.indexOf(tEdge.source);
    var tIndex = nodes.indexOf(tEdge.dest);
    links.push({
        source: sIndex,
        target: tIndex
    });
}, myGraph);
console.log(links);

var gVis = d3.select("#graphDemoContainer")
    .append('svg')
    .attr({
        width: 1200,
        height: 1200,
        fill: '#ff00ff'
    });



console.log(gVis);


var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .gravity(0.2)
    .charge(-10000)
    .size([1200, 1200]);

var link = gVis.selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('stroke', '#00ff00');


var node = gVis.selectAll('circle')
    .data(nodes)
    .enter()
    .append('g')
    .call(force.drag);


node.append('circle')
    .attr({
        cx: function(d) {
            return d.x;
        },
        cy: function(d) {
            return d.y;
        },
        r: 20,
        fill: '#cc00cc'
    });


console.log(force);

force.on('tick', function(event) {
    node.attr('transform', function(d, i) {
        return 'translate(' + d.x + ', ' + d.y + ')';
    });

    link.attr({
        x1: function(d) {
            return d.source.x;
        },
        y1: function(d) {
            return d.source.y;
        },
        x2: function(d) {
            return d.target.x;
        },
        y2: function(d) {
            return d.target.y;
        }
    });
    // event.preventDefault();
    /* Act on the event */
});
force.start();
// comment to allow legbility white spaces