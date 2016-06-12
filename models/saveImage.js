var mongoose = require('mongoose');

// Create the MovieSchema.
var ImageSchema = new mongoose.Schema({
img: { data: Buffer, contentType: String }
});

// Export the model.
module.exports = mongoose.model('image', ImageSchema);
