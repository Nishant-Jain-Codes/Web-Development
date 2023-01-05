const http = require('http');
const port = 8000;
const fs = require('fs');//fs =='file system'
//./Web-Development/learning/NodeJs_work_space/basichttpServer/index.html
function requestHandler(req,res)
{
    console.log(req.url);
     res.writeHead(200,{
        'content-type':'text/html'
     })
     let filePath;
     switch(req.url)
     {
        case '/':
            filePath = './Web-Development/learning/NodeJs_work_space/basichttpServer/index.html';
            break;
        case '/profile':
            filePath = './Web-Development/learning/NodeJs_work_space/basichttpServer/profile.html';
            break;
        default :
            filePath = './Web-Development/learning/NodeJs_work_space/basichttpServer/404.html';
            break;
     }
     fs.readFile(filePath,function(err,data)
     {
        if(err)
        {
            console.log('error occurred',err);
            return res.end('<h1>Error occured</h1> ');
            
        }
        else
        {
            return res.end(data);
        }
     })
    // res.end('<h1>got it</h1> ')
}
const server = http.createServer(requestHandler);
server.listen(port,function (error){
    if(error)
        {
            console.log(error);
            return;
        }
    else 
        {
            console.log("server is running on port: ",port);
        }
});