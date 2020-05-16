// Dependencies
// =============================================================
var express = require('express');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Res / Waitlist (DATA)
// =============================================================
var reservations = [
  {
    customerName: 'yoda',
    phoneNumber: '555-555-5555',
    customerEmail: 'littlegreenman@force.com',
    customerID: 'yoda1',
  },
  {
    customerName: 'obiwankenobi',
    phoneNumber: '123-456-7890',
    customerEmail: 'hellothere@highground.com',
    customerID: 'obiwan1',
  },
];

var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user to the Home Page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'home.html'));
});
// Basic route that sends the user to the revervation form
app.get('/reserve', function (req, res) {
  res.sendFile(path.join(__dirname, 'form.html'));
});
// Basic route that sends the user to the current reservations
app.get('/reservation-view', function (req, res) {
  res.sendFile(path.join(__dirname, 'view.html'));
});

// Displays all reservations data in JSON
app.get('/api/tables', function (req, res) {
  return res.json(reservations);
});

// Displays all wailist data in JSON
app.get('/api/waitlist', function (req, res) {
  return res.json(waitlist);
});

// Create New Reservation- takes in JSON input
app.post('/reserve', function (req, res) {
  var newReservation = req.body;
  if (reservations.length < 5) {
    reservations.push(newReservation);

    res.json(newReservation);
    console.log('added to reservations');
  } else {
    waitlist.push(newReservation);

    res.json(newReservation);
    console.log('added to waitlist');
  }

  console.log(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});
