'use client'
import { TaskType } from '../_utils/types'
import Title from '@/src/components/atoms/typography/Title'
import Error from '@/src/components/molecules/form/Error'
import P from '@/src/components/atoms/typography/P'
import Button from '@/src/components/atoms/common/Button'

type Props = {
  task: TaskType
  onClick: (task: TaskType) => void
}

export default function LogTile({ task, onClick }: Props) {
  const truncateDescription = (description: string) => {
    return description.slice(0, 85)
  }

  return (
    <Button className='relative h-40 w-full sm:w-52' key={task._id} size='sm' onClick={() => onClick(task)}>
      <div className='my-2 flex min-h-full flex-col'>
        <Title className='text-center text-text' type='h2' size='lg'>
          {task.title}
        </Title>
        <P className='text-center text-text' size='sm'>
          {truncateDescription(task.description)}
        </P>
        {task.status === 'completed' ? (
          <Error
            className='absolute bottom-2 left-1/2 flex w-full -translate-x-1/2 justify-center'
            type='success'
            size='lg'
            error='Completed'
          />
        ) : null}
      </div>
    </Button>
  )
}
