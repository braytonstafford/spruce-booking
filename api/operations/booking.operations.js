'use strict';

const Booking = require('../model/booking.model');

exports.create = function (req, res) {
  const new_booking = new Booking(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required field' });
  } else {
    Booking.create(new_booking, function (err, booking) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: 'Successfully added booking!',
        data: booking,
      });
    });
  }
};

exports.findAll = function (req, res) {
  Booking.findAll(function (err, booking) {
    if (err) res.send(err);
    res.send(booking);
  });
};

exports.findById = function (req, res) {
  Booking.findById(req.params.id, function (err, booking) {
    if (err) res.send(err);
    res.json(booking);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required field' });
  } else {
    Booking.update(req.params.id, new Booking(req.body), function (
      err,
      booking
    ) {
      if (err) res.send(err);
      res.json({ error: false, message: 'Successfully updated booking' });
    });
  }
};

exports.delete = function (req, res) {
  Booking.delete(req.params.id, function (err, booking) {
    if (err) res.send(err);
    res.json({ error: false, message: 'Successfully deleted booking' });
  });
};
