const sqlite = require("sqlite3");
const path = require("path");

const dbName = path.join(__dirname, "database", "tasks.sqlite");
const db = new sqlite.Database(dbName, (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  } else {
    console.log("Connected to SQLite database.");
    db.run(
      `
      CREATE TABLE tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title text,
        isDone INTEGER
      );

      INSERT INTO tasks(title)
      VALUES('Riad');

     

    `
      ,
      (err) => {
        if (err) {
          console.log("Table already created.");
        }
      }
    );
  }
});

module.exports = db;
