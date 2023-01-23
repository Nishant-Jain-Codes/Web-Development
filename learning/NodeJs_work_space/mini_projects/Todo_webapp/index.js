const express = require('express');
const expressLayouts = require('express-ejs-layouts'); 
const sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo');
const database = require('./config/mongoose');
const flash = require('connect-flash');
const customMW_flash = require('./config/customMiddleWare_flash');
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
app.use(cookieParser());
app.set(express.static('./assets'))
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(expressLayouts);
app.set('view engine','ejs');
app.set('views','./views')
app.use(session({
    name: 'To.Do',
    secret: 'somesecrettextblablablabla',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*60*24)//24hours
    },
    store: MongoStore.create(database);
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMW_flash.setFlash);
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