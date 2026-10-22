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


app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks ORDER BY id"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const result = await pool.query(
      "SELECT * FROM tasks WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const pool = require("./database");

// POST /tasks
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        error: "Title is required"
      });
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, done)
       VALUES ($1, $2)
       RETURNING *`,
      [title.trim(), false]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create task failed:", error.message);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

// PUT /tasks/:id
app.put("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, done } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
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

    const existing = await pool.query(
      "SELECT * FROM tasks WHERE id = $1",
      [id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    const current = existing.rows[0];

    const updatedTitle =
      title !== undefined ? title.trim() : current.title;

    const updatedDone =
      done !== undefined ? done : current.done;

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1, done = $2
       WHERE id = $3
       RETURNING *`,
      [updatedTitle, updatedDone, id]
    );

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Update task failed:", error.message);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

// DELETE /tasks/:id
app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    return res.status(204).end();
  } catch (error) {
    console.error("Delete task failed:", error.message);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});


module.exports = app;