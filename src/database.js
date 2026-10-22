
const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "tasks.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0
  );
`);

const result = db
  .prepare("SELECT COUNT(*) AS total FROM tasks")
  .get();

if (result.total === 0) {
  const insert = db.prepare(
    "INSERT INTO tasks (title, done) VALUES (?, ?)"
  );

  const seed = db.transaction(() => {
    insert.run("Learn JavaScript", 0);
    insert.run("Build a CRUD API", 0);
    insert.run("Connect SQLite database", 0);
  });

  seed();
}

console.log("SQLite database ready.");
db.close();
