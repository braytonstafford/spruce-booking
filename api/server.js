const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000;

// apply cors middleware
app.use(cors());

// parse requests urlencoded content type
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests json content type
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('OK');
});

// booking type routes
const bookingTypeRoutes = require('./routes/bookingType.routes.js');
app.use('/api/bookingType', bookingTypeRoutes);

// booking routes
const bookingRoutes = require('./routes/booking.routes.js');
app.use('/api/booking', bookingRoutes);

// customer routes
const customerRoutes = require('./routes/customer.routes.js');
app.use('/api/customer', customerRoutes);

// start it up
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
