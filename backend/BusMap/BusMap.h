#include "graph.h"

Graph createBusGraph(){
    vector<int> blocked_nodes;
    Graph g(707  , blocked_nodes);
    g.addEdge(0, 1, 50 , EAST , undirected);

}