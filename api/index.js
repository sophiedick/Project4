var express        = require('express');
var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require("cookie-parser");
var methodOverride = require("method-override");
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var session        = require('express-session');
var app            = express();

var config         = require('./config/config');
var User           = require('./models/user');
var secret         = require('./config/config').secret;
var nodemailer     = require('nodemailer');
var sendgrid       = require('sendgrid')('process.env.SENDGRID_USERNAME', '                      process.env.SENDGRID_PASSWORD');
var flash          = require('connect-flash');
 
// create reusable transporter object using the default SMTP transport 
var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "nx9vshcs8vpx95xm",
  publicKey: "446rts5r27tphcr3",
  privateKey: "2fe365ec06cdba5e0b5933c5ccb4989a"
});

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/thesortclub';
mongoose.connect(mongoUri);

require('./config/passport')(passport);

app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});

app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(function(req, res, next) {
    res.locals.messages = req.flash();
    next();
});


app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

// app.use('/api', expressJWT({ secret: secret })
//   .unless({
//     path: [
//       { url: '/api/login', methods: ['POST'] },
//       { url: '/api/register', methods: ['POST'] }
//     ]
//   }));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

app.use(function(req, res, next) {

   global.currentUser = req.user;


  next();

});

var routes = require('./config/routes');
app.use("/api", routes);

app.listen(3000);



