const express = require('express');
const expressLayouts = require('express-ejs-layouts'); 
const sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();
app.use(sassMiddleware({
    src: './assets/sass',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
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