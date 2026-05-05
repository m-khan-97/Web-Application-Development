import Database from 'better-sqlite3';

const db = new Database('students.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    course TEXT NOT NULL
    )
    `);

export default db;