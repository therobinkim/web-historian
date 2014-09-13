var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var fs = require('fs');
var _ = require('underscore');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var statusCode;
  if( req.method === 'GET' ) {
    console.log( req.url );
    if( req.url === '/' ) {
      httpHelper.serveAssets(res, archive.paths.siteAssets + '/' + 'index.html');
    } else if( req.url === '/styles.css' ) {
      httpHelper.serveAssets(res, archive.paths.siteAssets + '/' + 'styles.css');
    } else if( req.url === '/loading.html') {
      httpHelper.serveAssets(res, archive.paths.siteAssets + '/' + 'loading.html');
    } else {
      httpHelper.serveAssets(res, archive.paths.archivedSites + req.url, req.url);
    }
  } else if (req.method === 'POST') {
    var chunk = "";
    var site;
    req.on( 'data', function( buffer ){
      chunk += buffer.toString();
      site = chunk.substring(4);
      httpHelper.lookForArchivedSite(site, function(found) {
        if(found) {
          httpHelper.redirect(res, site);
        } else {
          fs.appendFile(archive.paths.list, site + '\n');
          httpHelper.redirect(res, 'loading.html');
        }
      });
    });
  } else {
    console.log("Request method is: " + req.method);
  }
};
