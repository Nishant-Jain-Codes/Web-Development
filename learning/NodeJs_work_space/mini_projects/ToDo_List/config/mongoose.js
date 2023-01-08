 //required mongose
 const mongoose = require('mongoose');
 //connected mongoose to database -> todo_list_db
 mongoose.connect('mongodb://127.0.0.1:27017/todo_list_db');
 // aquired the connection to check if its success full
 // db will be use to access the data base and check if its connected of not 
 const db = mongoose.connection;
 
 
 
 //when db starts some starting error may occur
 db.on('error',console.log.bind(console,'error connecting to db'));
 //once db starts and is available for us to interact to 
 db.once('open',function(){
     console.log('successfully connected to the database')
 });