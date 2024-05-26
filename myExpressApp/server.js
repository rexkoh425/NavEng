const express = require('express');
const mysql = require('mysql2');
const port = process.env.port || 5000;
const path = require('path');
const fs = require('fs');

const { spawn } = require('child_process');
const { defaultMaxListeners } = require('events');
const internal = require('stream');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use('/Pictures' , express.static(path.join(__dirname,'../Pictures')));

function opposite(enter_dir){
    switch(enter_dir){
        case "North" : 
            return "South";
        case "East" : 
            return "West";
        case "South" : 
            return "North";
        case "West" : 
            return "East";
        case "Up" :
            return "Down";
        case "Down" :
            return "Up";
    }
}
function ProcessRoom(inputData , current_node , res){
    const element = `(${current_node},${inputData.x_coordinate},${inputData.y_coordinate},${inputData.z_coordinate}, 'None' , 'None' , '${inputData.self_type}' , '${inputData.room_num}'),`;
    const filePath = `${__dirname}\\..\\get_paths\\today_sql_inputs.txt`;
    fs.appendFile(filePath, element + "\n", (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to file');
            return;
        }
        res.send("<p>Data has been written to the file.</p>");
    });
}

function ProcessElevator(inputData , current_node , res){
    const string_array = [];
    const num_of_dir = inputData['directions[]'].length;
    const enter_dir = inputData['directions[]'][0];
    for(let i = 1 ; i < num_of_dir ; i ++){
        string_array.push(`(${current_node},${inputData.x_coordinate},${inputData.y_coordinate},${inputData.z_coordinate}, '${enter_dir}' , '${inputData['directions[]'][i]}' , '${inputData.self_type}' , '${inputData.room_num}'),`);
    }
    string_array.push(`(${current_node},${inputData.x_coordinate},${inputData.y_coordinate},${inputData.z_coordinate}, '${opposite(enter_dir)}' , 'None' , '${inputData.self_type}' , '${inputData.room_num}'),`);
    const filePath = `${__dirname}\\get_paths\\today_sql_inputs.txt`;
    string_array.forEach((element, index) => {
        fs.appendFile(filePath, element + "\n", (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing to file');
                return;
            }
        });
        if(index == string_array.length-1){
            res.send("<p>Data has been written to the file.</p>");
        }
    });
}

function ProcessData(inputData , current_node , res){
  
    const num_of_dir = inputData['directions[]'].length;
    const serializedData = JSON.stringify(inputData['directions[]']);
    const cppProcess = spawn(__dirname + '/../get_paths/possible_path.exe' , []);
    cppProcess.stdin.write(serializedData);
    cppProcess.stdin.end();

    cppProcess.stdout.on('data', (data) => {
        const outputData = data.toString().split("|");
        //console.log(outputData);
        const size = outputData.length;
        for(let i = 0 ; i < size ; i++){
            outputData[i] = outputData[i].split("_");
        }   
        //console.log(outputData);
        writeFile(inputData , current_node , outputData , num_of_dir , res);
    });

    // Handle errors and exit events
    cppProcess.on('error', (error) => {
        console.error('Error executing C++ process:', error);
    });

    cppProcess.on('exit', (code) => {
        console.log('C++ process exited with code:', code);
    }); 
}

function insert_coor_id_pair(node , x_coordinate ,  y_coordinate , z_coordinate){
    const query = `INSERT INTO coor_id_pair(node_id,x_coordinate, y_coordinate, z_coordinate)
    VALUES (${node},${x_coordinate},${y_coordinate},${z_coordinate});`
    connection.query(query, (err, results) => {
        if (err){
            console.error('Error querying MySQL:', err);
            return;
        }
        console.log(`coordinates of ${node} inserted into database`);
    });
}
function writeFile(inputData , current_node ,  outputData , num_of_dir , res){

    const string_array = [];
    const names = [];
    for(let i = 0 ; i < num_of_dir ; i++){
        let string = `(${current_node},${inputData.x_coordinate},${inputData.y_coordinate},${inputData.z_coordinate}, '${inputData['directions[]'][i]}' , 'None' , '${inputData.self_type}' , '${inputData.room_num}'),`;
        string_array.push(string);
        let name = `<div>${current_node}_${inputData.x_coordinate}_${inputData.y_coordinate}_${inputData.z_coordinate}_${inputData['directions[]'][i]}_None_${inputData.self_type}_${inputData.room_num}</div><br>`;
        names.push(name);
        
    }
    const size = outputData.length;
    for(let i = 0 ; i < size ; i++){
        let string = `(${current_node},${inputData.x_coordinate},${inputData.y_coordinate},${inputData.z_coordinate}, '${outputData[i][0]}' , '${outputData[i][1]}' , '${inputData.self_type}' , '${inputData.room_num}'),`;
        string_array.push(string);
    }
    const filePath = `${__dirname}\\..\\get_paths\\today_sql_inputs.txt`;
    string_array.forEach((element, index) => {
        // Add a newline character after each element except the last one
        //const lineEnding = index < string_array.length - 1 ? '\n' : '';
        const lineEnding = "\n";
        fs.appendFile(filePath, element + lineEnding, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing to file');
                return;
            }
        });

        if(index == string_array.length-1){
            let response = "<p>Data has been written to the file.</p><br><br>";
            for(let i = 0 ; i < num_of_dir ; i++){
                response += names[i];
            }
            res.send(response);
        }
    });
}

