import { TaskType } from '../_utils/types'
import P from '@/src/components/atoms/typography/P'
import Span from '@/src/components/atoms/typography/Span'
import TaskHeader from './TaskHeader'
import Title from '@/src/components/atoms/typography/Title'

type Props = {
  task: TaskType
  setIsDetailOpen: (value: boolean) => void
  updateTask: (task: TaskType) => Promise<TaskType>
  deleteTask: (id: string) => Promise<TaskType>
}

export default function TaskDetail({ task, setIsDetailOpen, updateTask, deleteTask }: Props) {
  return (
    <div className='flex min-h-[70vh] w-full flex-col justify-start'>
      <TaskHeader task={task} setIsDetailOpen={setIsDetailOpen} updateTask={updateTask} deleteTask={deleteTask} />
      <div className='flex w-full flex-col items-start justify-start md:ml-10'>
        <Title className='my-4 md:hidden' type='h2' size='2xl'>
          {task.title}
        </Title>
        <Span type='italic' size='sm'>{`Created: ${new Date(task.createdAt).toLocaleString()}`}</Span>
        {task.startedAt ? (
          <Span type='italic' size='sm'>{`Started: ${new Date(task.startedAt).toLocaleString()}`}</Span>
        ) : null}
        {task.completedAt ? (
          <Span type='italic' size='sm'>{`Completed: ${new Date(task.completedAt).toLocaleString()}`}</Span>
        ) : null}
        <P className='my-12'>Description: {task.description}</P>
        <P className='my-4'>Comments: {task.comments ? task.comments : 'No Comments'}</P>
      </div>
    </div>
  )
}
