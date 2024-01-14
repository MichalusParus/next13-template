'use client'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
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
    const listboxRef = useRef<any>(null)
    const buttonRef = useRef<any>(null)
    const [isOpen, setIsOpen] = useState(false)
    const sortedOptions = type === 'top' ? [...options].reverse() : options
    const selectedOption = options.find((option) => option.value === value)

    const handleOnChange = useCallback(
      (value: string | number) => {
        buttonRef.current.focus()
        onChange(value)
        setIsOpen(false)
      },
      [onChange]
    )

    // Focus Trap
    useEffect(() => {
      if (isOpen) {
        let index = -1
        const focusableEl = listboxRef.current.querySelectorAll('.SelectOption')
        buttonRef.current = document.activeElement
        const handleClick = (e: any) => {
          switch (e.keyCode) {
            case 40:
              e.preventDefault()
              if (index + 1 === focusableEl.length) {
                focusableEl[0].focus()
                index = 0
              } else {
                focusableEl[index + 1].focus()
                index++
              }
              break
            case 38:
              e.preventDefault()
              if (index <= 0) {
                focusableEl[focusableEl.length - 1].focus()
                index = focusableEl.length - 1
              } else {
                focusableEl[index - 1].focus()
                index--
              }
              break
            case 27:
              e.preventDefault()
              buttonRef.current.focus()
              setIsOpen(false)
              break
            case 9:
              e.preventDefault()
              break
            default:
              break
          }
        }
        window.addEventListener('keydown', handleClick)
        return () => {
          window.removeEventListener('keydown', handleClick)
        }
      }
    }, [isOpen, handleOnChange])

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
          dropdownButton={
            <Button
              className={`DropdownButton relative w-full justify-between pr-8 ${isOpen ? 'selected' : ''} ${
                error ? 'error' : ''
              }`}
              onClick={() => setIsOpen(!isOpen)}
              style={style}
              size={size}
              role='combobox'
              aria-labelledby={`${name}-label`}
              aria-haspopup='listbox'
              aria-expanded={isOpen}
              aria-controls={`${name}-listbox`}
            >
              {selectedOption?.label || <div className='text-placeholder'>{placeholder}</div>}
            </Button>
          }
        >
          <ul id={`${name}-listbox`} role='listbox' aria-labelledby={`${name}-label`} ref={listboxRef}>
            {sortedOptions.map(({ value: optionValue, label }) => (
              <li
                className='group focus:outline-none'
                key={optionValue}
                role='option'
                aria-selected={optionValue === value}
              >
                <Button
                  className={`SelectOption ${optionValue === value ? 'selected' : ''}`}
                  style='menu'
                  size={size}
                  onClick={() => handleOnChange(optionValue)}
                >
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        </Dropdown>
        <select
          id={name}
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
