'use client'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
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
    const listboxRef = useRef<any>(null)
    const buttonRef = useRef<any>(null)
    const [inputValue, setInputValue] = useState<string>('')
    const [isOpen, setIsOpen] = useState(false)
    const filteredOptions =
      inputValue === ''
        ? options
        : options.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()))

    const handleOnChange = useCallback(
      (target: string) => {
        const selectedOption = options.find(({ value }) => value === target) || options[0]
        onChange(selectedOption.value)
        setInputValue(selectedOption.label)
        setIsOpen(false)
        buttonRef.current.focus()
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

    // Focus Trap
    useEffect(() => {
      let index = -1
      const focusableEl = listboxRef.current.querySelectorAll('.AutoCompleteOption, .AutoCompleteCreate')
      buttonRef.current = document.activeElement
      const handleClick = (e: any) => {
        if (isOpen) {
          switch (e.keyCode) {
            case 40:
              e.preventDefault()
              if (index + 1 === focusableEl.length) {
                buttonRef.current.focus()
                index = -1
              } else {
                focusableEl[index + 1].focus()
                index++
              }
              break
            case 38:
              e.preventDefault()
              if (index <= 0) {
                buttonRef.current.focus()
                index = -1
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
        } else if (e.target.id === `AutoCompleteInput-${name}` && e.keyCode !== 9 && !e.shiftKey) {
          setIsOpen(true)
        }
      }
      window.addEventListener('keydown', handleClick)
      return () => {
        window.removeEventListener('keydown', handleClick)
      }
    }, [isOpen, inputValue, name, handleOnChange])

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
          className={`w-full`}
          isOpen={isOpen}
          type='left'
          style={style}
          overlay
          setIsOpen={setIsOpen}
          padding=' '
          dropdownButton={
            <div
              className={`AutoCompleteInputWrap relative w-full ${isOpen ? 'z-40' : 'z-20'}`}
              role='button'
              aria-haspopup='listbox'
              aria-expanded={isOpen}
              aria-controls={`${name}-listbox`}
              onClick={() => setIsOpen(true)}
              tabIndex={-1}
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
                onChange={(value: string) => setInputValue(value.trimStart())}
                role='combobox'
                autoComplete='off'
                aria-labelledby={`${name}-label`}
                aria-haspopup='listbox'
                aria-expanded={isOpen}
                aria-controls={`${name}-listbox`}
                aria-autocomplete='list'
              />
            </div>
          }
        >
          <ul id={`${name}-listbox`} ref={listboxRef} role='listbox' aria-labelledby={`${name}-label`}>
            <div className={`max-h-40 overflow-y-auto`}>
              {filteredOptions.map(({ value: optionValue, label }) => (
                <li
                  id={optionValue}
                  key={optionValue}
                  className='group focus:outline-none'
                  role='option'
                  aria-selected={optionValue === value}
                >
                  <Button
                    onClick={() => handleOnChange(optionValue)}
                    className={`AutoCompleteOption ${optionValue === value ? 'selected' : 'nooo'}`}
                    style='menu'
                    size={size}
                    disabled={disabled}
                  >
                    {label}
                  </Button>
                </li>
              ))}
            </div>
            {createNew ? (
              <>
                <div className='mx-auto h-0.5 w-[90%] bg-overlay' />
                <Button
                  className='AutoCompleteCreate'
                  style='menu'
                  size={size}
                  disabled={disabled}
                  tabIndex={-1}
                  onClick={createNew.handleCreate}
                >
                  {createNew.title}
                </Button>
              </>
            ) : null}
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
          autoComplete='off'
        />
      </Label>
    )
  }
)

AutoComplete.displayName = 'AutoComplete'
