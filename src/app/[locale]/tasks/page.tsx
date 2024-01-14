import { createTask, deleteTask, getTasks, updateTask } from './_utils/actions'
import { getTranslations } from 'next-intl/server'
import TasksGrid from './_components/TaskGrid'
import Tabs from '@/src/components/molecules/popover/Tabs'
import TaskForm from './_components/TaskForm'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'tasks' })
  return {
    title: t('metadata') + ' || Next 13 Template',
  }
}

export default async function TasksPage() {
  const data = await getTasks()
  const t = await getTranslations('tasks')

  const tabs = [
    {
      label: t('in-progress'),
      slug: 'in-progress',
      component: (
        <TasksGrid data={data} selectedCategory='in-progress' updateTask={updateTask} deleteTask={deleteTask} />
      ),
    },
    {
      label: t('to-do'),
      slug: 'to-do',
      component: <TasksGrid data={data} selectedCategory='to-do' updateTask={updateTask} deleteTask={deleteTask} />,
    },
    {
      label: t('completed'),
      slug: 'completed',
      component: <TasksGrid data={data} selectedCategory='completed' updateTask={updateTask} deleteTask={deleteTask} />,
    },
    {
      label: t('backlog'),
      slug: 'backlog',
      component: <TasksGrid data={data} selectedCategory='backlog' updateTask={updateTask} deleteTask={deleteTask} />,
    },
    {
      label: '+ ' + t('create.title'),
      slug: 'form',
      component: <TaskForm data={data} createTask={createTask} updateTask={updateTask} />,
    },
  ]

  return <Tabs name={t('navLabel')} tabs={tabs} />
}
