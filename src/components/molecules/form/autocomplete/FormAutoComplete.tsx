import { AutoComplete, Props as AutoCompleteProps } from './AutoComplete'
import { Controller, useFormContext } from 'react-hook-form'

type Props = Omit<AutoCompleteProps, 'value' | 'error' | 'onChange'>

export default function FormAutoComplete({ className = '', name, label, ...rest }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <AutoComplete
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
