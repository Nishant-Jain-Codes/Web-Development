const express = require('express');
const app = express();
const port = 8000;

// * setting up a middle ware which will do the following
// * routing the home url to all the further url 
app.use('/',require('./routes'));

app.listen(port,function(error){
    if(error)
    {
        console.log(`Error occurred while starting the server ${error}`);
    }
    else
    {
        console.log(`Successfully started the server on port ${port}`);
    }
});