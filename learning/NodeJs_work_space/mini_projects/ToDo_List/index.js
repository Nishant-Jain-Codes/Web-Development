const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));//reads the form data and convert it into keys and values pair
app.use(express.static('./assets'));
app.use('/',require('./routes/index'));
app.set('view engine' , 'ejs');
app.set('views','./views');
app.listen(port,function(error){
    if(error)
    {
        console.log(`error occurred in starting the server : ${error}`);
    }
    else
    {
        console.log(`successfully started the server on port ${port}`);
    }
})