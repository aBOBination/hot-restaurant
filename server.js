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

// Basic route that sends the user first to the AJAX Page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/reserve', function (req, res) {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.get('/reservation-view', function (req, res) {
  res.sendFile(path.join(__dirname, 'view.html'));
});

// Displays all characters
app.get('/api/tables', function (req, res) {
  return res.json(reservations);
});

// Displays all heros
app.get('/api/waitlist', function (req, res) {
  return res.json(waitlist);
});

// Create New Reservation- takes in JSON input
app.post('/reserve', function (req, res) {
  var newReservation = req.body;

  // newReservation.routeName = newReservation.name
  // .replace(/\s+/g, '')
  // .toLowerCase();

  console.log(newReservation);

  reservations.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});
