import { Radio, Props as RadioProps } from './Radio'
import { Controller, useFormContext } from 'react-hook-form'

type Props = Omit<RadioProps, 'value' | 'error' | 'onChange'>

export default function FormRadio({ className = '', name, label, ...rest }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Radio
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
