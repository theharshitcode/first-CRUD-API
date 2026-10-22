const express = require("express");
const app = express();
app.use(express.json());

let tasks = [
  { id: 1, title: "Learn JavaScript", done: true },
  { id: 2, title: "Build CRUD API", done: false },
  { id: 3, title: "Learn Express", done: false }
];


app.get("/", (req,res)=>{
    res.json({"name":"Task API","version":"1.0","endpoints":["/tasks"]});
})

app.get("/health", (req,res)=>{
    res.json({"status":"ok"});
})

app.get("/tasks", (req,res)=>{
    res.json({tasks: tasks});
})

app.get("/tasks/:id", (req,res)=>{
    const taskid = req.params.id;
    const task = tasks.find(t => t.id == taskid);

    if(!task){
        res.json({"status":"404 Not Found"});
    }
    
    res.json(task);
})

module.exports = app;