var Booking = require("../models/booking");
var User = require("../models/user");
var url = require('url');
var sendgrid = require('sendgrid')('process.env.SENDGRID_USERNAME', 'process.env.SENDGRID_PASSWORD')

function bookingsIndex(req, res){
  Booking.find({})
  .populate('user')
  .exec(function(err, userDetails) {
    if (err) return res.status(404).send(err);
    res.status(200).send(userDetails);
  });
}

function bookingsAdminIndex(req, res){
  
  var query = {};

  var params = url.parse(req.url,true);

  if(params.query.archive) {
    query = {archive: params.query.archive};
  }

  else if(params.query.available) {

    query = {available:params.query.available};

  }

  Booking.find(query)
    .populate('user')
    .exec(function(err, userDetails){
      if(err) console.log(err);
      console.log(userDetails);
      res.status(200).send(userDetails);
    });

}

function showAdminBookings(req,res){
  Booking.findOne({})
}


function bookingsCreate(req, res){

  var booking = new Booking(req.body);

  booking.save(function(err){
    //console.log(booking);
    if (err) return res.status(500).send(err);
    var id = booking.user;
    console.log(id);
    User.findById({ _id: id }, function(err, user){
      console.log("heelloooo");
      //console.log(booking);
       user.bookings.push(booking);
       //console.log(user.bookings);
       user.save();
       sendgrid.send({
        to: 'sophiefdick@gmail.com',
        from: user.local.email,
        subject: "NEW BOOKING",
        text: "Please view in HTML",
        html: "Name: " + user.local.fullname + 
              "<br>Service: " + booking.service + 
              "<br>Date: " + booking.date + " " + booking.time + 
              "<br>Address: " + booking.address.line1 + ", " + booking.address.town + ", " +        booking.address.county + ", " + booking.address.postcode

       })
       console.log("I sent");
       return res.status(201).send(booking);
    });
  });
}

function bookingsShow(req, res){
  var id = req.params.id;

  Booking.findById({ _id: id }, function(err, booking) {
    if (err) return res.status(500).send(err);
    if (!booking) return res.status(404).send(err);
    res.status(200).send(booking);
  });
}

function bookingsUpdate(req, res){
  var id = req.params.id;
  // console.log("This is the API CONTROLLER")

  Booking.findByIdAndUpdate({ _id: id}, req.body.booking, {new:true}).populate("user")
    .exec(function(err, booking){
    if (err) return res.status(500).send(err);
    if (!booking) return res.status(404).json(err);
    console.log(booking);
    sendgrid.send({
     to: 'sophiefdick@gmail.com',
     from: booking.user.local.email, 
     subject: "*** UPDATED BOOKING ***",
     text: "Please view in HTML",
     html: "Name: "  + booking.user.local.fullname +
           "<br>Service: " + booking.service + 
           "<br>Date: " + booking.date + " " + booking.time + 
           "<br>Address: " + booking.address.line1 + ", " + booking.address.town + ", " +        booking.address.county + ", " + booking.address.postcode

    });
    
    // console.log(req);
    // console.log(req.flash);

    req.flash('info', 'Flash is back!');
    console.log("FLASH WORKING");
    res.status(200).json({booking: booking, message: "Your booking has been updated!"});
  });
}

function bookingsDelete(req, res){
  var id = req.params.id;

  Booking.findById({ _id: id })
    .populate('user')
    .exec(function(err, booking) {
      
      booking.remove(function(err){
        if (err) return res.status(500).send(err);
        sendgrid.send({
         to: 'sophiefdick@gmail.com',
         from: booking.user.local.email, 
         subject: "*** BOOKING CANCELLATION ***",
         text: "Please view in HTML",
         html: "Name: "  + booking.user.local.fullname +
               "<br>Service: " + booking.service + 
               "<br>Date: " + booking.date + " " + booking.time + 
               "<br>Address: " + booking.address.line1 + ", " + booking.address.town + ", " +        booking.address.county + ", " + booking.address.postcode

      });
        res.status(200).send("ok");
    });
  });
}

function userBookings(req,res){
  var userId = req.params.userId;
  console.log(userId)

  Booking.find({user : userId})
    .populate('user')
    .exec(function(err, userDetails) {
      if (err) return res.status(404).send(err);
      res.status(200).send(userDetails);
  });
}

module.exports = {
  bookingsIndex:  bookingsIndex,
  bookingsCreate: bookingsCreate,
  bookingsShow:   bookingsShow,
  bookingsUpdate: bookingsUpdate,
  bookingsDelete: bookingsDelete,
  bookingsAdminIndex : bookingsAdminIndex,
  userBookings   : userBookings
};
