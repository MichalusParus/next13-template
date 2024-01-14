import { PasswordChangeInput, UserType } from '../../_utils/types'
import { object, ref, string } from 'yup'
import { useServerAction } from '@/src/utils/hooks/useServerAction'
import { useTranslations } from 'next-intl'
import Form from '@/src/components/molecules/form/Form'
import FormInput from '@/src/components/molecules/form/input/FormInput'
import Modal from '@/src/components/molecules/popover/Modal'

const initialValues = {
  password: '',
  newPassword: '',
  repeat: '',
}

type Props = {
  user: UserType
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  changePassword: (user: PasswordChangeInput) => Promise<UserType>
}

export default function ChangePassForm({ user, isOpen, setIsOpen, changePassword }: Props) {
  const t = useTranslations()
  const { action, isLoading, isSuccess, error, reset } = useServerAction(changePassword)

  const changePassSchema = object().shape({
    password: string()
      .min(6, t('errors.tooShort', { number: 6 }))
      .max(20, t('errors.tooLong', { number: 20 }))
      .required(t('errors.required', { field: t('profile.changePass.password') })),
    newPassword: string()
      .min(6, t('errors.tooShort', { number: 6 }))
      .max(20, t('errors.tooLong', { number: 20 }))
      .required(t('errors.required', { field: t('profile.changePass.newPassword') })),
    repeat: string()
      .oneOf([ref('newPassword'), undefined], t('errors.passMatch'))
      .required(t('errors.required', { field: t('profile.changePass.repeatNew') })),
  })

  const handleOnClose = () => {
    reset()
    setIsOpen(false)
  }

  const successStatus = isSuccess
    ? {
        label: t('profile.changePass.continue'),
        message: t('profile.changePass.successMessage'),
        onSuccess: handleOnClose,
      }
    : undefined

  const handlePassChange = (input: Omit<PasswordChangeInput, 'email'>) => {
    action({ ...input, email: user.email })
  }

  return (
    <Modal
      name='changePassModal'
      isOpen={isOpen}
      width='w-[40rem]'
      title={t('profile.changePass.title')}
      setIsOpen={handleOnClose}
    >
      <Form
        className='mt-12'
        initialValues={initialValues}
        validationSchema={changePassSchema}
        isLoading={isLoading}
        success={successStatus}
        error={error}
        submit={t('profile.changePass.submit')}
        onSubmit={handlePassChange}
      >
        <FormInput
          type='password'
          name='password'
          label={`${t('profile.changePass.password')}:`}
          placeholder='********'
        />
        <FormInput
          type='password'
          name='newPassword'
          label={`${t('profile.changePass.newPassword')}:`}
          placeholder='********'
        />
        <FormInput
          type='password'
          name='repeat'
          label={`${t('profile.changePass.repeatNew')}:`}
          placeholder='********'
        />
      </Form>
    </Modal>
  )
}
