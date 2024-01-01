'use client'
import { useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { object, string } from 'yup'
import { TaskType } from '../utils/types'
import { getSelectOptions } from '@/src/utils/utils'
import { useServerAction } from '@/src/utils/hooks/useServerAction'
import { routes } from '@/src/constants/routes'
import Form from '@/src/components/molecules/form/Form'
import FormInput from '@/src/components/molecules/form/input/FormInput'
import FormSelect from '@/src/components/molecules/form/select/FormSelect'
import FormTextArea from '@/src/components/molecules/form/textarea/FormTextArea'
import Section from '@/src/components/atoms/common/Section'

const initialValues = {
  title: '',
  description: '',
  comments: '',
  status: 'backlog',
}

const validationSchema = object().shape({
  title: string().required(),
  status: string().required(),
})

type Props = {
  data: TaskType[]
  createTask: (task: TaskType) => Promise<TaskType>
  updateTask: (task: TaskType) => Promise<TaskType>
}

export default function TaskForm({ data, createTask, updateTask }: Props) {
  const { push } = useRouter()
  const params = useSearchParams().get('id')
  const editedTask = data.find((d) => d._id === params)
  const newTaskStatus = useRef('in-progress')
  const statusOptions = getSelectOptions(['In Progress', 'To Do', 'Completed', 'BackLog'])
  const { action, isLoading, isSuccess, error } = useServerAction(editedTask ? updateTask : createTask)
  const successStatus = isSuccess
    ? {
        label: 'Continue',
        message: editedTask ? 'Task was updated' : 'Task was added',
        onSuccess: () => push(`${routes.tasks}?tab=${newTaskStatus.current}`),
      }
    : undefined

  const handleSubmit = (task: TaskType) => {
    newTaskStatus.current = task.status
    action(task)
  }

  return (
    <Section
      className='min-h-[70vh]'
      type='center'
      title={editedTask ? 'Edit Task Form' : 'New Task Form'}
      padding='px-6 md:px-20'
    >
      <Form
        className='mt-8'
        style='primary'
        initialValues={editedTask ? editedTask : initialValues}
        validationSchema={validationSchema}
        isLoading={isLoading}
        success={successStatus}
        error={error}
        submit={editedTask ? 'Update Task' : 'Create new Task'}
        onSubmit={handleSubmit}
      >
        <FormInput style='secondary' name='title' label='Title:' placeholder='title' />
        <FormTextArea style='secondary' name='description' label='Description:' placeholder='description' />
        <FormTextArea style='secondary' name='comments' label='Comment:' placeholder='comment' />
        <FormSelect style='secondary' name='status' label='Status:' options={statusOptions} />
      </Form>
    </Section>
  )
}
