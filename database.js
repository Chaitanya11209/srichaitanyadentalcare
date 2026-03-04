const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname,"clinic.db"));

db.serialize(()=>{

db.run(`
CREATE TABLE IF NOT EXISTS patients(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
phone TEXT UNIQUE,
age INTEGER
)`);

db.run(`
CREATE TABLE IF NOT EXISTS appointments(
id INTEGER PRIMARY KEY AUTOINCREMENT,
patient_id INTEGER,
datetime TEXT,
treatment TEXT,
amount INTEGER
)`);

db.run(`
CREATE TABLE IF NOT EXISTS dental(
id INTEGER PRIMARY KEY AUTOINCREMENT,
patient_id INTEGER,
tooth INTEGER,
treatment TEXT,
date TEXT
)`);

});

module.exports=db;