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

app.get('/reservation-form', function (req, res) {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.get('/reservation-view', function (req, res) {
  res.sendFile(path.join(__dirname, 'view.html'));
});

// Displays all characters
app.get('/api/tables', function (req, res) {
  return res.json(heros.concat(tables));
});

// Displays all heros
app.get('/api/waitlist', function (req, res) {
  return res.json(tables);
});

// // Displays all villians
// app.get('/api/characters/villians', function (req, res) {
//   return res.json(villians);
// });

// // Displays a single character, or returns false
// app.get('/api/characters/heros/:character', function (req, res) {
//   var chosen = req.params.character;

//   console.log(chosen);

//   for (var i = 0; i < heros.length; i++) {
//     if (chosen === heros[i].routeName) {
//       return res.json(heros[i]);
//     }
//   }

//   return res.json(false);
// });

app.get('/api/characters/villians/:character', function (req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < villians.length; i++) {
    if (chosen === villians[i].routeName) {
      return res.json(villians[i]);
    }
  }

  return res.json(false);
});

// Create New Tables- takes in JSON input
app.post('/api/tables', function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name
    .replace(/\s+/g, '')
    .toLowerCase();

  console.log(newReservation);

  heros.push(newReservation);

  res.json(newReservation);
});

app.post('/api/characters/villians', function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newCharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, '').toLowerCase();

  console.log(newCharacter);

  villians.push(newCharacter);

  res.json(newCharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});
