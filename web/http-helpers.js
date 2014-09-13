var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, site) {
  fs.readFile(asset, function(err, html) {
    // not in archives/sites
    if(err) {
      site = site.substring(1);
      lookForArchivedSite(site, function(found) {
        // in sites.txt, just not archived yet
        if(found) {
          redirect(res, 'loading.html');
        }
        // not in sites.txt, 404!
        else {
          res.writeHead(404, headers);
          res.end();
        }
      });
    }
    // we have already archived it; serve it up!
    else {
      res.writeHead(200, headers);
      res.write(html);
      res.end();
    }
  });
};

exports.redirect = redirect = function(res, redirectPage) {
  res.writeHead(302, _.extend({
    'Location': '/' + redirectPage
  }, headers));
  res.end();
};

exports.lookForArchivedSite = lookForArchivedSite = function(site, callback) {
  var found = false;
  fs.readFile(
    archive.paths.list,
    function(err, data){
      var sites = data.toString().split('\n');

      sites.forEach(
        function(line, index) {
          if(site === line) {
            found = true;
            // i dont think we can actually return out of forEach()
            return found;
          }
        }
      );
      callback(found);
    }
  );
};
