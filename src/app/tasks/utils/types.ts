export type TaskType = {
  _id: string
  title: string
  description: string
  comments: string
  status: 'in-progress' | 'to-do' | 'completed' | 'backlog'
  createdAt: Date
  startedAt: Date
  completedAt: Date
}
