import mongoose, { Schema } from 'mongoose'

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    comments: {
      type: String,
    },
    status: {
      type: String,
      enum: ['in-progress', 'to-do', 'completed', 'backlog'],
      default: 'in-progress',
      required: true,
    },
    created: String,
    startedAt: String,
    completedAt: String,
  },
  { timestamps: true }
)

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema)

export default Task
