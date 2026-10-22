const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const openapiSpec = require("../docs/openapi.json");
const db = require("./database");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use(express.json());

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

app.post("/tasks", (req, res) => {
    const {title} = req.body;
    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ "error": "Title is required" });
    }

    const tid = tasks.length > 0 ? Math.max(...tasks.map((t => t.id))) + 1 : 1;

    const task = {
        "id": tid,
        "title": title,
        "done": false
    }
    tasks.push(task);
    res.status(201).json(task);
})


app.put("/tasks/:id", (req,res)=>{
    const tId = Number(req.params.id);
    const {title,done} = req.body;
    const task = tasks.find(t => t.id == tId);
    if(!task){
        res.status(404).json({"error":"Tasks Not Found Us!"});
    }else if(typeof title != "string" || !title.trim()){
        res.status(400).json({"error" : "Plz enter a  Valid Title"});
    }

   if (title !== undefined) task.title = title.trim();
    if (done !== undefined) task.done = done;
     res.status(200).json(task);
})

app.delete("/tasks/:id",(req,res)=>{
    const tId = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === tId);
    if(!index){
        res.status(404).json({"error":"Task not found"});
    }
    tasks.splice(index);
    res.status(204).json({"status":"Done"});
})
module.exports = app;