'use strict';

const mysql = require('mysql');

// connect to mysql db
const dbConn = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'Znh3OKLnxI',
  password: 'uWAXnU8Bpk',
  database: 'Znh3OKLnxI',
});

dbConn.connect((err) => {
  if (err) throw err;
  console.log('Successfully connected to database');
});

module.exports = dbConn;
