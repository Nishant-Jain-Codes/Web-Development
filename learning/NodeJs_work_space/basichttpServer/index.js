const http = require('http');
const port = 8000;
function requestHandler(req,res)
{
    console.log(req.url);       
    res.writeHead();
    res.end('got it ');
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
            console.log("server is up and running on port : ",port);
        }
});