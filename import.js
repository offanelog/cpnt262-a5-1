const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Import seed data
const dbSeed = require(`./seeds/comics.js`);

// Define model
const Animal = require(`./models/comic.js`);

/*******************************/
/* Mongoose/MongoDB Connection */
/*******************************/

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`)
});

db.once('open', function() {
  console.log('Connected to database...');

});

Comic.insertMany(dbSeed, function(error, comic) {
  console.log('Data import completed.')
  // log comics
  console.log(comics);
  mongoose.connection.close();
});