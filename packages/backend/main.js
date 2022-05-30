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

app.delete("/tasks", (req, res) => {
  data.destroy({
    where: {
      'id$': 2
    },
  });
  res.render("deleted");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port} ${db}`);
});
