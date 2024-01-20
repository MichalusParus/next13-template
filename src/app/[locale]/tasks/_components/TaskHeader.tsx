'use client'
import { useState } from 'react'
import { TaskType } from '../_utils/types'
import { useServerAction } from '@/src/utils/hooks/useServerAction'
import { useRouter } from '@/src/navigation'
import { privateRoutes } from '@/src/constants/routes'
import { Button } from '@/src/components/atoms/common/Button'
import { useTranslations } from 'next-intl'
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
  updateTask: (task: TaskType) => Promise<TaskType>
  deleteTask: (_id: string) => Promise<TaskType>
}

export default function TaskHeader({ task, updateTask, deleteTask }: Props) {
  const router = useRouter()
  const t = useTranslations()
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
    router.push(`${privateRoutes.tasks}?tab=to-do`)
  }

  const handleStart = () => {
    const startedTask = {
      ...task,
      status: 'in-progress' as 'in-progress',
      startedAt: new Date(),
    }
    update(startedTask)
    router.push(`${privateRoutes.tasks}?tab=in-progress`)
  }

  const handleComplete = () => {
    const completedTask = {
      ...task,
      status: 'completed' as 'completed',
      completedAt: new Date(),
    }
    update(completedTask)
    router.push(`${privateRoutes.tasks}?tab=completed`)
  }

  const handleDelete = () => {
    remove(task._id)
    router.push(`${privateRoutes.tasks}?tab=${task.status}`)
  }

  return (
    <div className='flex w-full items-center justify-between'>
      <div className='items-center flex'>
        <Tooltip title={t('common.back')}>
          <NextLink
            style='none'
            size='none'
            icon={<DoubleChevronIcon className='h-8 w-8 rotate-90' />}
            ariaLabel={t('common.back')}
            href={`${privateRoutes.tasks}?tab=in-progress`}
          />
        </Tooltip>
        <Title className='hidden md:block ml-2' type='h2' size='2xl'>
          {task.title}
        </Title>
      </div>
      <div className='ml-auto flex items-center'>
        {task.status === 'backlog' ? (
          <Button
            icon={<DoubleChevronIcon className='-rotate-90' />}
            isLoading={isUpdateLoading}
            onClick={handleMoveToDo}
          >
            {t('tasks.to-do')}
          </Button>
        ) : null}
        {task.status === 'to-do' ? (
          <Button icon={<DoubleChevronIcon className='-rotate-90' />} isLoading={isUpdateLoading} onClick={handleStart}>
            {t('tasks.start')}
          </Button>
        ) : null}
        {task.status === 'in-progress' ? (
          <Button
            icon={<CheckIcon />}
            isLoading={isUpdateLoading}
            role='combobox'
            aria-haspopup='dialog'
            aria-expanded={isCompleteConfirmOpen}
            aria-controls='completeConfirm'
            onClick={() => setIsCompleteConfirmOpen(true)}
          >
            {t('tasks.completed')}
          </Button>
        ) : null}
        <Tooltip title={t('common.edit')}>
          <NextLink
            style='secondary'
            className='mx-4'
            icon={<EditIcon />}
            ariaLabel={t('common.edit')}
            href={`${privateRoutes.tasks}?tab=form&id=${task._id}`}
          />
        </Tooltip>
        <Tooltip title={t('common.delete')}>
          <Button
            className='icon'
            style='delete'
            icon={<DeleteIcon />}
            ariaLabel={t('common.delete')}
            role='combobox'
            aria-haspopup='dialog'
            aria-expanded={isDeleteConfirmOpen}
            aria-controls='deleteConfirm'
            onClick={() => setIsDeleteConfirmOpen(true)}
          />
        </Tooltip>
      </div>
      <Modal
        name='completeConfirm'
        isOpen={isCompleteConfirmOpen}
        title={t('tasks.completeConfirm')}
        width='w-[27.5rem]'
        setIsOpen={setIsCompleteConfirmOpen}
      >
        <div className='mb-2 flex justify-center'>
          <Error error={updateError} />
        </div>
        <div className='ml-auto flex w-max'>
          <Button style='secondary' onClick={() => setIsCompleteConfirmOpen(false)}>
            {t('common.back')}
          </Button>
          <Button className='ml-4' icon={<CheckIcon />} isLoading={isUpdateLoading} onClick={handleComplete}>
            {t('tasks.completed')}
          </Button>
        </div>
      </Modal>
      <Modal
        name='deleteConfirm'
        isOpen={isDeleteConfirmOpen}
        title={t('tasks.deleteConfirm')}
        width='w-[27.5rem]'
        setIsOpen={setIsDeleteConfirmOpen}
      >
        <div className='mb-2 flex justify-center'>
          <Error error={deleteError} />
        </div>
        <div className='ml-auto flex w-max'>
          <Button style='secondary' onClick={() => setIsDeleteConfirmOpen(false)}>
            {t('common.back')}
          </Button>
          <Button
            className='ml-4'
            style='delete'
            icon={<DeleteIcon />}
            isLoading={isDeleteLoading}
            onClick={handleDelete}
          >
            {t('common.delete')}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
