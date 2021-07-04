const http = require('http');
const serverHandler = require('./server-request-handler');

console.log(serverHandler.sampleText);

const server = http.createServer(serverHandler.handler);
server.listen(3000);