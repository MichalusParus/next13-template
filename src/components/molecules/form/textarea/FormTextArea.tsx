import { TextArea, Props as TextAreaProps } from './TextArea'
import { Controller, useFormContext } from 'react-hook-form'

type Props = Omit<TextAreaProps, 'value' | 'error' | 'onChange'>

export default function FormTextArea({ className = '', name, label, ...rest }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextArea
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
