import { createTask, deleteTask, getTasks, updateTask } from './utils/actions'
import TasksGrid from './components/TaskGrid'
import Tabs from '@/src/components/molecules/popover/Tabs'
import TaskForm from './components/TaskForm'

export default async function TasksPage() {
  const data = await getTasks()

  const tabs = [
    {
      label: 'In Progress',
      slug: 'in-progress',
      component: (
        <TasksGrid data={data} selectedCategory='in-progress' updateTask={updateTask} deleteTask={deleteTask} />
      ),
    },
    {
      label: 'To Do',
      slug: 'to-do',
      component: <TasksGrid data={data} selectedCategory='to-do' updateTask={updateTask} deleteTask={deleteTask} />,
    },
    {
      label: 'Completed',
      slug: 'completed',
      component: <TasksGrid data={data} selectedCategory='completed' updateTask={updateTask} deleteTask={deleteTask} />,
    },
    {
      label: 'BackLog',
      slug: 'backlog',
      component: <TasksGrid data={data} selectedCategory='backlog' updateTask={updateTask} deleteTask={deleteTask} />,
    },
    {
      label: '+ Create Task',
      slug: 'form',
      component: <TaskForm data={data} createTask={createTask} updateTask={updateTask} />,
    },
  ]

  return <Tabs tabs={tabs} />
}
