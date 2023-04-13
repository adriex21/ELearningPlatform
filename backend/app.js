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

app.post('/api/run', async (req, res) => {
    const { code } = req.body;

    // Create a Docker container from the node:14 image
    const container = await docker.createContainer({
        Image: 'node:14',
        Tty: true,
        OpenStdin: true,
        AttachStdin: true,
        WorkingDir: '/usr/src/app', // Set the working directory to the Node.js app folder
        Cmd: ['sh', '-c', `echo "${code}" > backend/code.js && node backend/code.js`], // Use the correct path to the file containing the user code
    });

    // Attach stdin to allow user input
    await container.attach({ stream: true, stdin: true });

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