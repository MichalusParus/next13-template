'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { object, string } from 'yup'
import { UserInput } from '../../_utils/types'
import { routes } from '@/src/constants/routes'
import { signIn } from 'next-auth/react'
import Form from '@/src/components/molecules/form/Form'
import FormInput from '@/src/components/molecules/form/input/FormInput'

const initialValues = {
  email: '',
  password: '',
}

const validationSchema = object().shape({
  email: string().required(),
  password: string().required(),
})

export default function LogInForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const handleSubmit = async ({ email, password }: Pick<UserInput, 'email' | 'password'>) => {
    try {
      setIsLoading(true)
      const res = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      })
      if (res?.status === 200) {
        setIsLoading(false)
        router.push(routes.home)
      } else if (res?.status === 401) {
        setError('Invalid email or password')
        setIsLoading(false)
      }
    } catch (errorMessage: any) {
      setError(errorMessage)
    }
  }

  return (
    <Form
      className='mt-12'
      initialValues={initialValues}
      validationSchema={validationSchema}
      isLoading={isLoading}
      error={error}
      submit='Log in'
      onSubmit={handleSubmit}
    >
      <FormInput style='secondary' name='email' label='E-mail:' placeholder='E-mail..' />
      <FormInput style='secondary' type='password' name='password' label='Password:' placeholder='********' />
    </Form>
  )
}
