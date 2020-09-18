'use strict';
const dbConn = require('../config/db.config');

// Create customer object
const Customer = function (customer) {
  this.created_at = new Date();
  this.updated_at = new Date();
  this.first_name = customer.first_name;
  this.last_name = customer.last_name;
  this.address1 = customer.address1;
  this.address2 = customer.address2;
  this.city = customer.city;
  this.state = customer.state;
  this.zip = customer.zip;
  this.email = customer.email;
  this.phone = customer.phone;
};

Customer.create = (newCustomer, result) => {
  dbConn.query('INSERT INTO customer SET ?', newCustomer, (err, res) => {
    if (err) {
      console.error('error: ', err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

// Find all customers
Customer.findAll = (result) => {
  dbConn.query('SELECT * from customer', (err, res) => {
    if (err) {
      console.error('Error finding all customers: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// Find one customer
Customer.findById = (id, result) => {
  dbConn.query(
    'SELECT * from customer where customer_id = ? ',
    id,
    (err, res) => {
      if (err) {
        console.error('Error finding customer: ', err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

// Update customer
Customer.update = (id, customer, result) => {
  dbConn.query(
    'UPDATE customer SET updated_at=?,first_name=?,last_name=?,address1=?,address2=?,city=?,state=?,zip=?,email=?,phone=? WHERE customer_id = ?',
    [
      customer.updated_at,
      customer.first_name,
      customer.last_name,
      customer.address1,
      customer.address2,
      customer.city,
      customer.state,
      customer.zip,
      customer.email,
      customer.phone,
      id,
    ],
    (err, res) => {
      if (err) {
        console.error('Error updating customer: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// Delete customer
Customer.delete = (id, result) => {
  dbConn.query(
    'DELETE FROM customer WHERE customer_id = ?',
    [id],
    (err, res) => {
      if (err) {
        console.error('Error deleting customer: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Customer;
