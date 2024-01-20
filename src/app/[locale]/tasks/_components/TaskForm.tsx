'use client'
import { useRef } from 'react'
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
  task?: TaskType
  onSubmit: (task: TaskType) => Promise<TaskType>
}

export default function TaskForm({ task, onSubmit}: Props) {
  const { push } = useRouter()
  const t = useTranslations()
  const newTaskStatus = useRef('in-progress')
  const statusOptions = ['in-progress', 'to-do', 'completed', 'backlog'].map((value) => ({
    label: t(`tasks.${value}`),
    value: value,
  }))
  const { action, isLoading, isSuccess, error } = useServerAction(onSubmit)
  const successStatus = isSuccess
    ? {
        label: task ? t('tasks.update.continue') : t('tasks.create.continue'),
        message: task ? t('tasks.update.successMessage') : t('tasks.create.successMessage'),
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
      title={task ? t('tasks.update.title') : t('tasks.create.title')}
    >
      <Form
        className='mt-8'
        style='primary'
        initialValues={task ? task : initialValues}
        validationSchema={validationSchema}
        isLoading={isLoading}
        success={successStatus}
        error={error}
        submit={task ? t('tasks.update.submit') : t('tasks.create.submit')}
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
