'use client'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { object } from 'yup'
import Button from '../../atoms/common/Button'
import SearchIcon from '../../atoms/icons/SearchIcon'
import Form from './Form'
import FormInput from './input/FormInput'

type Props = {
  className?: string
  placeholder?: string
  onSubmit?: (value: string) => void
}

export default function SearchBar({ className = '', placeholder = '', onSubmit }: Props) {
  const { push } = useRouter()

  const handleOnSubmit = useCallback(
    (value: { search: string }) => {
      if (onSubmit) {
        onSubmit(value.search)
      } else {
        push(`/search?search=${value.search}`)
      }
    },
    [onSubmit, push]
  )

  return (
    <Form
      className={`${className} relative flex `}
      initialValues={{ search: '' }}
      validationSchema={object().shape({})}
      style='none'
      hideError
      role='search'
      onSubmit={handleOnSubmit}
    >
      <FormInput
        className={``}
        name='search'
        label='search'
        type='search'
        style='secondary'
        size='sm'
        placeholder={placeholder}
        hideLabel
        hideError
        required
        role='searchbox'
      />
      <Button className='absolute right-0' type='submit' size='sm' icon={<SearchIcon />} />
    </Form>
  )
}
