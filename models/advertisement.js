var mongoose = require('mongoose');

// Create the MovieSchema.
var AdvertisementSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    time: {
        type: String
    },
    demography: {
        type: String
    },
    advertisementID: {
        type: String
    },
    searchURL: {
        type: String
    },
    searchKeywords: {
        type: String
    },
    description: {
        type: String
    },
    enabled: {
        type: String,
        default: '0'
    },
    userID: {
        type: String,
        default: '0'
    }


});

AdvertisementSchema.post('save', function(savedAdvertiesment) {
    console.log('%s has been saved', savedAdvertiesment.title);
    //var base64String = new Buffer(savedAdvertiesment.image.data).toString('base64');
  //  console.log(savedAdvertiesment.image);

});

// Export the model.
module.exports = mongoose.model('advertisement', AdvertisementSchema);
