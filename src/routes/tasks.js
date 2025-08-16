const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Create task
router.post('/', auth, async (req, res) => {
  const { title } = req.body;
  if (!title || title.length < 3) return res.status(400).json({ error: 'Title too short' });

  const task = new Task({ ...req.body, owner: req.user._id });
  await task.save();
  res.status(201).json(task);
});

// Get all tasks
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ owner: req.user._id });
  res.json(tasks);
});

// Get single task
router.get('/:id', auth, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// Update task
router.put('/:id', auth, async (req, res) => {
  if (req.body.title && req.body.title.length < 3) return res.status(400).json({ error: 'Title too short' });

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ message: 'Task deleted' });
});

module.exports = router;
