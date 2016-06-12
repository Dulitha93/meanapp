var mongoose = require('mongoose');

// Create the MovieSchema.
var StatisticsSchema = new mongoose.Schema({
    advertisementID: {
        type: String,
        required: true
    },
    numberOfViews: {
        type: String
    },
    numberOfURLSearchs: {
        type: String
    },
    numberOfKeywordSearchs: {
        type: String
    },
    numberOfClicks: {
        type: String
    },
    clickedLocationIDs: {
        type: String
    },
    userID: {
        type: String,
        default: '0'
    }

});

// Export the model.
module.exports = mongoose.model('statistics', StatisticsSchema);

