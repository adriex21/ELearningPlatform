const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routes')
const bodyParser=require('body-parser')
const {exec} =  require('child_process')

const app = express();
const port = process.env.PORT || 8080
app.use(express.json());
app.use(cors());
app.options('*', cors())
app.listen(port, console.log('Server is on port: ' + port));
app.use('/api', router);

app.post('/compile', async (req, res) => {
    const { code } = req.body;
    
    // Create a Docker container from an image that has your desired compiler
    const container = await docker.createContainer({
      Image: 'your-compiler-image-name',
      Cmd: ['sh', '-c', `echo "${code}" > code.js && node code.js`],
    });
  
    // Start the container
    await container.start();
  
    // Wait for the container to finish running the command
    const { statusCode, data } = await container.wait();
  
    // Get the output of the command from the container logs
    const output = await container.logs({ stdout: true, stderr: true });
  
    // Remove the container
    await container.remove();
  
    // Send the output back to the client
    res.status(statusCode).send({ output });
  });
  

module.exports = app;