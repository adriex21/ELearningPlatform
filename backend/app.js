const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routes')
const bodyParser=require('body-parser')
const {exec} =  require('child_process')
const Docker = require('dockerode');
const docker = new Docker();


const app = express();
const port = process.env.PORT || 3000
app.use(express.json());
app.use(cors());
app.options('*', cors())
app.listen(port, console.log('Server is on port: ' + port));

app.post('/compile', async (req, res) => {
    const encodedCode = req.body.code;

    console.log(req.body);
    
    // Create a Docker container from an image that has your desired compiler
    const container = await docker.createContainer({
      Image: 'gcc:latest',
      Tty: true,
      Cmd: ['sh', '-c', `echo "${encodedCode}" | base64 -d > code.cpp && g++ code.cpp -o code && ./code`],
    });
  
    // Start the container
    await container.start();
  
    // Wait for the container to finish running the command
    await container.wait();
  
    // Get the output of the command from the container logs
    const output = await container.logs({ stdout: true, stderr: true , stdin:true});
    const outputString = output.toString();
    // Remove the container
    await container.remove();
  
    // Send the output back to the client
    res.send({ output: outputString });
  });

  
  

module.exports = app;