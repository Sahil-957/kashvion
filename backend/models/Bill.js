const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ['Utilities', 'Subscriptions', 'Finance', 'Lifestyle'],
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'overdue', 'paid'],
    default: 'upcoming',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bill', billSchema);
