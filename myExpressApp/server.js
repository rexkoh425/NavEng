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

function ProcessData(inputData , current_node , res){
    //console.log(inputData);
    const num_of_dir = inputData['directions[]'].length;
    const serializedData = JSON.stringify(inputData['directions[]']);
    //console.log(serializedData);
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

function writeFile(inputData , current_node ,  outputData , num_of_dir , res){

    const string_array = [];
    
    for(let i = 0 ; i < num_of_dir ; i++){
        let string = `(${current_node},${inputData.x_coordinate},${inputData.y_coordinate},${inputData.z_coordinate}, '${inputData['directions[]'][i]}' , 'None' , '${inputData.self_type}' , '${inputData.room_num}')`;
        string_array.push(string);
    }
    const size = outputData.length;
    for(let i = 0 ; i < size ; i++){
        let string = `(${current_node},${inputData.x_coordinate},${inputData.y_coordinate},${inputData.z_coordinate}, ${outputData[i][0]} , ${outputData[i][1]} , ${inputData.self_type} , ${inputData.room_num})`;
        string_array.push(string);
    }
    const filePath = 'C:\\Users\\rexko\\OneDrive\\Desktop\\NUS\\Data_collection\\get_paths\\today_sql_inputs.txt';
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
            res.send("<p>Data has been written to the file.</p>");
        }
    });
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
    res.sendFile(`C:\\Users\\rexko\\OneDrive\\Desktop\\NUS\\Data_collection\\Input_file.htm`);
});

app.post('/Senddata' , (req ,res) => { 
    const inputData = req.body;
    //checking for empty input
    //console.log(inputData);
    if(!inputData.room_num){
        return;
    }

    const query = `SELECT MAX(node_id) FROM pictures`;
    let current_node = 0;
    connection.query(query, (err, results) => {
        if (err){
            console.error('Error querying MySQL:', err);
            return;
        }
        current_node = results[0]['MAX(node_id)'];
        ProcessData(inputData , current_node, res);
    });
    //console.log(current_node);
});

app.listen(port , () => console.log(`Server started at http://localhost:${port}`));
