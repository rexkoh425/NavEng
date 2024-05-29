class WeightedGraph {
    constructor() {
        this.adjacencyList = new Map();
    }

    addNode(node) {
        if (!this.adjacencyList.has(node)) {
            this.adjacencyList.set(node, []);
        }
    }

    addEdge(node1, node2, weight) {
        if (this.adjacencyList.has(node1) && this.adjacencyList.has(node2)) {
            this.adjacencyList.get(node1).push({ node: node2, weight });
            this.adjacencyList.get(node2).push({ node: node1, weight }); // Comment this line for directed graphs
        }
    }

    dijkstra(startNode) {
        const distances = {};
        const heap = new MinHeap();
        const previous = {};
        const path = []; // To store the shortest path

        // Initialize distances and heap
        this.adjacencyList.forEach((_, node) => {
            if (node === startNode) {
                distances[node] = 0;
                heap.insert({ node, distance: 0 });
            } else {
                distances[node] = Infinity;
                heap.insert({ node, distance: Infinity });
            }
            previous[node] = null;
        });

        while (!heap.isEmpty()) {
            const { node: currentNode, distance: currentDistance } = heap.extractMin();

            if (currentDistance === Infinity) break; // All remaining nodes are inaccessible from startNode

            this.adjacencyList.get(currentNode).forEach(neighbor => {
                const distance = currentDistance + neighbor.weight;

                if (distance < distances[neighbor.node]) {
                    distances[neighbor.node] = distance;
                    previous[neighbor.node] = currentNode;
                    heap.insert({ node: neighbor.node, distance });
                }
            });
        }

        return { distances, previous };
    }

    findShortestPath(startNode, endNode) {
        const { distances, previous } = this.dijkstra(startNode);
        const path = [];
        let currentNode = endNode;

        while (currentNode) {
            path.push(currentNode);
            currentNode = previous[currentNode];
        }

        return path.reverse();
    }
}

// Example usage:
const graph = new WeightedGraph();

graph.addNode(1);
graph.addNode(2);
graph.addNode(3);
graph.addNode(4);
graph.addNode(5);

graph.addEdge(1, 2, 4);
graph.addEdge(1, 3, 2);
graph.addEdge(2, 3, 5);
graph.addEdge(2, 4, 10);
graph.addEdge(3, 4, 3);
graph.addEdge(4, 5, 1);

console.log(graph.dijkstra(1)); // { distances: { '1': 0, '2': 4, '3': 2, '4': 5, '5': 6 }, previous: { '1': null, '2': 1, '3': 1, '4': 3, '5': 4 } }
console.log(graph.findShortestPath(1, 5)); // [1, 3, 4, 5]
