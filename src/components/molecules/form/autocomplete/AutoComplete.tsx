'use client'
import { forwardRef, useCallback, useEffect, useState } from 'react'
import { Label, Props as LabelProps } from '../Label'
import { Input } from '../input/Input'
import Button from '../../../atoms/common/Button'
import Dropdown from '@/src/components/molecules/popover/Dropdown'

export type Props = Omit<LabelProps, 'htmlFor'> & {
  name: string
  value: string
  options: { label: string; value: string }[]
  style?: 'primary' | 'secondary' | 'none'
  placeholder?: string
  hideError?: boolean
  disabled?: boolean
  createNew?: { title: string; handleCreate: () => void }
  onChange: (value: any) => void
}

export const AutoComplete = forwardRef(
  (
    {
      className = '',
      name,
      label,
      value,
      options,
      style = 'primary',
      size = 'md',
      placeholder = label,
      description,
      error,
      hideLabel,
      hideError,
      disabled,
      createNew,
      onChange,
    }: Props,
    ref
  ) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [isOpen, setIsOpen] = useState(false)
    const filteredOptions =
      inputValue === ''
        ? options
        : options.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()))

    const handleChange = useCallback(
      (target: string) => {
        const selectedOption = options.find(({ value }) => value === target) || options[0]
        onChange(selectedOption.value)
        setInputValue(selectedOption.label)
        setIsOpen(false)
      },
      [onChange, options]
    )

    useEffect(() => {
      if (value === '') {
        setInputValue('')
      }
    }, [value])

    useEffect(() => {
      if (!isOpen && value && inputValue === '') {
        onChange(undefined)
      }
      if (!isOpen && value && inputValue !== '') {
        const selectedLabel = options.find((option) => option.value === value)!.label
        setInputValue(selectedLabel)
      }
    }, [isOpen, inputValue, options, value, onChange])

    useEffect(() => {
      const handleClick = (e: any) => {
        if (e.target.id === `AutoCompleteInput-${name}`) {
          setIsOpen(true)
        }
      }
      window.addEventListener('keydown', handleClick)
      return () => {
        window.removeEventListener('keydown', handleClick)
      }
    }, [name])

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
          className={`w-full`}
          isOpen={isOpen}
          type='left'
          style={style}
          overlay
          setIsOpen={setIsOpen}
          padding=' '
          role='combobox'
          dropdownButton={
            <div
              className={`AutoCompleteInputWrap relative w-full ${isOpen ? 'z-40' : 'z-20'}`}
              onClick={() => setIsOpen(true)}
            >
              <Input
                className='mb-1'
                id={`AutoCompleteInput-${name}`}
                name={`AutoCompleteInput-${name}`}
                label='AutoCompleteInput'
                value={inputValue}
                style={style}
                size={size}
                placeholder={placeholder}
                disabled={disabled}
                error={error}
                hideLabel
                hideError
                onChange={setInputValue}
                autoComplete='off'
              />
            </div>
          }
        >
          <ul className={`max-h-40 overflow-y-auto`}>
            {filteredOptions.map(({ value: optionValue, label }) => (
              <li key={optionValue} role='option' aria-selected={optionValue === value}>
                <Button
                  onClick={() => handleChange(optionValue)}
                  className={`${optionValue === value ? 'selected' : 'nooo'}`}
                  style='menu'
                  size={size}
                  disabled={disabled}
                >
                  {label}
                </Button>
              </li>
            ))}
          </ul>
          {createNew ? (
            <>
              <div className='mx-auto h-0.5 w-[90%] bg-overlay' />
              <Button
                className='AutoCompleteCreate'
                style='menu'
                size={size}
                disabled={disabled}
                onClick={createNew.handleCreate}
              >
                {createNew.title}
              </Button>
            </>
          ) : null}
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

AutoComplete.displayName = 'AutoComplete'
