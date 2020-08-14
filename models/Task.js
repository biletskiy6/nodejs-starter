const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});


module.exports = model('task', TaskSchema);