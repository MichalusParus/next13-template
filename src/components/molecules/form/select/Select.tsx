'use client'
import { forwardRef, useCallback, useState } from 'react'
import { Label, Props as LabelProps } from '../Label'
import Button from '../../../atoms/common/Button'
import Dropdown from '@/src/components/molecules/popover/Dropdown'

export type Props = Omit<LabelProps, 'htmlFor'> & {
  name: string
  type?: 'default' | 'top'
  value: string | number
  options: { label: string; value: string | number }[]
  style?: 'primary' | 'secondary' | 'none'
  placeholder?: string
  hideError?: boolean
  disabled?: boolean
  onChange: (value: any) => void
}

export const Select = forwardRef(
  (
    {
      className = '',
      name,
      type = 'default',
      label,
      value,
      options,
      style = 'primary',
      size = 'md',
      placeholder = label,
      description,
      hideLabel,
      hideError,
      disabled,
      error,
      onChange,
    }: Props,
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const sortedOptions = type === 'top' ? [...options].reverse() : options
    const selectedOption = options.find((option) => option.value === value)

    const handleOnChange = useCallback(
      (value: string | number) => {
        onChange(value)
        setIsOpen(false)
      },
      [onChange]
    )

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
        <Dropdown
          className={`${hideError ? '' : 'mb-1'} w-full`}
          isOpen={isOpen}
          type={`${type === 'top' ? 'top' : 'left'}`}
          title={selectedOption?.label || <div className='text-placeholder'>{placeholder}</div>}
          style={style}
          size={size}
          padding=' '
          overlay
          error={Boolean(error)}
          setIsOpen={setIsOpen}
        >
          <ul>
            {sortedOptions.map(({ value: optionValue, label }) => (
              <li key={optionValue}>
                <Button
                  onClick={() => handleOnChange(optionValue)}
                  className={`${optionValue === value ? 'selected' : ''}`}
                  style='menu'
                  size={size}
                >
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        </Dropdown>
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className='absolute appearance-none'
          tabIndex={-1}
        />
      </Label>
    )
  }
)

Select.displayName = 'Select'
