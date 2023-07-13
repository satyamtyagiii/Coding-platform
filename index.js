const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const isAdmin = require('./isAdminMiddleware');
const testCasesRouter = require('./routes/testCases');
const solutionRouter = require('./routes/solution');
const sendEmailNotification = require('./path/to/email.js');

const app = express();
app.use(express.json());

// Connect to the database
mongoose
  .connect('mongodb://localhost/coding-platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });

app.post('/signup', async (req, res) => {
  // Signup logic
});

app.get('/admin-only', isAdmin, (req, res) => {
  // Admin-only route logic
});

app.post('/login', async (req, res) => {
  // Login logic
});

// Use the testCases router
app.use('/api', testCasesRouter);

// Use the solution router
app.use('/api', solutionRouter);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
