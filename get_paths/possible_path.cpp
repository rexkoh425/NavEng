#include <cstdlib>
#include <stdlib.h>
#include <iostream>
#include <chrono>
#include <string>
#include <sstream>
#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"
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
    if (doc.IsObject()) {
        // Process JSON object
        // Example: Accessing a key named "example"
        if (doc.HasMember("source") && doc["source"].IsString()) {
            std::string value = doc["source"].GetString();
            //source = stoi(value) - 1;
        }

        if (doc.HasMember("destination") && doc["destination"].IsString()) {
            std::string value = doc["destination"].GetString();
            //dest = stoi(value) - 1  ;
        }
    } else {
        std::cerr << "Input is not a JSON object" << std::endl;
        return 1;
    }

    
    return 0 ;
}