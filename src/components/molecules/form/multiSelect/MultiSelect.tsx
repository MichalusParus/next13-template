'use client'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { Label, Props as LabelProps } from '../Label'
import { Checkbox } from '../checkbox/Checkbox'
import { Button } from '../../../atoms/common/Button'
import Dropdown from '@/src/components/molecules/popover/Dropdown'

export type Props = Omit<LabelProps, 'htmlFor'> & {
  name: string
  type?: 'default' | 'top'
  value: any[]
  options: { label: string; value: any }[]
  style?: 'primary' | 'secondary' | 'none'
  placeholder?: string
  hideError?: boolean
  disabled?: boolean
  onChange: (value: any[]) => void
}

export const MultiSelect = forwardRef(
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
    const comboboxRef = useRef<HTMLButtonElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const sortedOptions = type === 'top' ? [...options].reverse() : options
    const selectedOptions = options.filter((option) => value.includes(option.value))
    const comboboxTitle = selectedOptions.length ? (
      <>
        {selectedOptions.map((option) => {
          return (
            <span className='mr-2' key={option.value}>
              {option.label}
            </span>
          )
        })}
      </>
    ) : (
      <div className='text-placeholder'>{placeholder}</div>
    )

    const handleOnChange = useCallback(
      (v: string) => {
        const newValues = value.includes(v) ? value.filter((val) => val !== v) : [...value, v]
        onChange(newValues)
      },
      [onChange, value]
    )

    // Focus Trap
    useEffect(() => {
      if (isOpen) {
        let index = -1
        const focusableEl = listboxRef.current.querySelectorAll('.SelectOption')
        const handleClick = (e: any) => {
          switch (e.keyCode) {
            case 40:
              e.preventDefault()
              if (index + 1 === focusableEl.length) {
                comboboxRef.current?.focus()
                index = -1
              } else {
                focusableEl[index + 1].focus()
                index++
              }
              break
            case 38:
              e.preventDefault()
              if (index === -1) {
                focusableEl[focusableEl.length - 1].focus()
                index = focusableEl.length - 1
              } else if (index === 0) {
                comboboxRef.current?.focus()
                index = -1
              } else {
                focusableEl[index - 1].focus()
                index--
              }
              break
            case 27:
              e.preventDefault()
              comboboxRef.current?.focus()
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
          title={comboboxTitle}
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
              ref={comboboxRef}
              aria-labelledby={`${name}-label`}
              aria-haspopup='listbox'
              aria-expanded={isOpen}
              aria-controls={`${name}-listbox`}
            >
              <div className='flex w-full justify-start'>{comboboxTitle}</div>
            </Button>
          }
        >
          <ul id={`${name}-listbox`} role='listbox' aria-labelledby={`${name}-label`} ref={listboxRef}>
            {sortedOptions.map(({ value: optionValue, label }) => (
              <li
                key={optionValue}
                className='group focus:outline-none'
                role='option'
                aria-selected={optionValue === value}
              >
                <Button
                  className={`SelectOption ${optionValue === value ? 'selected' : ''}`}
                  style='menu'
                  size={size}
                  onClick={() => handleOnChange(optionValue)}
                >
                  <div className='flex w-full items-center'>
                    <Checkbox
                      className='mr-4'
                      type='fake'
                      name={optionValue}
                      label={label}
                      value={value}
                      options={[{ label: label, value: optionValue }]}
                      hideLabel
                      hideError
                      onChange={() => {}}
                    />
                    {label}
                  </div>
                </Button>
              </li>
            ))}
          </ul>
        </Dropdown>
        <select
          id={name}
          className='absolute appearance-none opacity-0'
          name={name}
          value={value}
          multiple={true}
          onChange={(value) => onChange([value])}
          disabled={disabled}
          tabIndex={-1}
        />
      </Label>
    )
  }
)

MultiSelect.displayName = 'MultiSelect'
