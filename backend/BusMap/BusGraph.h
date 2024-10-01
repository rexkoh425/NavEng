#ifndef __GRAPH_H__
#define __GRAPH_H__

#include <forward_list>
#include <stack>
#include <unordered_set>
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

#define NORTH 0
#define EAST 90
#define SOUTH 180
#define WEST -90
#define UP 45
#define DOWN -45

using std::forward_list;
using std::ostream;
using std::string;
using std::vector;

class BusGraphEdge {
 private:
  string _line;
  int _dest;
  int _weight;

 public:
  // Public constructor creates an invalid edge. Needed for use in vector.
  BusGraphEdge() : _dest(-1), _weight(999999) , _line("") {}
  BusGraphEdge(int index, int weight , string line) : _dest(index), _weight(weight) , _line(line) {}
  BusGraphEdge(const BusGraphEdge& e) : _dest(e._dest), _weight(e._weight) , _line(e._line) {}
  int dest() const { return _dest; }
  int weight() const { return _weight; }
  string line() const { return _line; } 
  bool operator>(const BusGraphEdge& e) const { return _weight > e._weight; }
  bool operator<(const BusGraphEdge& e) const { return _weight < e._weight; }
  bool operator==(const BusGraphEdge& e) const { return _dest == e._dest; }
};

class BusGraph {
 private:

  vector<forward_list<BusGraphEdge>> _vertices;
  
 public:
  // Create an empty graph with n vertices
  BusGraph(int n) : _vertices(n) { }

  int num_vertices() const { return _vertices.size(); }

  // Get edges of vertex i
  const forward_list<BusGraphEdge>& edges_from(int i) const {
    return _vertices[i];
  }

  // Add an edge from source vertex to dest vertex with weight weight
  void addEdge(int source, int dest, int weight , string line);
};

ostream& operator<<(ostream&, const BusGraphEdge&);
ostream& operator<<(ostream&, const BusGraph&);

#endif 
