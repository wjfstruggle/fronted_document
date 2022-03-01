const http = require("http");

http.createServer((request,response) => {
  response.writeHead(200,{'Content-type':"text/plain"})
  response.end("hello word\n")
}).listen(3000)

console.log("服务器开始运行");