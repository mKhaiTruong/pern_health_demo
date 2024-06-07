require("dotenv").config();
// const { Pool } = require("pg");

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

// pool.connect((e) => {
//   if (e) throw e;
//   console.log("Connect to Postgres successfully");
// });

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

module.exports = pool;