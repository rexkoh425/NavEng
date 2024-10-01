#include "BusGraph.h"
#include <fstream>

using std::endl;

std::ostream& operator<<(std::ostream& os, BusGraphEdge const& e) {
  return os << " (d:" << e.dest() << " w:" << e.weight() << ")";
}

ostream& operator<<(ostream& os, const BusGraph& g) {
  for (int i = 0; i < g.num_vertices(); ++i) {
    os << "Vertex " << i << ": ";
    for (auto e : g.edges_from(i)) {
      os << e;
    }
    os << endl;
  }
  return os;
}

void BusGraph::addEdge(int source, int dest, int weight , string line) { 
  _vertices[source].emplace_front(dest, weight , line);
  _vertices[dest].emplace_front(source,weight , line);
}
