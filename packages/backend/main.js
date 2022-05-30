const express = require("express");
const app = express();
const port = 3001;
const db = require("./database");
app.use(express.json());


app.get("/tasks", (req, res) => {
  const sql = "select * from tasks";
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/tasks", (req, res) => {
  const data = {
    title: req.body.title,
    isDone: "0",
  };
  const sql = "INSERT INTO tasks (title, isDone) VALUES (?,?)";
  const params = [data.title, data.isDone];
  db.run(sql, params, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "success" });
  });
});

app.delete("/task/:id", (req, res) => {
  const sql = "DELETE FROM tasks WHERE id = ?";
  const params = [req.params.id];
  db.run(sql, params, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "deleted" });
  });
});

app.patch("/task/:id/title", (req, res) => {
  const sql = "UPDATE tasks SET title = ? WHERE id = ?";
  const params = [req.body.title, req.params.id];
  db.run(sql, params, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "updated" });
  });
});

app.patch("/task/:id/isdone", (req, res) => {
  const sql = "UPDATE tasks SET isDone = ? WHERE id = ?";
  const params = [req.body.isDone, req.params.id];
  db.run(sql, params, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "updated" });
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port} ${db}`);
});
