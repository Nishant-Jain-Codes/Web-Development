const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ToDo_WebApp_development');
const db = mongoose.connection;
 //when db starts some starting error may occur
 db.on('error',console.log.bind(console,'error connecting to db'));
 //once db starts and is available for us to interact to 
 db.once('open',function(){
     console.log('successfully connected to the database')
 });

 module.exports = db;