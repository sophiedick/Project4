







// // function initMap() {
// //     var startpoint_place_id = null;
// //     var endpoint_place_id = null;
// //     // var travel_mode = google.maps.TravelMode.DRIVING;
// //     var map = new google.maps.Map(document.getElementById('map'), {
// //       mapTypeControl: false,
// //       center: { lat: 51.5072, lng: -0.1275 },
// //       zoom: 13
// //     });
  
// //     var directionsService = new google.maps.DirectionsService;
// //     var directionsDisplay = new google.maps.DirectionsRenderer;
    
// //     directionsDisplay.setMap(map)
// //   }


// function initMap() {
//     var startpoint_place_id = null;
//     var endpoint_place_id = null;
//     // var travel_mode = google.maps.TravelMode.DRIVING;
//     var map = new google.maps.Map(document.getElementById('map'), {
//       mapTypeControl: false,
//       center: { lat: 51.5072, lng: -0.1275 },
//       zoom: 13
//     });
//     var directionsService = new google.maps.DirectionsService;
//     var directionsDisplay = new google.maps.DirectionsRenderer;
    
//     directionsDisplay.setMap(map)
//     // var startpoint_input = document.getElementById('startpoint-input');
//     // var endpoint_input = document.getElementById('endpoint-input');
//     // var modes = document.getElementById('mode-selector');
//     // map.controls[google.maps.ControlPosition.TOP_LEFT].push(startpoint_input);
//     // map.controls[google.maps.ControlPosition.TOP_LEFT].push(endpoint_input);
//     // map.controls[google.maps.ControlPosition.TOP_LEFT].push(modes);
//     // var startpoint_autocomplete = new google.maps.places.Autocomplete(startpoint_input);
//     // startpoint_autocomplete.bindTo('bounds', map);
    
//     // var endpoint_autocomplete = new google.maps.places.Autocomplete(endpoint_input);
//     // endpoint_autocomplete.bindTo('bounds', map);
//     // Sets up a listener on a radio button to change the filter type on Places Autocomplete.
//     // function setupClickListener(id, mode) {
//     //   var radioButton = document.getElementById(id);
//     //   radioButton.addEventListener('click', function() {
//     //     travel_mode = mode;
//     //   });
//     // }
//     // setupClickListener('changemode-walking', google.maps.TravelMode.WALKING);
//     // setupClickListener('changemode-transit', google.maps.TravelMode.TRANSIT);
//     // setupClickListener('changemode-driving', google.maps.TravelMode.DRIVING);
//     function expandViewportToFitPlace(map, place) {
//       if (place.geometry.viewport) {
//         map.fitBounds(place.geometry.viewport);
//       } else {
//         map.setCenter(place.geometry.location);
//         map.setZoom(17);
//       }
//     }

//     function getGoogleObject(){

//       var geocoder = new google.maps.Geocoder();

//       self.geocoder.geocode({ address: "London, N15 3SH, UK"}, function(results, status) {
//             console.log(results, status);
//       });
//     }

//     function getPlaces() {
//       var place = googleobject
//       if (!place.geometry) {
//         window.alert("Autocomplete's returned place contains no geometry");
//         return;
//       }
//       expandViewportToFitPlace(map, place);
//       // If the place has a geometry, store its place ID and route if we have
//       // the other place ID
//       startpoint_place_id = place.place_id;
//       route(startpoint_place_id, endpoint_place_id, travel_mode, directionsService, directionsDisplay);
//     });

//     endpoint_autocomplete.addListener('place_changed', function() {
//       var place = endpoint_autocomplete.getPlace();
//       if (!place.geometry) {
//         window.alert("Autocomplete's returned place contains no geometry");
//         return;
//       }
//       expandViewportToFitPlace(map, place);
//       // If the place has a geometry, store its place ID and route if we have
//       // the other place ID
//       endpoint_place_id = place.place_id;
//       route(startpoint_place_id, endpoint_place_id, directionsService, directionsDisplay);
//     });


//     function route(startpoint_place_id, endpoint_place_id, directionsService, directionsDisplay) {
//       if (!startpoint_place_id || !endpoint_place_id) {
//         return;
//       }
//       console.log("start: " + startpoint_place_id);
//       console.log("end: " + endpoint_place_id);
//       directionsService.route({
//         origin: {'placeId': startpoint_place_id},
//         destination: {'placeId': endpoint_place_id},
//         travelMode: travel_mode
//       }, function(response, status) {
//         console.log(response);
//         if (status === google.maps.DirectionsStatus.OK) {
//           directionsDisplay.setDirections(response);
//         } else {
//           window.alert('Directions request failed due to ' + status);
//         }
//       });
//     }
//   }
//   initMap();