'use client'
import { useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/src/navigation'
import { object, string } from 'yup'
import { TaskType } from '../_utils/types'
import { useServerAction } from '@/src/utils/hooks/useServerAction'
import { privateRoutes } from '@/src/constants/routes'
import { useTranslations } from 'next-intl'
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

type Props = {
  data: TaskType[]
  createTask: (task: TaskType) => Promise<TaskType>
  updateTask: (task: TaskType) => Promise<TaskType>
}

export default function TaskForm({ data, createTask, updateTask }: Props) {
  const { push } = useRouter()
  const t = useTranslations()
  const params = useSearchParams().get('id')
  const editedTask = data.find((d) => d._id === params)
  const newTaskStatus = useRef('in-progress')
  const statusOptions = ['in-progress', 'to-do', 'completed', 'backlog'].map((value) => ({
    label: t(`tasks.${value}`),
    value: value,
  }))
  const { action, isLoading, isSuccess, error } = useServerAction(editedTask ? updateTask : createTask)
  const successStatus = isSuccess
    ? {
        label: editedTask ? t('tasks.update.continue') : t('tasks.create.continue'),
        message: editedTask ? t('tasks.update.successMessage') : t('tasks.create.successMessage'),
        onSuccess: () => push(`${privateRoutes.tasks}?tab=${newTaskStatus.current}`),
      }
    : undefined

  const validationSchema = object().shape({
    title: string(),
    status: string().required(t('errors.required', { field: t('tasks.status') })),
  })

  const handleSubmit = (task: TaskType) => {
    newTaskStatus.current = task.status
    action(task)
  }

  return (
    <Section
      className='min-h-[70vh]'
      type='center'
      title={editedTask ? t('tasks.update.title') : t('tasks.create.title')}
    >
      <Form
        className='mt-8'
        style='primary'
        initialValues={editedTask ? editedTask : initialValues}
        validationSchema={validationSchema}
        isLoading={isLoading}
        success={successStatus}
        error={error}
        submit={editedTask ? t('tasks.update.submit') : t('tasks.create.submit')}
        onSubmit={handleSubmit}
      >
        <FormInput
          style='secondary'
          name='title'
          label={`${t('tasks.title')}:`}
          placeholder={`${t('tasks.title')}...`}
        />
        <FormTextArea
          style='secondary'
          name='description'
          label={`${t('tasks.description')}:`}
          placeholder={`${t('tasks.description')}...`}
        />
        <FormTextArea
          style='secondary'
          name='comments'
          label={`${t('tasks.comment')}:`}
          placeholder={`${t('tasks.comment')}...`}
        />
        <FormSelect style='secondary' name='status' label={`${t('tasks.status')}:`} options={statusOptions} />
      </Form>
    </Section>
  )
}
