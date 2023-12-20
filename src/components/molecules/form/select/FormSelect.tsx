import { Select, Props as SelectProps } from './Select'
import { Controller, useFormContext } from 'react-hook-form'

type Props = Omit<SelectProps, 'value' | 'error' | 'onChange'>

export default function FormSelect({ className = '', name, label, ...rest }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          className={className}
          label={label}
          error={errors[name] ? String(errors[name]?.message) : undefined}
          {...field}
          {...rest}
        />
      )}
    />
  )
}
