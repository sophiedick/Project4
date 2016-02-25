var express = require('express'),
    router  = express.Router();

var usersController = require('../controllers/usersController');
var bookingsController = require('../controllers/bookingsController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex)
 
router.route('/users')
  .get(usersController.usersIndex)
//   .post(usersController.usersCreate)

router.route('/users/:id') 
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete)

router.route('/bookings')
  .get(bookingsController.bookingsAdminIndex)
  .post(bookingsController.bookingsCreate)

router.route('/bookings/user/:userId') 
    .get(bookingsController.userBookings)

router.route('/bookings/:id') 
  .get(bookingsController.bookingsShow)
  .patch(bookingsController.bookingsUpdate)
  .delete(bookingsController.bookingsDelete)

// router.route
//   .post("/bookings/checkout", function (req, res) {
//     var nonce = req.body.payment_method_nonce;
//     // Use payment method nonce here
//   });

module.exports = router;