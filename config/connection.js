const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
  {
    host: 'localhost',
    user:  process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres'
  });

module.exports = pool;
