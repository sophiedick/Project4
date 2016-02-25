var mongoose = require("mongoose");
var sendgrid = require('sendgrid')('sophiedick', 'jonathan1985')


var bookingSchema = mongoose.Schema({
  address: { 
    line1: String, 
    town: String,
    county: String,
    postcode: String
  },
  service: String,
  date: String,
  time: String,
  available: {type: Boolean, default: false},
  archive: {type: Boolean, default: false},
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});



module.exports = mongoose.model('Booking', bookingSchema);

