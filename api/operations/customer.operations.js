'use strict';

const Customer = require('../model/customer.model');

exports.create = function (req, res) {
  const new_customer = new Customer(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required field' });
  } else {
    Customer.create(new_customer, function (err, customer) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: 'Successfully added customer!',
        data: customer,
      });
    });
  }
};

exports.findAll = function (req, res) {
  Customer.findAll(function (err, customer) {
    if (err) res.send(err);
    res.send(customer);
  });
};

exports.findById = function (req, res) {
  Customer.findById(req.params.id, function (err, customer) {
    if (err) res.send(err);
    res.json(customer);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required field' });
  } else {
    Customer.update(req.params.id, new Customer(req.body), function (
      err,
      customer
    ) {
      if (err) res.send(err);
      res.json({ error: false, message: 'Successfully updated customer' });
    });
  }
};

exports.delete = function (req, res) {
  Customer.delete(req.params.id, function (err, customer) {
    if (err) res.send(err);
    res.json({ error: false, message: 'Successfully deleted customer' });
  });
};
