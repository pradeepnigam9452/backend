const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

// get all todos
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// add todo
app.post("/api/todos", async (req, res) => {
  const { title } = req.body;

  const todo = await Todo.create({ title });

  res.json(todo);
});

// delete todo
app.delete("/api/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);

  res.json({
    message: "Todo deleted",
  });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});