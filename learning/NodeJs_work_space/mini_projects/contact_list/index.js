//dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const { moveMessagePortToContext } = require('worker_threads');
const port = 8000;
const app = express();
//setting properties of app and giving them values app.set(value,property)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
//middle ware app.use(function(req,res,next));
app.use(bodyParser.urlencoded({extended: false}));//reads the form data and convert it into keys and values pair
app.use(express.static('assets'));
//============= get route controllers
app.get('/',function(req,res){
    
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts from db',err);
            return ;
        }
        else
        {
            return res.render('home',{
                'title' : 'Contacts list',
                contact_list : contacts
            });
        }
    });
});
app.get('/delete-contact/',function(req,res){
    //get id from the query in te url
    let id = req.query.id;
    //find the contact in the database useing id and delete it
    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log('error in deleting the contact',err);
            return;
        }
        else
        {
            res.redirect('back');
        }
    });
    
})
app.post('/create-contact',function(req,res){
    
    Contact.create({
        name: req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err)
        {
            console.log('error in adding the contact',err);
            return;
        }
        else
        {
            return res.redirect('back');
        }
    });

});
app.listen(port,function(error){
    if(error)
    {
        console.log('error occurred :-',error);
        return ;
    }
    else 
    {
        console.log('server is up and running on port :-',port);
    }
})