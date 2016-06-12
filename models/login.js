/**
 * Created by dulithadabare on 6/8/16.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var    SALT_WORK_FACTOR = 10;
var user = require('mongoose').model('user');

// Create the MovieSchema.
var LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isMatching: {
        type: String
    },
    userID: {
        type: String,
        default: '0'
    }


});

LoginSchema.pre("save", function(next) {
    var loginAttempt = this;

    // we assume username is unique. needs to be validated in client

    user.findOne({'userName' : loginAttempt.username}, 'userName password companyName', function(err, userResult){


        //  if (err) return handleError(err);
        if(userResult == null){
            console.log('The username does not match');
            console.log(loginAttempt.password);
            loginAttempt.isMatching = '0';
            next();
        }else {
            bcrypt.compare(loginAttempt.password, userResult.password, function(err, res) {
                // res == true
                if(res){
                    loginAttempt.isMatching = '1';
                    loginAttempt.userID = userResult._id;
                    console.log('passwords match');
                    next();

                }else{
                    console.log('passwords do not match');
                    loginAttempt.isMatching = '0';
                    next();
                }

            });

        }
    });





});

// Export the model.
module.exports = mongoose.model('login', LoginSchema);