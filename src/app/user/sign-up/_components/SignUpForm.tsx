'use client'
import { object, string, ref } from 'yup'
import { UserInput, UserType } from '../../_utils/types'
import { useServerAction } from '@/src/utils/hooks/useServerAction'
import { useRouter } from 'next/navigation'
import { routes } from '@/src/constants/routes'
import Form from '@/src/components/molecules/form/Form'
import FormInput from '@/src/components/molecules/form/input/FormInput'

const initialValues = {
  name: '',
  email: '',
  password: '',
  repeat: '',
}

const validationSchema = object().shape({
  name: string().min(4).max(20).required(),
  email: string().email().required(),
  password: string().min(6).max(20).required(),
  repeat: string()
    .oneOf([ref('password'), undefined], 'Passwords must match')
    .required(),
})

type Props = {
  createUser: (user: UserInput) => Promise<UserType>
}

export default function SignUpForm({ createUser }: Props) {
  const { push } = useRouter()
  const { action, isLoading, isSuccess, error } = useServerAction(createUser)
  const successStatus = isSuccess
    ? {
        label: 'Log In',
        message: 'New user created, log in to continue',
        onSuccess: () => push(routes.login),
      }
    : undefined

  const handleSubmit = async (newUser: UserInput) => {
    action(newUser)
  }

  return (
    <Form
      className='mt-12'
      initialValues={initialValues}
      validationSchema={validationSchema}
      isLoading={isLoading}
      success={successStatus}
      error={error}
      submit='Sign Up'
      onSubmit={handleSubmit}
    >
      <FormInput style='secondary' name='name' label='Name:' placeholder='Name...' />
      <FormInput style='secondary' name='email' label='E-mail:' placeholder='E-mail...' />
      <FormInput style='secondary' type='password' name='password' label='Password:' placeholder='********' />
      <FormInput style='secondary' type='password' name='repeat' label='Repeat Password:' placeholder='********' />
    </Form>
  )
}
