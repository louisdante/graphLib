var nodes = {
    A : [B, C],
    B : [A, D],
    C : [A, D],
    D : [A, C ,E],
    E : [B, F],
    F : [E]
};

function init (visited, nodes) 
{
    for (var key in nodes) {
       var vertex = nodes[key];
        visited[key] = false;
    }
}

function breadthFirst (nodes, start, visited)
{
    // Create an empty queue
    var queue = [];

    // Initially enqueue only the starting vertex
    queue.push(start);

    //Set the starting vertex to visited
    visited[start] = true;

    //Add it to the result
    result.push( start );

    //While there is still remaining vertexes in queue
    while (queue.length > 0) {

       //Remove first vertex from queue and save it in "t"
       var currentVertexID = queue.shift();

       //For each key in graph at "t"
       var currentVertex = graph[currentVertexID];
       for (var key in currentVertex) {

       var target = currentVertex[key];

            //If it has not been visited yet
            if (!visited[target]) {

                //Mark it as visited
                visited[target] = true;

                //Add it to queue
                queue.push(target);

                //Save it in result
                result.push(target);
                //console.log(result);
            }
        }
    }
}

var result = [];
var visited = [];
init(visited, graph);
breadthFirst(graph, 2, visited);    
console.log(result);    