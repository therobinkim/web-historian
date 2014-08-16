var http = require("http");
var handler = require("./request-handler");

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);
// var server = http.createServer(function(req, res) {
//   // we can put routing logic here
//     // we can parse the URL
//     // if only '/', then index.html
//     // if anything else, then search for it in our sites
//   // and send it off to requestHandler as needed
//   handler.handleRequest(req, res, whichAssetToShow);
// });
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

