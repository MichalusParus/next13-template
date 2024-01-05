import { Input, Props as InputProps } from './Input'
import { Controller, useFormContext } from 'react-hook-form'

type Props = Omit<InputProps, 'value' | 'error' | 'onChange'>

export default function FormInput({ className = '', name, label, ...rest }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          className={className}
          label={label}
          error={errors[name] ? String(errors[name]?.message) : undefined}
          autoComplete='off'
          {...field}
          {...rest}
        />
      )}
    />
  )
}
