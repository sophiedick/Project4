angular
  .module('logging')
  .controller('BookingsController', BookingsController);

BookingsController.$inject = ["$scope", "$http", "Booking", "User", "$state", "CurrentUser", "$timeout", "uiGmapGoogleMapApi", "FlashMessage"];

function BookingsController($scope, $http, Booking, User, $state, CurrentUser, $timeout, uiGmapGoogleMapApi, FlashMessage){
  var self   = this;
  console.log("***BOOKING CONTROLLER WORKING***");

  // Current user info:
  // console.log(CurrentUser.getUser());
  // self.user   = CurrentUser.getUser();
  // console.log(self.user);
  // self.userId = self.user._doc._id;

  self.getUserId = function(){
    // console.log(CurrentUser.getUser()._doc._id)
    // self.user   = CurrentUser.getUser();
    // self.userId = self.user._doc._id;
    // console.log(self.userId);
    // self.getUserBookings();
    // return CurrentUser.getUser()._doc._id;
  }

  self.all      = [];
  self.users    = [];
  self.booking  = {};
  self.userBookings = [];
  self.approvedBookings = {};
  self.archivedBookings = {};
  self.flashMessage = FlashMessage.flash();
  console.log(self.flashMessage);
  self.submitMessage  = "Please review the below booking, "
  self.sentMessage    = "Many thanks for your booking. We will be in touch shortly."
  self.deleteMessage    = "Your booking has been deleted!"
  self.updateMessage = "";
  //self.message       = "";

  var styleArray = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":40}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-10},{"lightness":30}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60},{"lightness":60}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-100},{"lightness":60}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-100},{"lightness":60}]}];
  
  self.map           = {
                        styles: styleArray,
                        center: { latitude: 51.516542,longitude: -0.204704 }, 
                        zoom: 14
                      };



  var marker         = {latitude:   51.516542, 
                        longitude:  -0.204704, 
                        id: 1
                      };

  self.randomMarkers= [];
  self.randomMarkers.push(marker);

  var postcode;

  self.geoCode = function(postcode){
    event.preventDefault();
    var marker2;
    if (marker2) {
    self.randomMarkers.splice(-1, 1)
    }
    postcode = postcode;

    uiGmapGoogleMapApi.then(function(map) {

      console.log(postcode);

      self.geocoder = new google.maps.Geocoder();
      console.log(self.geocoder);
      self.geocoder.geocode({ address: postcode}, function(results,status) {
        console.log(results);

        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();

        marker2 = {
                latitude: lat, 
                longitude: lng, 
                id: 2
                };
        self.randomMarkers.push(marker2);
        console.log(self.randomMarkers);
        $scope.$apply();
      });
    });
  }


  //Currently showing all bookings needs to only show for current user!
  self.getBookings = function(){
    self.getUserId()
    Booking.query(function(data){
      self.all = data;
      console.log(data)
    });
  };

  self.getUserBookings = function(){
    $(".updateMessage").show();
    $timeout(self.hideMessage(), 3000); 

    $http
      .get('http://localhost:3000/api/bookings/user/' + self.userId)
      .then(function(response){
        console.log(response);
        self.userBookings = response.data;
    });
  };

  self.hideMessage = function(){
    $(".updateMessage").hide();
  }

  // USE THIS FUNCTION FOR ADMIN PAGE GET BOOKINGS!!!
  self.getBookingsAdmin = function(){
    Booking.query(function(data){
      self.all = data;
    });
  };

  // RETURN ALL USERS - WORKING
  self.getUsers = function(){
    User.query(function(data){
       self.users = data;
    });
  };

  // ADD A BOOKING - WORKING
  self.add = function(){
    console.log("adding")
    self.getUserBookings();
    var booking  = self.booking;
    user         = CurrentUser.getUser();
    booking.user = user._doc._id;
    console.log(booking);
    Booking.save(booking, function(data){
      self.all.push(data);
      self.booking = {};
      $state.go('bookings');
    });
  };

  // APPROVE BOOKING - WORKING!
  self.approveBooking = function(booking) {
    console.log("************");
    self.booking = booking;
    console.log(self.booking);
    Booking
      .update({id: booking._id}, {booking: self.booking}, function(data){
        console.log(data);
        self.booking = {};
        self.getBookingsAdmin();
    });
  }

  //Archive a booking
  self.archiveBooking = function(booking) {
    console.log("Archiving");
    self.booking = booking;
    self.booking.archive = true;
    console.log(self.booking);
    Booking
      .update({id: booking._id}, {booking: self.booking}, function(data){
        console.log(data);
        self.booking = {};
        self.getBookingsAdmin();
    });
  }

  //APPROVED ADMIN BOOKINGS 
  self.approvedAdminBookings = function(){
    console.log("HELOOOOO");
    $('.bookingTable').show("fast");
    Booking.query({available:true}, function(data){
      console.log("******");
      console.log(data);
      self.approvedBookings = data;
    });
  }

  //ARCHIVED BOOKINGS FUNCTION!!
  self.archivedBookings = function(booking) {
    console.log("This is the archive function");
    $('.archiveTable').show("fast");
      Booking.query({archive:true}, function(data){
          console.log(data);
          self.archivedBookings = data;
        });
      }


  //Function to call Delete function and email pop-up!
  self.deletePrompt = function(booking){
    self.deleteBooking(booking);
    //self.cancellationEmail(booking);
  }

  // Delete a booking - WORKING! 
  self.deleteBooking = function(booking) {
    console.log(booking._id);
    Booking 
      .delete({id: booking._id} , function(data) {
      self.getUserBookings();
      //$('.deleteMessage').show("slow");
    });
  };

  // Renders the confirmation messages! - WORKING
  self.message = function() {
    $('.submitMessage').hide("fast");
    $('.sentMessage').show("fast");

  }
  //Get the booking to update - WORKING!
  self.getEditBooking = function(booking){ 
    console.log(booking)
    self.booking = booking;
    self.booking.date = new Date(self.booking.date);

  }

  //Update a booking - WORKING!
  self.updateBooking = function(booking){
    Booking
      .update({id: booking._id}, {booking: self.booking}, function(data){
        console.log(data);
        self.booking = {};
        console.log("updated yayyyyyy!");
        self.flashMessage.message = data.message;
        $state.go('bookings');
        // self.getBookings();
      });     
    };

  self.decluttershow = function(){
    event.preventDefault();
    $("#movinghome").hide('fast');
    $("#wardrobes").hide('fast');
    $("#paperwork").hide('fast');
    $("#declutter").show('fast');
  }

  self.paperworkshow = function(){
    event.preventDefault();
    $("#declutter").hide('fast');
    $("#wardrobes").hide('fast');
    $("#movinghome").hide('fast');
    $("#paperwork").show('fast');
  }

  self.wardrobesshow = function(){
    event.preventDefault();
    $("#declutter").hide('fast');
    $("#paperwork").hide('fast');
    $("#movinghome").hide('fast');
    $("#wardrobes").show('fast');
  }

  self.movinghomeshow = function(){
    event.preventDefault();
    $("#declutter").hide('fast');
    $("#paperwork").hide('fast');
    $("#wardrobes").hide('fast');
    $("#movinghome").show('fast');
  }

  self.getBookings();
  self.getUsers();
  self.getUserBookings();
}
