#include <cstdlib>
#include <stdlib.h>
#include <iostream>
#include <chrono>
#include <string>
#include <sstream>
#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"
#include "directions.h"
using namespace std;
using namespace rapidjson;

int main(){
  
    std::string inputData;
    std::getline(std::cin, inputData);

    // Parse JSON string into a JSON document
    Document doc;
    if (doc.Parse(inputData.c_str()).HasParseError()) {
        std::cerr << "Error parsing JSON" << std::endl;
        return 1;
    }

    // Access JSON data
    if (doc.IsArray()) {

      const Value& directionsArray = doc.GetArray();
      bool enter[4] = {false};
        
      for(int i = 0 ; i < directionsArray.Size() ; i ++){
        if (directionsArray[i].IsString()){
          std::string directions = directionsArray[i].GetString();
          int direction = DirToInt(directions);
          enter[direction] = true;
          //cout << direction << endl;
        }
      }
      output_paths(enter);
    } else {
        std::cerr << "Input is not a JSON object" << std::endl;
        return 1;
    }
    return 0 ;
    
   //bool enter[4] = {1,1,1,1};
   //output_paths(enter);
}