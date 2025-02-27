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

class GraphEdge {
 private:
  int _dir;
  int _dest;
  int _weight;

 public:
  // Public constructor creates an invalid edge. Needed for use in vector.
  GraphEdge() : _dest(-1), _weight(999999) , _dir(-1) {}
  GraphEdge(int index, int weight , int dir) : _dest(index), _weight(weight) , _dir(dir) {}
  GraphEdge(const GraphEdge& e) : _dest(e._dest), _weight(e._weight) , _dir(e._dir) {}
  int dest() const { return _dest; }
  int weight() const { return _weight; }
  int dir() const { return _dir; } 
  bool operator>(const GraphEdge& e) const { return _weight > e._weight; }
  bool operator<(const GraphEdge& e) const { return _weight < e._weight; }
  bool operator==(const GraphEdge& e) const { return _dest == e._dest; }
};

class Graph {
 private:

  vector<forward_list<GraphEdge>> _vertices;
  bool* blocked_nodes;
  
 public:
  // Create an empty graph with n vertices
  Graph(int n , vector<int> blocked_array) : _vertices(n) {
    blocked_nodes = new bool[n];
    for(int i = 0 ; i < n ; i++){
      blocked_nodes[i] = 0;
    }
    for(int i = 0 ; i < blocked_array.size() ; i++){
      blocked_nodes[blocked_array[i]] = true;
    }
  }

  int num_vertices() const { return _vertices.size(); }

  // Get edges of vertex i
  const forward_list<GraphEdge>& edges_from(int i) const {
    return _vertices[i];
  }

  // Add an edge from source vertex to dest vertex with weight weight
  void addEdge(int source, int dest, int weight , int dir , bool undirected);
};

ostream& operator<<(ostream&, const GraphEdge&);
ostream& operator<<(ostream&, const Graph&);

#endif 
