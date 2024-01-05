import { PasswordChangeInput, UserType } from '../../_utils/types'
import { object, ref, string } from 'yup'
import { useServerAction } from '@/src/utils/hooks/useServerAction'
import Form from '@/src/components/molecules/form/Form'
import FormInput from '@/src/components/molecules/form/input/FormInput'
import Modal from '@/src/components/molecules/popover/Modal'

const changePassSchema = object().shape({
  password: string().min(6).max(20).required(),
  newPassword: string().min(6).max(20).required(),
  repeat: string()
    .oneOf([ref('newPassword'), undefined], 'Passwords must match')
    .required(),
})

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
  const { action, isLoading, isSuccess, error } = useServerAction(changePassword)
  const successStatus = isSuccess
    ? {
        label: 'Continue',
        message: 'Your password was changed',
        onSuccess: () => setIsOpen(false),
      }
    : undefined

  const handlePassChange = (input: Omit<PasswordChangeInput, 'email'>) => {
    action({ ...input, email: user.email })
  }

  return (
    <Modal isOpen={isOpen} width='w-[40rem]' title='Change your password' onClose={() => setIsOpen(false)}>
      <Form
        className='mt-12'
        initialValues={initialValues}
        validationSchema={changePassSchema}
        isLoading={isLoading}
        success={successStatus}
        error={error}
        submit='Change password'
        onSubmit={handlePassChange}
      >
        <FormInput type='password' name='password' label='Password:' placeholder='********' />
        <FormInput type='password' name='newPassword' label='New Password:' placeholder='********' />
        <FormInput type='password' name='repeat' label='Repeat New Password:' placeholder='********' />
      </Form>
    </Modal>
  )
}
