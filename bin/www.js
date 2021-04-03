const serverHandle = require("../app");
const http = require('http');
const PORT = 3000;
const server = http.createServer(serverHandle);

server.listen(PORT,()=>console.log("服务启动成功"))
