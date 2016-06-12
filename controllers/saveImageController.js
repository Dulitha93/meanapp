var Resource = require('resourcejs');
var fs = require('fs');
var path = require('path');

module.exports = function(app, route) {

  // Setup the controller for REST;
  Resource(app, '', route, app.models.image).rest();

  // Path to the test image
  var imgPath = path.normalize('./image.png');

app.models.image.remove(function (err) {
    if (err) throw err;

    console.error('removed old docs');

    // store an img in binary in mongo
    var a = new app.models.image;
    a.img.data = fs.readFileSync(imgPath);
    a.img.data = new Buffer(a.img.data).toString('base64');

    a.img.contentType = 'image/png';

    a.save(function (err, a) {
      if (err) throw err;

      console.error('saved img to mongo');

    });
  });
  // Return middleware.
  return function(req, res, next) {
    next();
  };
}