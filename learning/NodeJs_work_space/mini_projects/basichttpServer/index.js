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
    res.end('got it ')
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