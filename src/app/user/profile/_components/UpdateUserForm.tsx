import { UserInput, UserType } from '../../_utils/types'
import { object, string } from 'yup'
import { useServerAction } from '@/src/utils/hooks/useServerAction'
import { useRouter } from 'next/navigation'
import { privateRoutes } from '@/src/constants/routes'
import Form from '@/src/components/molecules/form/Form'
import FormInput from '@/src/components/molecules/form/input/FormInput'
import Modal from '@/src/components/molecules/popover/Modal'

const editSchema = object().shape({
  name: string().required(),
})

type Props = {
  user: UserType
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  updateUser: (user: UserType) => Promise<UserType>
}

export default function UpdateUserForm({ user, isOpen, setIsOpen, updateUser }: Props) {
  const { push } = useRouter()
  const { action, isLoading, isSuccess, error } = useServerAction(updateUser)
  const successStatus = isSuccess
    ? {
        label: 'Continue',
        message: 'Account information was updated',
        onSuccess: () => push(privateRoutes.profile),
      }
    : undefined

  const handleEdit = (input: UserInput) => {
    action({ ...user, name: input.name, email: input.email })
  }

  return (
    <Modal
      isOpen={isOpen}
      style='primary'
      width='w-[40rem]'
      title='Edit account information'
      onClose={() => setIsOpen(false)}
    >
      <Form
        className='mt-12'
        initialValues={user}
        validationSchema={editSchema}
        isLoading={isLoading}
        success={successStatus}
        error={error}
        style='secondary'
        submit='Update information'
        onSubmit={handleEdit}
      >
        <FormInput name='name' label='Name:' placeholder='Name...' style='secondary' />
        <FormInput name='email' label='Email:' placeholder='Email...' style='secondary' />
      </Form>
    </Modal>
  )
}
