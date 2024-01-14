import { UserInput, UserType } from '../../_utils/types'
import { object, string } from 'yup'
import { useServerAction } from '@/src/utils/hooks/useServerAction'
import { useTranslations } from 'next-intl'
import Form from '@/src/components/molecules/form/Form'
import FormInput from '@/src/components/molecules/form/input/FormInput'
import Modal from '@/src/components/molecules/popover/Modal'

type Props = {
  user: UserType
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  updateUser: (user: UserType) => Promise<UserType>
}

export default function UpdateUserForm({ user, isOpen, setIsOpen, updateUser }: Props) {
  const t = useTranslations()
  const { action, isLoading, isSuccess, error, reset } = useServerAction(updateUser)

  const editSchema = object().shape({
    name: string().required(t('errors.required', { field: t('profile.update.name') })),
    email: string()
      .email(t('errors.wrongFormat'))
      .required(t('errors.required', { field: t('profile.email') })),
  })

  const handleOnClose = () => {
    setIsOpen(false)
    reset()
  }

  const successStatus = isSuccess
    ? {
        label: t('profile.update.continue'),
        message: t('profile.update.successMessage'),
        onSuccess: handleOnClose,
      }
    : undefined

  const handleEdit = (input: UserInput) => {
    action({ ...user, name: input.name, email: input.email })
  }

  return (
    <Modal
      name='userEditModal'
      isOpen={isOpen}
      style='primary'
      width='w-[40rem]'
      title={t('profile.update.title')}
      setIsOpen={handleOnClose}
    >
      <Form
        className='mt-12'
        initialValues={user}
        validationSchema={editSchema}
        isLoading={isLoading}
        success={successStatus}
        error={error}
        style='secondary'
        submit={t('profile.update.submit')}
        onSubmit={handleEdit}
      >
        <FormInput
          name='name'
          label={`${t('profile.update.name')}:`}
          placeholder={`${t('profile.update.name')}...`}
          style='secondary'
        />
        <FormInput
          name='email'
          label={`${t('profile.email')}:`}
          placeholder={`${t('profile.email')}...`}
          style='secondary'
        />
      </Form>
    </Modal>
  )
}
