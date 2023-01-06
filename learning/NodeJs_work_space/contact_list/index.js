const express = require('express');
const port = 8000;
const app = express();//app now contains all functionalities of express module
app.get('/',function(req,res){
    res.send('its running ');
})
app.listen(port,function(error){
    if(error)
    {
        console.log('error occured : ',error);
        return;
    }
    else 
    {
        console.log('server is up and running on port : ',port);
        return;
    }
})