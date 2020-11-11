// Load dependencies
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Comic = require(`./models/comic.js`);

// Import seeds
const comics = require('./seeds/comics.js')

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
app.get('/api/v0/classics', (req, res) => {
  res.json(comics);
});

// endpoint for individual objects
app.get('/api/v0/classics/:id', (req, res) => {
  const found = comics.find(comic => comic.id == parseInt(req.params.id));
  if (found) {
    res.json(found);
  }
  else {
    res.send('404: select another issue');
  }
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