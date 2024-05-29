#include "graph.h"
#include <fstream>

#define NORTH 0
#define EAST 90
#define SOUTH 180
#define WEST -90
#define UP 45
#define DOWN -45

using std::endl;

std::ostream& operator<<(std::ostream& os, GraphEdge const& e) {
  return os << " (d:" << e.dest() << " w:" << e.weight() << ")";
}

ostream& operator<<(ostream& os, const Graph& g) {
  for (int i = 0; i < g.num_vertices(); ++i) {
    os << "Vertex " << i << ": ";
    for (auto e : g.edges_from(i)) {
      os << e;
    }
    os << endl;
  }
  return os;
}

void Graph::addEdge(int source, int dest, int weight , int dir) {
  // Assumes that an edge doesn't already exist!
  _vertices[source].emplace_front(dest, weight , dir);
  int opposite_dir = 180 - dir;
  if(dir == EAST || dir == WEST || dir == UP || dir == DOWN){
    opposite_dir = -dir;
  }
  _vertices[dest].emplace_front(source,weight , opposite_dir);
}
