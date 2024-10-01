#include "BusGraph.h"

BusGraph createBusGraph(){
    vector<int> blocked_nodes;
    BusGraph g(4);
    g.addEdge(0, 1, 50 , "A1");
    g.addEdge(1, 2, 50 , "A1");
    g.addEdge(2, 3, 50 , "A1");
    g.addEdge(3, 4, 50 , "A1");

    return g;
}