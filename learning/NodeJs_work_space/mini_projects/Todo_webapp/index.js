const express = require('express');
const expressLayouts = require('express-ejs-layouts'); 
const sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocalStratergy = require('./config/passport-local-strategy');
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
    prefix: '/assets/css'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.set(express.static(__dirname + './assets'))
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(expressLayouts);
app.set('view engine','ejs');
app.set('views','./views')
app.use(session({
    name: 'To.Do',
    //TODO: change the secret before deployment
    secret: 'asdufhaskdfhaskfjhaskjfhqou1971210201sd8',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*60*24)//24hours
    },
    store: MongoStore.create(database)
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);//some error here //!TypeError: app.use() requires a middleware function
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