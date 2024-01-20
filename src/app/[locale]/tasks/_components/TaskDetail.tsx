import { TaskType } from '../_utils/types'
import { useTranslations } from 'next-intl'
import P from '@/src/components/atoms/typography/P'
import Span from '@/src/components/atoms/typography/Span'
import TaskHeader from './TaskHeader'
import Title from '@/src/components/atoms/typography/Title'
import Section from '@/src/components/atoms/common/Section'

type Props = {
  task: TaskType
  updateTask: (task: TaskType) => Promise<TaskType>
  deleteTask: (id: string) => Promise<TaskType>
}

export default function TaskDetail({ task, updateTask, deleteTask }: Props) {
  const t = useTranslations('tasks')

  return (
    <Section
    className='relative mt-4 flex min-h-[70vh] w-full items-start flex-col justify-start'
    type='left'
    padding='p-mdx pb-16 sm:p-lgx sm:pb-20'
  >
      <TaskHeader task={task} updateTask={updateTask} deleteTask={deleteTask} />
      <div className='flex w-full flex-col items-start justify-start md:ml-10'>
        <Title className='my-4 md:hidden' type='h2' size='xl'>
          {task.title}
        </Title>
        <Span type='italic' size='sm'>{`${t('createdAt')}: ${new Date(task.createdAt).toLocaleString()}`}</Span>
        {task.startedAt ? (
          <Span type='italic' size='sm'>{`${t('startedAt')}: ${new Date(task.startedAt).toLocaleString()}`}</Span>
        ) : null}
        {task.completedAt ? (
          <Span type='italic' size='sm'>{`${t('completedAt')}: ${new Date(task.completedAt).toLocaleString()}`}</Span>
        ) : null}
        <P className='my-12'>
          {t('description')}: {task.description}
        </P>
        <P className='my-4'>
          {t('comment')}: {task.comments}
        </P>
      </div>
    </Section>
  )
}
