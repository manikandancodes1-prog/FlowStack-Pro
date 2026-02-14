const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['To Do', 'In Progress', 'Done', 'TO DO', 'IN PROGRESS', 'DONE'], 
    default: 'TO DO' 
  },
  
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    default: 'Low' 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);