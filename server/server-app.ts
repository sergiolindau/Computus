import * as http from "http";
import * as https from "https";
import * as fs from "fs";
//https://nodejs.org/api/http.html#event-connect
//https://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node
//https://www.npmjs.com/package/whois
const serverport = 8000;
const servername = "server-app";

const clientport = 80;
//https://hpiers.obspm.fr/eop-pc/index.php?index=webservice
const options = {
    host: 'hpiers.obspm.fr',
    path: '/eop-pc/webservice/CURL/date_to_EOP.php?year=2022&month=4&day=5'
}

var requestData: string;
const request = https.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        requestData = data;
    });
});

request.on('error', function (e) {
    console.log(e.message);
});

request.end();

const requestListener = function (this: http.Server, req: http.IncomingMessage, res: http.ServerResponse)/*: http.Server*/ {
        console.log(req.socket?.remoteAddress)
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(requestData);
};

function requestListenerHelloWorld(this: http.Server, req: http.IncomingMessage, res: http.ServerResponse): http.Server {
    res.write("Hello World!");
    res.end();
    return this;
}


const server = http.createServer(requestListener);

server.listen(serverport, function(error: string) {
    if (error) {
        console.log(`Error: ${servername}:`, error);
    }
    else {
        console.log(`Server ${servername}.js is running at port ${serverport}`);
    }
} as () => void);