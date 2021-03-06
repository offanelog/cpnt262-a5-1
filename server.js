// Load dependencies
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Comic = require(`./models/comic.js`);
const { request } = require('http');

// Create express app
const app = express();
app.set('view engine','ejs')

// app.use is for using middleware
app.use(express.static(path.join(__dirname, 'public')));

// Connect to DB
mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`)
});

db.once('open', function() {
  console.log('connected to database...');

});


// endpoint for all objects
// thanks Patrick!
app.get('/api/v0/classics', (req, res) => {
  Comic.find({}, (err, data) => {
    if (err) {
      res.send('Could not retrieve comics')
    }
    else {
      res.json(data);
    }
  });
});

// endpoint for individual objects
// thanks Patrick!
app.get('/api/v0/classics/:id', (req, res) => {
  Comic.findOne({id: req.params.id}, (err, data) => {
    if (err || data===null) {
      res.send('Could not find comic');
      console.log(err);
    }
    else {
      res.json(data);
    }
  });
});

// Add more middleware
app.use(function(req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});

// Set port preferrence with default
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});