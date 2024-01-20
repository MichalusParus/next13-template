import { createTask, deleteTask, getTask, getTasks, updateTask } from './_utils/actions'
import { getTranslations } from 'next-intl/server'
import { PageProps } from '@/src/utils/types'
import TasksGrid from './_components/TaskGrid'
import Tabs from '@/src/components/molecules/popover/Tabs'
import TaskForm from './_components/TaskForm'
import TaskDetail from './_components/TaskDetail'

export async function generateMetadata({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'tasks' })
  return {
    title: t('metadata') + ' || Next 13 Template',
  }
}

export default async function TasksPage({searchParams}: PageProps) {
  const isParams = searchParams.id
  const data = await getTasks()
  const task = isParams ? await getTask(searchParams.id) : undefined
  const t = await getTranslations('tasks')

  const tabs = [
    {
      label: t('in-progress'),
      slug: 'in-progress',
      component: (
        <TasksGrid data={data} selectedTab='in-progress' />
      ),
    },
    {
      label: t('to-do'),
      slug: 'to-do',
      component: <TasksGrid data={data} selectedTab='to-do' />,
    },
    {
      label: t('completed'),
      slug: 'completed',
      component: <TasksGrid data={data} selectedTab='completed' />,
    },
    {
      label: t('backlog'),
      slug: 'backlog',
      component: <TasksGrid data={data} selectedTab='backlog' />,
    },
    {
      label: '+ ' + t('create.title'),
      slug: 'form',
      component: <TaskForm task={task} onSubmit={isParams ? updateTask : createTask} />,
    },
    {
      label: 'detail',
      slug: 'detail',
      component: <TaskDetail task={task} updateTask={updateTask} deleteTask={deleteTask} />,
      isHidden: true
    },
  ]

  return <Tabs name={t('navLabel')} tabs={tabs} />
}
