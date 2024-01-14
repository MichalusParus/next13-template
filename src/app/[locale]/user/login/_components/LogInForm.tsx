'use client'
import { useState } from 'react'
import { useRouter } from '@/src/navigation'
import { object, string } from 'yup'
import { UserInput } from '../../_utils/types'
import { routes } from '@/src/constants/routes'
import { signIn } from 'next-auth/react'
import Form from '@/src/components/molecules/form/Form'
import FormInput from '@/src/components/molecules/form/input/FormInput'
import { useTranslations } from 'next-intl'

const initialValues = {
  email: '',
  password: '',
}

export default function LogInForm() {
  const router = useRouter()
  const t = useTranslations()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const validationSchema = object().shape({
    email: string()
      .email(t('errors.wrongFormat'))
      .required(t('errors.required', { field: t('login.email') })),
    password: string().required(t('errors.required', { field: t('login.password') })),
  })

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
        router.refresh()
        router.push(routes.home)
      } else if (res?.status === 401) {
        setError(t('errors.invalidEmailOrPass'))
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
      submit={t('login.submit')}
      onSubmit={handleSubmit}
    >
      <FormInput style='secondary' name='email' label={`${t('login.email')}:`} placeholder={`${t('login.email')}...`} />
      <FormInput
        style='secondary'
        type='password'
        name='password'
        label={`${t('login.password')}:`}
        placeholder='********'
      />
    </Form>
  )
}
