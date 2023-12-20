import { InputHTMLAttributes, forwardRef, useCallback } from 'react'
import { Label, Props as LabelProps } from '../Label'
import CheckIcon from '../../../atoms/icons/CheckIcon'

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'style' | 'size' | 'onChange'>
export type Props = InputAttributes &
  Omit<LabelProps, 'htmlFor'> & {
    type?: 'row' | 'column' | 'fake'
    name: string
    value: string[]
    options: { label: string; value: string }[]
    style?: 'primary' | 'secondary' | 'none'
    disabled?: boolean
    onChange: (value: string[]) => void
  }

export const Checkbox = forwardRef(
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
      hideError,
      disabled,
      error,
      onChange,
      ...rest
    }: Props,
    ref
  ) => {
    const isChecked = useCallback(
      (checkboxValue: string) => {
        return value.includes(checkboxValue)
      },
      [value]
    )

    const handleOnChange = useCallback(
      (checkboxValue: string) => {
        if (isChecked(checkboxValue)) {
          onChange(value.filter((v) => v !== checkboxValue))
        } else {
          onChange([...value, checkboxValue])
        }
      },
      [value, isChecked, onChange]
    )

    const checkboxStyle = {
      primary:
        'border border-border bg-primary-500 text-primaryInput-text shadow-active ' +
        'hover:bg-primary-700 hover:text-primary-textHover hover:shadow-active ' +
        'focus-visible:bg-primary-700 focus-visible:text-primary-textActive focus-visible:shadow-active ' +
        'active:bg-primary-700 active:text-primary-textActive active:shadow-active ' +
        'checked:bg-primary-700 checked:text-primary-textActive checked:shadow-active ' +
        '[&.checked]:bg-primary-700 [&.checked]:text-primary-textActive [&.checked]:shadow-active ' +
        'disabled:border-zinc-800 disabled:bg-zinc-400 disabled:text-zinc-800 disabled:shadow-none disabled:cursor-not-allowed ',
      secondary:
        'border border-border bg-secondary-500 text-secondary-text shadow-active ' +
        'hover:bg-secondary-700 hover:text-secondary-textHover hover:shadow-active ' +
        'focus-visible:bg-secondary-700 focus-visible:text-secondary-textActive focus-visible:shadow-active ' +
        'active:bg-secondary-700 active:text-secondary-textActive active:shadow-active ' +
        'checked:bg-secondary-700 checked:text-secondary-textActive checked:shadow-active ' +
        '[&.checked]:bg-secondary-700 [&.checked]:text-secondary-textActive [&.checked]:shadow-active ' +
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
    const checkboxSize = {
      sm: 'w-6 h-6',
      md: 'w-7 h-7',
      lg: 'w-8 h-8',
      none: '',
    }
    const checkboxMargin = {
      sm: 'mr-3 mb-1',
      md: 'mr-4 mb-2',
      lg: 'mr-5 mb-3',
      none: '',
    }

    if (type === 'fake') {
      return (
        <div
          className={`relative cursor-pointer appearance-none rounded-lg focus:outline-none ${
            isChecked(options[0].value) ? 'checked' : ''
          } ${checkboxStyle[style]} ${error ? 'error' : ''} ${errorStyle} ${checkboxSize[size]}`}
        >
          <CheckIcon
            className={`absolute -left-[1px] -top-[1px] z-10 cursor-pointer ${
              style === 'secondary' ? 'text-secondary-text' : 'text-primary-text'
            } ${checkboxSize[size]} ${isChecked(options[0].value) ? 'block' : 'hidden'}`}
          />
        </div>
      )
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
        <div className={`CheckboxWrap flex flex-wrap ${type === 'column' ? 'flex-col' : ''}`}>
          {options.map(({ value: checkboxValue, label: checkboxlabel }) => (
            <label
              key={checkboxValue}
              htmlFor={checkboxValue}
              className={`relative flex cursor-pointer items-center disabled:cursor-not-allowed ${
                checkboxlabel === '' ? '' : checkboxMargin[size]
              } ${style === 'primary' ? 'text-primary-text' : 'text-secondary-text'} ${labelSize[size]}`}
            >
              <input
                className={`cursor-pointer appearance-none rounded-lg transition-activity focus:outline-none ${
                  checkboxStyle[style]
                } ${error ? 'error' : ''} ${errorStyle} ${checkboxSize[size]} ${checkboxlabel === '' ? '' : 'mr-2 '}`}
                type='checkbox'
                id={checkboxValue}
                name={checkboxValue}
                value={checkboxValue}
                onChange={(e) => handleOnChange(e.target.value)}
                checked={isChecked(checkboxValue)}
                disabled={disabled}
                {...rest}
              />
              <CheckIcon
                className={`absolute left-0 top-0 z-10 cursor-pointer transition-opacity disabled:block disabled:cursor-not-allowed  ${
                  style === 'primary' ? 'text-primary-text' : 'text-secondary-text'
                } ${checkboxSize[size]} ${isChecked(checkboxValue) ? 'visible opacity-100' : 'invisible opacity-0'}`}
              />
              {checkboxlabel}
            </label>
          ))}
        </div>
      </Label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
