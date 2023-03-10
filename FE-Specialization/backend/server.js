const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require("fs");
const cors = require('cors');


  
// Reads JSON file
const users = require("./users");
// Create a new Express app
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
// body-parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Defining a route to handle form submissions
app.post('/submit', async (req, res) => {
  try {
    console.log("hello")
    // Create a new performance scorecard document from the request body
    users.push(req.body);
   
// STEP 3: Writing to a file
fs.writeFile("users.json", JSON.stringify(users), err => {
     
    // Checking for errors
    if (err) throw err; 
   
    console.log("writing into json file"); 
});

    res.json({ message: 'Performance scorecard submitted successfully' ,data:users});
  } catch (error) {
    // Return an error message
    res.status(500).json({ error: error.message });
  }
});

// Start the server listening on port 3000
app.listen(3001, () => {
  console.log('Server started on port 3001');
});







   
// STEP 2: Adding new data to users object
