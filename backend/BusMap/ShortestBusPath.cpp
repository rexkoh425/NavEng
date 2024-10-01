#include "ShortestBusPath.h"
#include "BusHeap.h"

#define INFINITY_SELF 999999

bool check_node_exist(int nodes , int source , int dest){
  return (source >= 0 && dest >= 0 && source < nodes && dest < nodes);
}

Path shortestPath(const BusGraph& g, int source, int dest) {
  
  if(!check_node_exist(g.num_vertices() , source ,dest)){
    throw std::out_of_range("no such nodes");
  }
  
  Heap table(g.num_vertices());
  vector<int> path;
  vector<string> line;
  vector<int> dist_array;
  int dist_from_source = 0;
  int num_of_nodes = g.num_vertices();
  bool *visit_table = new bool[num_of_nodes];
  int *parent = new int[num_of_nodes];
  string *lines = new string[num_of_nodes];
  int *parent_dist = new int[num_of_nodes];
  bool reached_dest = false;
  
  for(int i = 0 ; i < num_of_nodes; i++){
    if(i != source){
      table.insert(BusGraphEdge(i , INFINITY_SELF , ""));
      visit_table[i] = false;
    }else{
      table.insert(BusGraphEdge(source ,0 , ""));
      visit_table[source] = true;
    }
    parent[i] = i;
    lines[i] = "";
    parent_dist[i] = 0;
  }
  int count = 0 ;
  while(!table.empty()){
    BusGraphEdge current_node = table.extractMin();
    int current_dest = current_node.dest();
    int current_weight = current_node.weight();
    visit_table[current_dest] = true;
    if(current_dest == dest){
      dist_from_source = current_weight;
      reached_dest = true;
      break;
    }
    forward_list<BusGraphEdge> neighbours = g.edges_from(current_dest);
    //for every element in forward list relax them
    for(auto i = neighbours.begin() ; i != neighbours.end() ; i++){
      BusGraphEdge current = *i;
      int node = current.dest();
      int table_dist = table[node].weight();
      if(!visit_table[node] &&  (current_weight + current.weight()) < table_dist){
        table_dist = current_weight + current.weight();
        BusGraphEdge new_node = BusGraphEdge(node , table_dist , current.line());
        table.changeKey(current  , new_node);
        parent[node] = current_dest;
        lines[node] = current.line();
        parent_dist[node] = current.weight();
      }
    }
  }

  if(!visit_table[dest]){
    throw std::out_of_range("cannot reach dest");
  }

  int parent_node = dest;
  path.insert(path.begin() , parent_node);
  while(parent_node != source && parent[parent_node] != parent_node){//was (parent_node != source)
    line.insert(line.begin(), lines[parent_node]);
    dist_array.insert(dist_array.begin(), parent_dist[parent_node]);
    parent_node = parent[parent_node];
    path.insert(path.begin() , parent_node);
  }

  delete[] parent;
  delete[] visit_table;
  delete[] lines;
  return Path(dist_from_source, path , line , dist_array);
}
