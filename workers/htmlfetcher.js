  // eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var httpRequest = require('http-request');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

// read the file
fs.readFile(archive.paths.list, function(err, data) {
  var sites = data.toString().split('\n');
  sites.forEach(
    function(site) {
      httpRequest.get('http://' + site, archive.paths.archivedSites + '/' + site, function(){});
    }
  );
});
