const fs = require('fs');
const  userList = ['Ruby', 'Nicky', ' Pratham' , 'nani', 'nanu', 'Aryaman'];
const requestHander = (req, res) => {
    const url = req.url;
    const method = req.method;
    console.log('test');

    if (url === '/home') {
        res.write('<html>');
        res.write('<head><title>Enter Message2</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        const body =[];
        req.on('data', chunk =>{
            body.push(chunk);
        });
        return req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message , err =>{
                res.statusCode = 302;
                res.setHeader('Location', '/home');
                return res.end();
            });
        });
    }
    if(url === '/users'){
        res.write('<html>');
        res.write('<ul>');
        for(let name of userList){
            res.write('<li>' + name + '</li>');
        }
        res.write('</ul>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="newUser"><button type="submit">Create User</button></form>');
        res.write('</html>');
        return res.end();
    }
    if(url ==='/create-user' && method === "POST"){
        const body = [];
        req.on('data', chunk =>{
            body.push(chunk);
        });
        return req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            userList.push(user);
            res.statusCode = 302;
            res.setHeader('Location', '/users');
            return res.end();
        });
    }
    // default case
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = {
    handler : requestHander,
    sampleText: 'hello from server request handler file'
}

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

// exports.handler = requestHandler;
// exports.someText = 'Some hard coded text';