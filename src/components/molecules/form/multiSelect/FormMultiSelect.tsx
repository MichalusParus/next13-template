import { MultiSelect, Props as SelectProps } from './MultiSelect'
import { Controller, useFormContext } from 'react-hook-form'

type Props = Omit<SelectProps, 'value' | 'error' | 'onChange'>

export default function FormMultiSelect({ className = '', name, label, ...rest }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MultiSelect
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
