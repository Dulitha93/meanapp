var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var    SALT_WORK_FACTOR = 10;

// Create the MovieSchema.
var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  userName: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  enabled: {
    type: Boolean,
    required: true
  }
});


UserSchema.pre("save", function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Export the model.
module.exports = mongoose.model('user', UserSchema);
