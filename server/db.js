require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool.connect((e) => {
  if (e) throw e;
  console.log("Connect to Postgres successfully");
});

module.exports = pool;

// const { Pool } = require('pg');

// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "perntodo",
//     password: "123456",
//     port: 5432
// });

// module.exports = pool;
