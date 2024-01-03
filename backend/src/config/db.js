const pgp = require('pg-promise')();

const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'lights_lims_db',
  user: 'godfredakpan',
  password: 'postgres',
};

const db = pgp(dbConfig);

module.exports = db;


