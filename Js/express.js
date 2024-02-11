const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Middleware to enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://azaken1248.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

// Endpoint to receive data from clients and process it
app.post('/storedata', (req, res) => {
    const data = req.body;
    console.log('Received data from client:', data);
    // Process the data (store it in a database, forward it to another service, etc.)
    res.sendStatus(200); // Send a success response
});

// SSL/TLS options
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    passphrase: 'auth'
};

// Create HTTPS server
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
