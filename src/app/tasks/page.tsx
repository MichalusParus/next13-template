import { createTask, deleteTask, getTasks, updateTask } from './_utils/actions'
import { Metadata } from 'next'
import TasksGrid from './_components/TaskGrid'
import Tabs from '@/src/components/molecules/popover/Tabs'
import TaskForm from './_components/TaskForm'

export const metadata: Metadata = {
  title: 'Tasks || Next 13 Template',
  description: 'Next 13 Template with tailwindCSS',
}

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
