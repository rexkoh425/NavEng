#include "ShortestBusPath.cpp"
#include "BusGraph.cpp"
#include "BusMap.h"
#include <cstdlib>
#include <stdlib.h>
#include <iostream>
#include <chrono>
#include <string>
#include <sstream>
#include "../Dijkstra/rapidjson/document.h"
#include "../Dijkstra/rapidjson/writer.h"
#include "../Dijkstra/rapidjson/stringbuffer.h"
using namespace std;
using namespace rapidjson;


int main(){
    /*
    std::string inputData;
    std::getline(std::cin, inputData);

    Document doc;
    if (doc.Parse(inputData.c_str()).HasParseError()) {
        std::cerr << "Error parsing JSON" << std::endl;
        return 1;
    }

    int source = 0;
    int dest = 0;

    // Access JSON data
    if (doc.IsObject()) {
        if (doc.HasMember("source")) {
          source = doc["source"].GetInt() - 1;
        }
        if (doc.HasMember("destination")) {
          dest = doc["destination"].GetInt() - 1;
        }
    } else {
      std::cerr << "Input is not a JSON object" << std::endl;
      return 1;
    }
    */

    int source = 0;
    int dest = 2;
    BusGraph BusMap = createBusGraph();

      Path result = shortestPath(BusMap , source ,  dest);
      vector<int> final_path = result.path();
      vector<string> lines = result.lines();
      vector<int> dist_between = result.dist_array();
      int distance = result.total_distance();
      
      int size = final_path.size();
      for(int i = 0 ; i < size ; i++){
        cout << final_path[i] + 1;
        if(i != size-1){
          cout << ",";
        }
      }
      cout << "|";
      size = lines.size();
      for(int i = 0 ; i < size ; i++){
        cout << lines[i];
        if(i != size-1){
          cout << ",";
        }
      }

      cout << "|" << distance;

      cout << "|";
      size = dist_between.size();
      for(int i = 0 ; i < size ; i++){
        cout << dist_between[i];
        if(i != size-1){
          cout << ",";
        }
      }
      return 0;
}