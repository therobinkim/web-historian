var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log("we are in handleRequest");

  // if GET to '/', then index.html
  // if GET to '/anything else' and we have it, then anything else
  // if GET to '/doesnt exist', then 404
  // if POST to '/', then process and redirect to loading.html

  //assign status code
  var statusCode;
  if( req.method === 'GET' ) {
    console.log( req.url );
    if( req.url === '/' ) {
      // statusCode = 200;
      httpHelper.serveAssets(res, archive.paths.siteAssets + '/' + 'index.html');
    } else if( req.url === '/styles.css' ) {
      httpHelper.serveAssets(res, archive.paths.siteAssets + '/' + 'styles.css');
    } else if( req.url === '/loading.html') {
      httpHelper.serveAssets(res, archive.paths.siteAssets + '/' + 'loading.html');
    } else {
      // console.log(archive.archivedSites);
      // console.log()
      httpHelper.serveAssets(res, archive.paths.archivedSites + req.url);
      // attempt to fetch the page
      // send 404 if doesnt exist
    }
  } else if (req.method === 'POST') {

  } else {
    console.log("Request method is: " + req.method);
  }
};
