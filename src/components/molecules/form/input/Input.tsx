import { InputHTMLAttributes, forwardRef } from 'react'
import { Label, Props as LabelProps } from '../Label'

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'style' | 'size' | 'onChange'>
export type Props = InputAttributes &
  Omit<LabelProps, 'htmlFor'> & {
    type?: 'text' | 'number' | 'password' | 'search'
    name: string
    value: string
    style?: 'primary' | 'secondary' | 'none'
    placeholder?: string
    disabled?: boolean
    ariaLabel?: string
    onChange: (value: string) => void
  }

export const Input = forwardRef(
  (
    {
      className = '',
      type = 'text',
      name,
      label,
      value,
      style = 'primary',
      size = 'md',
      placeholder,
      description,
      hideLabel,
      hideError,
      disabled,
      error,
      ariaLabel = 'input',
      onChange,
      ...rest
    }: Props,
    ref
  ) => {
    const inputStyle = {
      primary:
        'border border-primary-text bg-primary-500 text-primaryInput-text shadow-button ' +
        'hover:bg-primary-700 hover:text-primary-textHover hover:shadow-button ' +
        'active:bg-primary-300 active:text-primary-textActive active:shadow-active ' +
        'focus-visible:bg-primary-300 focus-visible:text-primary-textActive focus-visible:shadow-active ' +
        'disabled:border-zinc-800 disabled:bg-zinc-400 disabled:text-zinc-800 disabled:shadow-none disabled:cursor-not-allowed ' +
        'autofill:transition-colors autofill:duration-[1000s] autofill:shadow-active ',
      secondary:
        'border border-secondary-text bg-secondary-500 text-secondary-text shadow-button ' +
        'hover:bg-secondary-700 hover:text-secondary-textHover hover:shadow-button ' +
        'active:bg-secondary-300 active:text-secondary-textActive active:shadow-active ' +
        'focus-visible:bg-secondary-300 focus-visible:text-secondary-textActive focus-visible:shadow-active ' +
        'disabled:border-zinc-800 disabled:bg-zinc-400 disabled:text-zinc-800 disabled:shadow-none disabled:cursor-not-allowed ' +
        'autofill:transition-colors autofill:duration-[1000s] autofill:shadow-active',
      none: '',
    }
    const errorStyle =
      '[&.error]:shadow-error [&.error]:hover:shadow-error [&.error]:focus-visible:shadow-error [&.error]:active:shadow-error'
    const inputSize = {
      sm: 'py-smy px-smx text-sm rounded-md',
      md: 'py-mdy px-mdx text-md rounded-lg',
      lg: 'py-lgy px-lgx text-lg rounded-xl',
      none: '',
    }

    return (
      <Label
        className={className}
        name={name}
        label={label}
        style={style}
        size={size}
        error={error}
        description={description}
        hideLabel={hideLabel}
        hideError={hideError}
      >
        <input
          className={`w-full font-semibold transition-activity placeholder:text-placeholder focus:outline-none ${
            hideError ? '' : 'mb-1'
          } ${inputStyle[style]} ${error ? 'error' : ''} ${errorStyle} ${inputSize[size]}`}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel}
          ref={ref as any}
          {...rest}
        />
      </Label>
    )
  }
)

Input.displayName = 'Input'
