import { InputHTMLAttributes, forwardRef } from 'react'
import { Label, Props as LabelProps } from '../Label'

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'style' | 'size' | 'onChange'>
export type Props = InputAttributes &
  Omit<LabelProps, 'htmlFor'> & {
    type?: 'row' | 'column'
    name: string
    value: string
    options: { label: string; value: string }[]
    style?: 'primary' | 'secondary' | 'none'
    disabled?: boolean
    hideError?: boolean
    onChange: (value: string) => void
  }

export const Radio = forwardRef(
  (
    {
      className = '',
      type = 'row',
      name,
      label,
      value,
      options,
      style = 'primary',
      size = 'md',
      description,
      hideLabel,
      disabled,
      hideError,
      error,
      onChange,
      ...rest
    }: Props,
    ref
  ) => {
    const afterStyle =
      'after:translate-[-50%,-50%] after:invisible after:absolute after:left-[50%] after:top-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-full after:bg-primary-text after:content-[""] after:opacity-0 after:transition-opacity checked:after:opacity-100 checked:after:visible'
    const radioStyle = {
      primary:
        'border border-primary-text bg-primary-500 text-primaryInput-text shadow-active ' +
        'hover:bg-primary-700 hover:text-primary-textHover hover:shadow-active ' +
        'focus-visible:bg-primary-700 focus-visible:text-primary-textActive focus-visible:shadow-active ' +
        'active:bg-primary-700 active:text-primary-textActive active:shadow-active ' +
        'checked:bg-primary-700 checked:text-primary-textActive checked:shadow-active ' +
        'disabled:border-zinc-800 disabled:bg-zinc-400 disabled:text-zinc-800 disabled:shadow-none disabled:cursor-not-allowed ',
      secondary:
        'border border-secondary-text bg-secondary-500 text-secondary-text shadow-active ' +
        'hover:bg-secondary-700 hover:text-secondary-textHover hover:shadow-active ' +
        'focus-visible:bg-secondary-700 focus-visible:text-secondary-textActive focus-visible:shadow-active ' +
        'active:bg-secondary-700 active:text-secondary-textActive active:shadow-active ' +
        'checked:bg-secondary-700 checked:text-secondary-textActive checked:shadow-active ' +
        'disabled:border-zinc-800 disabled:bg-zinc-400 disabled:text-zinc-800 disabled:shadow-none disabled:cursor-not-allowed ',
      none: '',
    }
    const errorStyle =
      '[&.error]:shadow-error [&.error]:hover:shadow-error [&.error]:focus-visible:shadow-error [&.error]:active:shadow-error'
    const labelSize = {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      none: '',
    }
    const radioSize = {
      sm: 'w-6 h-6 after:h-2 after:w-2',
      md: 'w-7 h-7 after:h-2.5 after:w-2.5',
      lg: 'w-8 h-8 after:h-3 after:w-3',
      none: '',
    }
    const radioMargin = {
      sm: 'mr-3 mb-1',
      md: 'mr-4 mb-2',
      lg: 'mr-5 mb-3',
      none: '',
    }

    return (
      <Label
        className={className}
        label={label}
        style={style}
        size={size}
        error={error}
        description={description}
        hideLabel={hideLabel}
        hideError={hideError}
      >
        <div className={`RadioGroupWrap flex flex-wrap ${type === 'column' ? 'flex-col' : ''}`} role='radiogroup'>
          {options.map(({ value: radioValue, label: radioLabel }) => (
            <label
              key={radioValue}
              htmlFor={radioValue}
              className={`relative flex cursor-pointer items-center disabled:cursor-not-allowed ${labelSize[size]} ${
                style === 'primary' ? 'text-primary-text' : 'text-secondary-text'
              } ${radioMargin[size]}`}
            >
              <div className='RadioWrap relative mr-2 flex'>
                <input
                  id={radioValue}
                  className={`cursor-pointer appearance-none rounded-full transition-activity focus:outline-none ${afterStyle} ${
                    radioStyle[style]
                  } ${error ? 'error' : ''} ${errorStyle} ${radioSize[size]}`}
                  type='radio'
                  name={name}
                  value={radioValue}
                  onChange={(e) => onChange(e.target.value)}
                  checked={Boolean(value === radioValue)}
                  disabled={disabled}
                  {...rest}
                />
              </div>
              {radioLabel}
            </label>
          ))}
        </div>
      </Label>
    )
  }
)

Radio.displayName = 'Radio'
