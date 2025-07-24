// backend/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // change if using another user
  password: '',           // add your DB password here
  database: 'obluedb'     // your database name
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB Connection Error:', err);
  } else {
    console.log('✅ Connected to MariaDB/MySQL database');
  }
});

module.exports = db;
