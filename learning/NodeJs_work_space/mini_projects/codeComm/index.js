const express = require('express');
const app = express();
const port = 8000;

//use express router
    //* use is a middle ware 
    //*->(every url starting from'/' will require the route written in index)
app.use('/',require('./routes/index'));
//starting the server 
app.listen(port,function(error){
    if(error)
    {
        console.log(`Error in running the server : ${error}`);
        return;
    }
    else
    {
        console.log(`server is running on ${port}`);
        return;
    }
});