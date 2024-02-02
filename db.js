const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY, username TEXT, password TEXT, checking INTEGER, savings INTEGER)'
  ),
  (err) => {
    if (err){
      console.error('Error creating accounts table');
    } else {
      console.log('Successfully created accounts table');
    }
  }
})