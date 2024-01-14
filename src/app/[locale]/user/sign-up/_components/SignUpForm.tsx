'use client'
import { object, string, ref } from 'yup'
import { UserInput, UserType } from '../../_utils/types'
import { useServerAction } from '@/src/utils/hooks/useServerAction'
import { useRouter } from '@/src/navigation'
import { routes } from '@/src/constants/routes'
import Form from '@/src/components/molecules/form/Form'
import FormInput from '@/src/components/molecules/form/input/FormInput'
import { useTranslations } from 'next-intl'

const initialValues = {
  name: '',
  email: '',
  password: '',
  repeat: '',
}

type Props = {
  createUser: (user: UserInput) => Promise<UserType>
}

export default function SignUpForm({ createUser }: Props) {
  const { push } = useRouter()
  const t = useTranslations()
  const { action, isLoading, isSuccess, error } = useServerAction(createUser)
  const successStatus = isSuccess
    ? {
        label: t('signup.login'),
        message: t('signup.successMessage'),
        onSuccess: () => push(routes.login),
      }
    : undefined

  const validationSchema = object().shape({
    name: string().required(t('errors.required', { field: t('signup.name') })),
    email: string()
      .email(t('errors.wrongFormat'))
      .required(t('errors.required', { field: t('signup.email') })),
    password: string()
      .min(6, t('errors.tooShort', { number: 6 }))
      .max(20, t('errors.tooLong', { number: 20 }))
      .required(t('errors.required', { field: t('signup.password') })),
    repeat: string()
      .oneOf([ref('password'), undefined], t('errors.passMatch'))
      .required(t('errors.required', { field: t('signup.repeat') })),
  })

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
      submit={t('signup.submit')}
      onSubmit={handleSubmit}
    >
      <FormInput style='secondary' name='name' label={`${t('signup.name')}:`} placeholder={`${t('signup.name')}...`} />
      <FormInput
        style='secondary'
        name='email'
        label={`${t('signup.email')}:`}
        placeholder={`${t('signup.email')}...`}
      />
      <FormInput
        style='secondary'
        type='password'
        name='password'
        label={`${t('signup.password')}:`}
        placeholder='********'
      />
      <FormInput
        style='secondary'
        type='password'
        name='repeat'
        label={`${t('signup.repeat')}:`}
        placeholder='********'
      />
    </Form>
  )
}
