const sqlite = require("sqlite3");
const path = require("path");

const dbName = path.join(__dirname, "database", "tasks.sqlite");
const dbTask = new sqlite.Database(dbName, (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  } else {
    console.log("Connected to SQLite database.");
    dbTask.run(
      `
      CREATE TABLE tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title text,
        isDone INTEGER,
        prio INTEGER
      );

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

const dbBin = new sqlite.Database(dbName, (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  } else {
    console.log("Connected to SQLite database.");
    dbBin.run(
      `
      CREATE TABLE tasksBin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title text,
        isDone INTEGER,
        prio INTEGER
      );

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

module.exports = dbTask;
module.exports = dbBin;
