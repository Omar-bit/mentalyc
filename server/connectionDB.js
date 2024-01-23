const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database(
  './database.db',
  sqlite.OPEN_READWRITE,

  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  }
);
module.exports.db = db;
