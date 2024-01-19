import { Checkbox, Props as CheckboxProps } from './Checkbox'
import { Controller, useFormContext } from 'react-hook-form'

type Props = Omit<CheckboxProps, 'value' | 'error' | 'onChange'>

export default function FormCheckbox({ className = '', name, label, ...rest }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox
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
