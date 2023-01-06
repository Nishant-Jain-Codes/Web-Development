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
        phone:'1112312'
    },
    {
        name:'ishant',
        phone:'1231212'
    },
    {
        name:'arun',
        phone:'21123112'
    },
    {
        name:'varun',
        phone:'22312312'
    },
    {
        name:'bhem',
        phone:'12211323'
    },
    {
        name:'aron',
        phone:'12331231'
    }
]
//setting properties of app and giving them values app.set(value,property)

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(bodyParser.urlencoded({extended: false}));
app.get('/',function(req,res){
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