function WriteDesmos(inputData , results){
    const filePath = `${__dirname}\\..\\get_paths\\Desmos_input.txt`;
    const element =  `Vector((${results[0]['x_coordinate']} , ${results[0]['y_coordinate']} , ${results[0]['z_coordinate']}) ,(${inputData.x_coordinate} , ${inputData.y_coordinate} , ${inputData.z_coordinate}))` + "\n";
    fs.appendFile(filePath, element, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to file');
            return;
        }
        console.log("Desmos input has been generated");
    });
}
function WriteEdge(source , dest , weight , direction){
    
    const filePath = `${__dirname}\\..\\get_paths\\Edge_inputs.txt`;
    const element = `g.addEdge(${source}, ${dest}, ${weight} , ${direction});` + "\n"; 
    fs.appendFile(filePath, element, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to file');
            return;
        }
        console.log("Edge has been written to Edge_inputs.txt");
    });
}

function abs(number){
    if(number > 0){
        return number;
    }
    return  0 - number;
}
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Orbital!@34',
    database: 'orbital'
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
});

app.get('/' , (req ,res) => { 
    res.sendFile(`C:\\NUS\\Data_collection\\Input_file.htm`);
});

app.post('/Senddata' , (req ,res) => { 
    const inputData = req.body;
    //checking for empty input
    //console.log(inputData);
    if(!inputData.room_num){
        return;
    }

    const query = `SELECT MAX(node_id) FROM coor_id_pair`;
    connection.query(query, (err, results) => {
        if (err){
            console.error('Error querying MySQL:', err);
            return;
        }
        const current_node = results[0]['MAX(node_id)'] + 1;
        insert_coor_id_pair(current_node , inputData.x_coordinate , inputData.y_coordinate , inputData.z_coordinate);
        const sub_query = `SELECT x_coordinate , y_coordinate , z_coordinate FROM coor_id_pair WHERE node_id = ${inputData.node_num}`;
        connection.query(sub_query, (err, results) =>{
            if (err){
                console.error('Error querying MySQL:', err);
                return;
            }
            
            const weight = abs(inputData.x_coordinate - results[0]['x_coordinate']) + abs(inputData.y_coordinate - results[0]['y_coordinate']) + abs(inputData.z_coordinate - results[0]['z_coordinate']);
            WriteEdge(inputData.node_num - 1, current_node - 1 , weight , inputData.direction.toUpperCase());
            WriteDesmos(inputData , results);
        });
        if(inputData['self_type'] == "Room"){
            ProcessRoom(inputData , current_node , res);
        }else if(inputData['self_type'] == "Elevator"){
            ProcessElevator(inputData,  current_node , res);
        }else{
            ProcessData(inputData , current_node, res);
        }
    });
    //console.log(current_node);
});

app.post('/deleteData' , (req,res) => {
    const query = `SELECT MAX(node_id) FROM coor_id_pair`;
    connection.query(query, (err, results) =>{
        if (err){
            console.error('Error querying MySQL:', err);
            return;
        }
        const current_node = results[0]['MAX(node_id)']; 
        const sub_query = `DELETE FROM coor_id_pair WHERE node_id = ${current_node}`;
        connection.query(sub_query, (err, results) =>{
            if (err){
                console.error('Error querying MySQL:', err);
                return;
            }
            res.send(`Node ${current_node} has been deleted from coor_id_pair table`);
        });
    });
});
app.listen(port , () => console.log(`Server started at http://localhost:${port}`));
