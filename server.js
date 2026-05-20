const express = require('express');
const app = express();

// Force console output to flush immediately
console.log = (...args) => { process.stdout.write(args.join(' ') + '\n'); };
console.error = (...args) => { process.stderr.write(args.join(' ') + '\n'); };

console.log('🚀 Starting Express app...');
console.log('Current directory:', process.cwd());
console.log('Node version:', process.version);

app.use(express.json());

let todos = [
  { id: 1, task: 'test 1' },
  { id: 2, task: 'test 2' }
];

// Basic test endpoint
app.get('/', (req, res) => {
  console.log('✅ Root endpoint hit');
  res.json({ status: 'running', message: 'API is working!' });
});

app.get('/todos', (req, res) => {
  console.log('📋 GET /todos - returning', todos.length, 'items');
  res.json(todos);
});

app.post('/todos', (req, res) => {
  console.log('➕ POST /todos - task:', req.body.task);
  const todo = {
    id: todos.length + 1,
    task: req.body.task
  };
  todos.push(todo);
  res.status(201).json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log('🗑️ DELETE /todos/:id - id:', id);
  todos = todos.filter(t => t.id !== id);
  res.json({ message: 'Deleted' });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Get port from Azure
const port = process.env.PORT || 8080;
const host = '0.0.0.0';

console.log(`🔧 PORT from environment: ${process.env.PORT || 'not set, using 8080'}`);
console.log(`📡 Trying to bind to ${host}:${port}`);

// Create server with explicit error handling
const server = app.listen(port, host, () => {
  console.log(`✅✅✅ SERVER SUCCESSFULLY STARTED ✅✅✅`);
  console.log(`✅ Listening on ${host}:${port}`);
  console.log(`✅ Health check: http://${host}:${port}/health`);
  console.log(`✅ API root: http://${host}:${port}/`);
  console.log(`✅ Todos endpoint: http://${host}:${port}/todos`);
});

// Log any server errors
server.on('error', (error) => {
  console.error('❌ Server error:', error);
  process.exit(1);
});

// Ensure process stays alive
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

console.log('🚀 Script execution complete, waiting for requests...');