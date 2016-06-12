/**
 * Created by dulithadabare on 6/9/16.
 */
var Resource = require('resourcejs');
module.exports = function(app, route) {

    // Setup the controller for REST;
    Resource(app, '', route, app.models.advertisement).rest();



    // Return middleware.
    return function(req, res, next) {
        next();
    };
}
