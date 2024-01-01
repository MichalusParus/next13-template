'use client'
import { useState } from 'react'
import { TaskType } from '../utils/types'
import { useServerAction } from '@/src/utils/hooks/useServerAction'
import { useRouter } from 'next/navigation'
import { routes } from '@/src/constants/routes'
import Button from '@/src/components/atoms/common/Button'
import CheckIcon from '@/src/components/atoms/icons/CheckIcon'
import DeleteIcon from '@/src/components/atoms/icons/DeleteIcon'
import DoubleChevronIcon from '@/src/components/atoms/icons/DoubleChevronIcon'
import EditIcon from '@/src/components/atoms/icons/EditIcon'
import Title from '@/src/components/atoms/typography/Title'
import Error from '@/src/components/molecules/form/Error'
import Modal from '@/src/components/molecules/popover/Modal'
import NextLink from '@/src/components/atoms/common/NextLink'
import Tooltip from '@/src/components/atoms/common/Tooltip'

type Props = {
  task: TaskType
  setIsDetailOpen: (value: boolean) => void
  updateTask: (task: TaskType) => Promise<{ _id: string }>
  deleteTask: (_id: string) => Promise<{ _id: string }>
}

export default function TaskHeader({ task, setIsDetailOpen, updateTask, deleteTask }: Props) {
  const router = useRouter()

  const [isCompleteConfirmOpen, setIsCompleteConfirmOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const { action: update, isLoading: isUpdateLoading, error: updateError } = useServerAction(updateTask)
  const { action: remove, isLoading: isDeleteLoading, error: deleteError } = useServerAction(deleteTask)

  const handleMoveToDo = () => {
    const movedTask = {
      ...task,
      status: 'to-do' as 'to-do',
    }
    update(movedTask)
    router.push(`${routes.tasks}?tab=to-do`)
  }

  const handleStart = () => {
    const startedTask = {
      ...task,
      status: 'in-progress' as 'in-progress',
      startedAt: new Date(),
    }
    update(startedTask)
    router.push(`${routes.tasks}?tab=in-progress`)
  }

  const handleComplete = () => {
    const completedTask = {
      ...task,
      status: 'completed' as 'completed',
      completedAt: new Date(),
    }
    update(completedTask)
    router.push(`${routes.tasks}?tab=completed`)
  }

  const handleDelete = () => {
    remove(task._id)
    setIsDetailOpen(false)
    router.push(`${routes.tasks}?tab=${task.status}`)
  }

  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex items-center'>
        <Tooltip title='Back'>
          <Button
            style='none'
            icon={<DoubleChevronIcon className='h-8 w-8 rotate-90' />}
            onClick={() => setIsDetailOpen(false)}
          />
        </Tooltip>
        <Title className='hidden md:block' type='h2' size='2xl'>
          {task.title}
        </Title>
      </div>
      <div className='flex items-center '>
        {task.status === 'backlog' ? (
          <Button
            icon={<DoubleChevronIcon className='-rotate-90' />}
            isLoading={isUpdateLoading}
            onClick={handleMoveToDo}
          >
            To-Do
          </Button>
        ) : null}
        {task.status === 'to-do' ? (
          <Button icon={<DoubleChevronIcon className='-rotate-90' />} isLoading={isUpdateLoading} onClick={handleStart}>
            Start
          </Button>
        ) : null}
        {task.status === 'in-progress' ? (
          <Button icon={<CheckIcon />} isLoading={isUpdateLoading} onClick={() => setIsCompleteConfirmOpen(true)}>
            Complete
          </Button>
        ) : null}
        <Tooltip title='Edit'>
          <NextLink
            style='secondary'
            className='mx-4'
            icon={<EditIcon />}
            href={`${routes.tasks}?tab=form&id=${task._id}`}
          />
        </Tooltip>
        <Tooltip title='Delete'>
          <Button className='icon' style='delete' icon={<DeleteIcon />} onClick={() => setIsDeleteConfirmOpen(true)} />
        </Tooltip>
      </div>
      <Modal
        isOpen={isCompleteConfirmOpen}
        title='Do you really completed task?'
        width='w-[27.5rem]'
        onClose={() => setIsCompleteConfirmOpen(false)}
      >
        <div className='mb-2 flex justify-center'>
          <Error error={updateError} />
        </div>
        <div className='ml-auto flex w-max'>
          <Button style='secondary' onClick={() => setIsCompleteConfirmOpen(false)}>
            Return
          </Button>
          <Button className='ml-4' icon={<CheckIcon />} isLoading={isUpdateLoading} onClick={handleComplete}>
            Complete
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteConfirmOpen}
        title='Do you really want to delete task?'
        width='w-[27.5rem]'
        onClose={() => setIsDeleteConfirmOpen(false)}
      >
        <div className='mb-2 flex justify-center'>
          <Error error={deleteError} />
        </div>
        <div className='ml-auto flex w-max'>
          <Button style='secondary' onClick={() => setIsDeleteConfirmOpen(false)}>
            Return
          </Button>
          <Button
            className='ml-4'
            style='delete'
            icon={<DeleteIcon />}
            isLoading={isDeleteLoading}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
