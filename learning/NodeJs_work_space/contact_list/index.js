//dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//variables
const port = 8000;
const app = express();
//contact list data
let contactList =[
    {
        name:'nishant',
        phone:'1233245326'
    },
    {
        name:'ishant',
        phone:'1233423456'
    },
    {
        name:'arun',
        phone:'1233445566'
    },
    {
        name:'varun',
        phone:'1233123466'
    },
    {
        name:'bhem',
        phone:'1233412356'
    },
    {
        name:'aron',
        phone:'1232445566'
    }
]
//setting properties of app and giving them values app.set(value,property)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
//middle ware app.use(function(req,res,next));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('assets'));
//============= get route controllers
app.get('/',function(req,res){
    // console.log('my name from get ="/" : ',req.myName);
    return res.render('home',{
        'title' : 'Contats list',
        contact_list : contactList
    });
});
app.get('/profile',function(req,res){
    return res.render('profile');
});


app.post('/create-contact',function(req,res){
    contactList.push({
        name : req.body.name,
        phone : req.body.phone
    });
    return res.redirect('back');
    // return res.redirect('/');can use this too
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