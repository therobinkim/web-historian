var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  fs.readFile(asset, function(err, html) {
    console.log(asset);
    if(err) {
      // if there's an error, then 404!
      res.writeHead(404, headers);
      res.end();
    } else {
      res.writeHead(200, headers);
      res.write(html);
      res.end();
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!
