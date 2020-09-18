'use strict';

const BookingType = require('../model/bookingType.model');

exports.create = function (req, res) {
  const new_booking_type = new BookingType(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required field' });
  } else {
    BookingType.create(new_booking_type, function (err, bookingType) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: 'Successfully added bookingType!',
        data: bookingType,
      });
    });
  }
};

exports.findAll = function (req, res) {
  BookingType.findAll(function (err, bookingType) {
    if (err) res.send(err);
    res.send(bookingType);
  });
};

exports.findById = function (req, res) {
  BookingType.findById(req.params.id, function (err, bookingType) {
    if (err) res.send(err);
    res.json(bookingType);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required field' });
  } else {
    BookingType.update(req.params.id, new BookingType(req.body), function (
      err,
      bookingType
    ) {
      if (err) res.send(err);
      res.json({ error: false, message: 'Successfully updated booking type' });
    });
  }
};

exports.delete = function (req, res) {
  BookingType.delete(req.params.id, function (err, bookingType) {
    if (err) res.send(err);
    res.json({ error: false, message: 'Successfully deleted booking type' });
  });
};
