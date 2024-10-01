#ifndef __SHORTESTPATH_H__
#define __SHORTESTPATH_H__

#include <vector>
#include "BusGraph.h"

using std::vector;

class Path {
 private:
  const int _total_distance;
  const vector<int> _path;
  const vector<string> _lines;
  const vector<int> _dist_array;

 public:
  Path(int total_distance, vector<int> path , vector<string>lines , vector<int> dist_array)
      : _total_distance(total_distance), _path(path) , _lines(lines) , _dist_array(dist_array){}
  int total_distance() const { return _total_distance; }
  const vector<int>& path() const { return _path; }
  const vector<string>& lines() const { return _lines; }
  const vector<int>& dist_array() const { return  _dist_array; }
};

Path shortestPath(const BusGraph& g, int source, int dest);

#endif 
