const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//requirements for session cookie and authentication
const session= require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const app = express();
const port = 8000;
const sassMiddleware = require('node-sass-middleware');
//middleware to convert scss to css
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
//setting url parser middle ware
app.use(bodyParser.urlencoded({extended: false}));
//telling app to use cookies parser
app.use(cookieParser());
//telling app to where to lookout for static files
app.use(express.static('./assets'));
//put style and script from sub pages to their destined location 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//telling app tha all views belong to some layout
app.use(expressLayouts);

app.set('view engine','ejs');
app.set('views','./views');
//encoding the cookies
//mongo store is use to store the session cookie in the dp so that user doesn't get logged out after every server reset
app.use(session({
    name : 'codeComm',
    //TODO: change the secret before deployment
    secret: 'blaSomethingSecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100) //hundred minutes
    },
    store: MongoStore.create(db)
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
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