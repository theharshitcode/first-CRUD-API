const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const openapiSpec = require("../docs/openapi.json");
const db = require("./database");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use(express.json());

function formatTask(task) {
  if (!task) return task;

  return {
    id: task.id,
    title: task.title,
    done: Boolean(task.done)
  };
}

let tasks = [
    { id: 1, title: "Learn JavaScript", done: true },
    { id: 2, title: "Build CRUD API", done: false },
    { id: 3, title: "Learn Express", done: false }
];


app.get("/", (req, res) => {
    res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
})

app.get("/tasks", (req, res) => {
  const tasks = db.prepare(
    "SELECT * FROM tasks ORDER BY id"
  ).all();

  res.status(200).json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  const task = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ).get(id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  res.status(200).json(task);
});


// Convert SQLite's 0/1 into JavaScript's false/true

// POST /tasks
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      error: "Title is required"
    });
  }

  const result = db.prepare(
    "INSERT INTO tasks (title, done) VALUES (?, ?)"
  ).run(title.trim(), 0);

  const task = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ).get(result.lastInsertRowid);

  return res.status(201).json(formatTask(task));
});

// PUT /tasks/:id
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, done } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  const existing = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ).get(id);

  if (!existing) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  if (
    title !== undefined &&
    (typeof title !== "string" || !title.trim())
  ) {
    return res.status(400).json({
      error: "Please enter a valid title"
    });
  }

  if (done !== undefined && typeof done !== "boolean") {
    return res.status(400).json({
      error: "Done must be a boolean"
    });
  }

  if (title === undefined && done === undefined) {
    return res.status(400).json({
      error: "Provide title or done to update"
    });
  }

  const updatedTitle =
    title !== undefined ? title.trim() : existing.title;

  const updatedDone =
    done !== undefined ? Number(done) : existing.done;

  db.prepare(`
    UPDATE tasks
    SET title = ?, done = ?
    WHERE id = ?
  `).run(updatedTitle, updatedDone, id);

  const updatedTask = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ).get(id);

  return res.status(200).json(formatTask(updatedTask));
});

// DELETE /tasks/:id
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  const result = db.prepare(
    "DELETE FROM tasks WHERE id = ?"
  ).run(id);

  if (result.changes === 0) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  return res.status(204).end();
});

module.exports = app;