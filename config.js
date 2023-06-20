const { Pool } = require("pg");

const databaseConfig = {
  host: "127.0.0.1",
  port: "5432",
  database: "her-art-space",
};

const pool = new Pool(databaseConfig);

module.exports = pool;
