const { Pool } = require("pg");

const databaseConfig = {
  host: "127.0.0.1",
  port: "5432",
  database: "her-art-space",
  user: "postgres",
  password: "",
};

const pool = new Pool(databaseConfig);

module.exports = pool;
