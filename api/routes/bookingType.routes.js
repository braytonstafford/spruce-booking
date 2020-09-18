const express = require('express');
const router = express.Router();

const bookingTypeOperations = require('../operations/bookingType.operations');

// CREATE a booking
router.post('/', bookingTypeOperations.create);

// READ all bookings
router.get('/', bookingTypeOperations.findAll);

// READ one booking
router.get('/:id', bookingTypeOperations.findById);

// UPDATE a booking
router.put('/:id', bookingTypeOperations.update);

// DELETE a booking
router.delete('/:id', bookingTypeOperations.delete);

module.exports = router;
