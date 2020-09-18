'use strict';
const dbConn = require('../config/db.config');

// Create booking object
const Booking = function (booking) {
  this.created_at = new Date();
  this.updated_at = new Date();
  this.customer_id = booking.customer_id;
  this.booking_date = booking.booking_date;
  this.booking_time = booking.booking_time;
  this.booking_type_id = booking.booking_type_id;
};

Booking.create = (newBooking, result) => {
  dbConn.query('INSERT INTO booking SET ?', newBooking, (err, res) => {
    if (err) {
      console.error('error: ', err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

// Find all bookings
Booking.findAll = (result) => {
  dbConn.query(
    'SELECT b.booking_id, c.first_name, c.last_name, c.address1, c.address2, c.city, c.state, c.zip, c.email, c.phone, b.booking_date, b.booking_time, bt.label as booking_type from booking b LEFT JOIN customer c ON (b.customer_id = c.customer_id) LEFT JOIN booking_type bt ON (bt.booking_type_id = b.booking_type_id)',
    (err, res) => {
      if (err) {
        console.error('Error finding all bookings: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// Find one booking
Booking.findById = (id, result) => {
  dbConn.query(
    'SELECT c.customer_id, c.first_name, c.last_name, c.address1, c.address2, c.city, c.state, c.zip, c.email, c.phone, b.booking_date, b.booking_time, bt.label as booking_type from booking b LEFT JOIN customer c ON (b.customer_id = c.customer_id) LEFT JOIN booking_type bt ON (bt.booking_type_id = b.booking_type_id) where b.booking_id = ? ',
    id,
    (err, res) => {
      if (err) {
        console.error('Error finding booking: ', err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

// Update booking
Booking.update = (id, booking, result) => {
  dbConn.query(
    'UPDATE booking SET updated_at=?,customer_id=?,booking_date, booking_time=?,booking_type_id=? WHERE booking_id = ?',
    [
      booking.updated_at,
      booking.customer_id,
      booking.booking_date,
      booking.booking_time,
      booking.booking_type_id,
      id,
    ],
    (err, res) => {
      if (err) {
        console.error('Error updating booking: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// Delete booking
Booking.delete = (id, result) => {
  dbConn.query('DELETE FROM booking WHERE booking_id = ?', [id], (err, res) => {
    if (err) {
      console.error('Error deleting booking: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Booking;
