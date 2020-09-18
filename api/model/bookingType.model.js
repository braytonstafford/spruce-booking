'use strict';
const dbConn = require('../config/db.config');

// Create booking type object
const BookingType = (bookingType) => {
  this.created_at = new Date();
  this.updated_at = new Date();
  this.label = bookingType.label;
  this.value = bookingType.value;
};

BookingType.create = (newBookingType, result) => {
  dbConn.query('INSERT INTO booking_type SET ?', newBookingType, (err, res) => {
    if (err) {
      console.error('error: ', err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

// Find all bookings
BookingType.findAll = (result) => {
  dbConn.query(
    'SELECT booking_type_id, value, label FROM booking_type',
    (err, res) => {
      if (err) {
        console.error('Error finding all booking types: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// Find one booking type
BookingType.findById = (id, result) => {
  dbConn.query(
    'SELECT booking_type_id, value, label FROM booking WHERE booking_type_id = ? ',
    id,
    (err, res) => {
      if (err) {
        console.error('Error finding booking type: ', err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

// Update booking type
BookingType.update = (id, bookingType, result) => {
  dbConn.query(
    'UPDATE booking_type SET updated_at=?, label=?, value=? WHERE booking_type_id = ?',
    [bookingType.updated_at, bookingType.label, bookingType.value, id],
    (err, res) => {
      if (err) {
        console.error('Error updating booking type: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// Delete booking type
BookingType.delete = (id, result) => {
  dbConn.query(
    'DELETE FROM booking_type WHERE booking_id = ?',
    [id],
    (err, res) => {
      if (err) {
        console.error('Error deleting booking type: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = BookingType;
