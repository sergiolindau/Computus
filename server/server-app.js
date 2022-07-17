import * as http from "http";
import * as https from "https";
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
};
var requestData;
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
const requestListener = function (req, res) {
    var _a;
    console.log((_a = req.socket) === null || _a === void 0 ? void 0 : _a.remoteAddress);
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(requestData);
};
function requestListenerHelloWorld(req, res) {
    res.write("Hello World!");
    res.end();
    return this;
}
const server = http.createServer(requestListener);
server.listen(serverport, function (error) {
    if (error) {
        console.log(`Error: ${servername}:`, error);
    }
    else {
        console.log(`Server ${servername}.js is running at port ${serverport}`);
    }
});
