//output not working properly currently

const http = require('http');
const port = 8001;
const fs = require('fs');//fs =='file system'
function requestHandler(req,res)
{
    res.writeHead(200,{
        'content-type':'text/html'
     })
    let filePath = './Web-Development/learning/javascript/shape and colour changer/index.html';
    fs.readFile(filePath,function(error,data){
        if(error)
        {
            console.log('error',error);
            return res.end('<h1>Error occured</h1> ');
        }
        else
        {
            return res.end(data);
        }
    })  
}
const server = http.createServer(requestHandler);
server.listen(port,function(error){
    if(error)
        {
            console.log(error);
            return;
        }
    else 
        {
            console.log("server is running on port: ",port);
        }
})