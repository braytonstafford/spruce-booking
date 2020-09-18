const express = require('express');
const router = express.Router();

const bookingOperations = require('../operations/booking.operations');

// CREATE a booking
router.post('/', bookingOperations.create);

// READ all bookings
router.get('/', bookingOperations.findAll);

// READ one booking
router.get('/:id', bookingOperations.findById);

// UPDATE a booking
router.put('/:id', bookingOperations.update);

// DELETE a booking
router.delete('/:id', bookingOperations.delete);

module.exports = router;
