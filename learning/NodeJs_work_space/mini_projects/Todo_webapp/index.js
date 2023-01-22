const express = require('express');
const expressLayouts = require('express-ejs-layouts'); 
const port = 8000;
const app = express();
app.set(express.static('./assets'))
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(expressLayouts);
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