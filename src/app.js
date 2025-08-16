require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB error:', err));

app.listen(process.env.PORT, () => {
  console.log('Server started on port', process.env.PORT);
});

// ...existing code...

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const healthRoutes = require('./routes/health');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/health', healthRoutes);
