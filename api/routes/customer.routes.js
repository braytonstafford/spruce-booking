const express = require('express');
const router = express.Router();

const customerOperations = require('../operations/customer.operations');

// CREATE a customer
router.post('/', customerOperations.create);

// READ all customers
router.get('/', customerOperations.findAll);

// READ one customer
router.get('/:id', customerOperations.findById);

// UPDATE a customer
router.put('/:id', customerOperations.update);

// DELETE a customer
router.delete('/:id', customerOperations.delete);

module.exports = router;
