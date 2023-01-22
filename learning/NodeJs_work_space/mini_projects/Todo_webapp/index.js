const express = require('express');
const port = 8000;
const app = express();
//setting up view engine and views source
app.set('view engine','ejs');
app.set('views','./views')
app.use('/',require('./routes'));
app.listen(port,function(error){
    if(error){
        console.log('error on starting the server',error);
        return;
    }
    else {
        console.log(`server started successfully on port ${port}`);
        return;
    }
});