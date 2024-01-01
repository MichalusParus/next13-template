import { FormProvider, useForm } from 'react-hook-form'
import { AnyObject, InferType, ObjectSchema } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Error from './Error'
import Button from '../../atoms/common/Button'

type Props = {
  className?: string
  initialValues: {}
  validationSchema: ObjectSchema<{}, AnyObject, any, ''>
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  error?: string
  submit?: string | React.ReactNode
  hideError?: boolean
  disabled?: boolean
  role?: string
  success?: { label: string; message: string; onSuccess: () => void }
  children: React.ReactNode | React.ReactNode[]
  onSubmit: (values: any) => void
}

export default function Form({
  className = '',
  initialValues,
  validationSchema,
  style = 'primary',
  size = 'md',
  isLoading,
  error,
  hideError,
  submit,
  disabled,
  role,
  success,
  children,
  onSubmit,
}: Props) {
  const methods = useForm<InferType<typeof validationSchema>>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })

  const formStyle = {
    primary: 'text-primary-text',
    secondary: 'text-secondary-text',
    none: '',
  }
  return (
    <div className={`relative rounded-xl ${className} ${formStyle[style]}`}>
      <FormProvider {...methods}>
        <form
          className={`flex w-full flex-wrap items-center justify-center`}
          onSubmit={methods.handleSubmit(onSubmit)}
          role={role}
        >
          {children}
          {!hideError ? (
            <div className='my-2 flex h-6 w-full items-center justify-center'>
              <Error size={size} error={error} />
              <Error type='success' size={size} error={success ? success.message : undefined} />
            </div>
          ) : null}
          <div className='flex items-center justify-center'>
            {success ? (
              <Button className='mb-4' size={size} onClick={success.onSuccess}>
                {success.label}
              </Button>
            ) : submit ? (
              <Button
                className='Submit mb-4'
                type='submit'
                style={style}
                size={size}
                isLoading={isLoading}
                disabled={disabled}
              >
                {submit}
              </Button>
            ) : null}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
