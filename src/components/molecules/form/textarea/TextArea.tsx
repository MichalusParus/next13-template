import { TextareaHTMLAttributes, forwardRef } from 'react'
import { Label, Props as LabelProps } from '../Label'

type InputAttributes = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style' | 'size' | 'onChange'>
export type Props = InputAttributes &
  Omit<LabelProps, 'htmlFor'> & {
    name: string
    value: string
    style?: 'primary' | 'secondary' | 'none'
    placeholder?: string
    disabled?: boolean
    onChange: (value: string) => void
  }

export const TextArea = forwardRef(
  (
    {
      className = '',
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
      onChange,
      ...rest
    }: Props,
    ref
  ) => {
    const textAreaStyle = {
      primary:
        'border border-border bg-primary-500 text-primaryInput-text shadow-active ' +
        'hover:bg-primary-700 hover:text-primary-textHover hover:shadow-active ' +
        'active:bg-primary-300 active:text-primary-textActive active:shadow-active ' +
        'focus-visible:bg-primary-300 focus-visible:text-primary-textActive focus-visible:shadow-active ' +
        'disabled:border-zinc-800 disabled:bg-zinc-400 disabled:text-zinc-800 disabled:shadow-none disabled:cursor-not-allowed ',
      secondary:
        'border border-border bg-secondary-500 text-secondary-text shadow-active ' +
        'hover:bg-secondary-700 hover:text-secondary-textHover hover:shadow-active ' +
        'active:bg-secondary-300 active:text-secondary-textActive active:shadow-active ' +
        'focus-visible:bg-secondary-300 focus-visible:text-secondary-textActive focus-visible:shadow-active ' +
        'disabled:border-zinc-800 disabled:bg-zinc-400 disabled:text-zinc-800 disabled:shadow-none disabled:cursor-not-allowed ',
      none: '',
    }
    const errorStyle =
      '[&.error]:shadow-error [&.error]:hover:shadow-error [&.error]:focus-visible:shadow-error [&.error]:active:shadow-error'
    const textAreaSize = {
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
        <textarea
          className={`w-full font-semibold transition-activity placeholder:text-placeholder focus:outline-none ${
            hideError ? '' : 'mb-1'
          } ${textAreaStyle[style]} ${error ? 'error' : ''} ${errorStyle} ${textAreaSize[size]}`}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          {...rest}
        />
      </Label>
    )
  }
)

TextArea.displayName = 'TextArea'
