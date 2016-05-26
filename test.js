// To run: node dfs_test.js
    var nodes = {
         "1": [2, 7, 8],
         "2": [1, 3, 6],
         "3": [2, 4, 5],
         "4": [3],
         "5": [3],
         "6": [2],
         "7": [1],
         "8": [1, 9, 12],
         "9": [8, 10, 11],
        "10": [9],
        "11": [9],
        "12": [8]
    };

    var visited = [];
    dfs(1, nodes, function (n) {
        visited.push(n);
    });

    console.log(visited.join(', '));

function bfs(start, nodes, fn) {
        var frontier = [start];
        var level = 0, levels = {};

        while (0 < frontier.length >>> 0) {
            var next = [];
            for (var i in frontier) {
                var node = frontier[i];
                levels[node] = level;
                fn(node);

                for (var i in nodes[node]) {
                    var adj = nodes[node][i];
                    if (void(0) === levels[adj]) {
                        next.push(adj);
                    }
                }
            }
            frontier = next;
            level += 1;
        }
    return bfs;
    }

function dfs(start, nodes, fn) {
        (function dfs_recur(node, visited) {
            var adj = nodes[node];
            visited.push(node);
            fn(node);
            for (var i in adj) {
                var node = adj[i];
                if (0 > visited.indexOf(node)) {
                    dfs_recur(node, visited);
                }
            }
        })(start, []);
     return dfs;
    };

   