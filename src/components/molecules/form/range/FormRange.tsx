import { Range, Props as RangeProps } from './Range'
import { Controller, useFormContext } from 'react-hook-form'

type Props = Omit<RangeProps, 'value' | 'error' | 'onChange'>

export default function FormRange({ className = '', name, label, ...rest }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Range
          className={className}
          label={label}
          error={(errors[name]?.message as string) || undefined}
          {...field}
          {...rest}
        />
      )}
    />
  )
}
