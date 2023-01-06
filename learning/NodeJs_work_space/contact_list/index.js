//dependencies
const express = require('express');
const path = require('path');
//variables
const port = 8000;
const app = express();
//setting properties of app and giving them values app.set(value,property)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.get('/',function(req,res){
    return res.render('home',{
        'title' : 'my contacts app'
    });
});
app.get('/profile',function(req,res){
    return res.render('profile');
});
app.listen(port,function(error){
    if(error)
    {
        console.log('error occured :-',error);
        return ;
    }
    else 
    {
        console.log('server is up and running on port :-',port);
    }
})