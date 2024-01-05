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
    (value: { searchItem: string }) => {
      if (onSubmit) {
        onSubmit(value.searchItem)
      } else {
        push(`/search?search=${value.searchItem}`)
      }
    },
    [onSubmit, push]
  )

  return (
    <Form
      className={`${className} relative flex `}
      initialValues={{ searchItem: '' }}
      validationSchema={object().shape({})}
      style='none'
      hideError
      role='search'
      onSubmit={handleOnSubmit}
    >
      <FormInput
        name={'searchItem'}
        label='search'
        type='search'
        style='secondary'
        size='sm'
        placeholder={placeholder}
        hideLabel
        hideError
        required
      />
      <Button className='absolute right-0' type='submit' size='sm' icon={<SearchIcon />} />
    </Form>
  )
}
