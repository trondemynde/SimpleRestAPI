const express = require('express');
const app = express();

app.use(express.json());

let todos = [
  { id: 1, task: 'test 1' },
  { id: 2, task: 'test 2' }
];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo = {
    id: todos.length + 1,
    task: req.body.task
  };
  todos.push(todo);
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.json({ message: 'Deleted' });
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`✅ Listening on 0.0.0.0:${port}`);
});