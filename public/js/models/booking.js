angular
  .module('logging')
  .factory('Booking', Booking)

Booking.$inject = ['$resource', 'API']
function Booking($resource, API){

  return $resource(
    API+'/bookings/:id', {id: '@id'}, //maybe needs to be @_id
    { 'get'              : { method: 'GET' },
      'save'             : { method: 'POST' },
      'query'            : { method: 'GET', isArray: true},
      'remove'           : { method: 'DELETE' },
      'delete'           : { method: 'DELETE' },
      'update'           : { method: 'PATCH'},
      'adminBookings'    : { method: 'GET', isArray:true},
      'archivedBookings' : { method: 'GET', isArray:true}
    }
  );
}