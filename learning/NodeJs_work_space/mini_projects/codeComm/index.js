const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
//setting url parser middle ware
app.use(bodyParser.urlencoded({extended: false}));
//telling app to use cookier parser
app.use(cookieParser());
//telling app to where to lookout for static files
app.use(express.static('./assets'));
//put style and script from sub pages to their destined location 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//telling app tha all views belong to some layout
app.use(expressLayouts);
// * routing the home url to all the further url 
app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');

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