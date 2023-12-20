'use client'
import { useState } from 'react'
import { Input } from '../../molecules/form/input/Input'
import Button from '../../atoms/common/Button'
import SearchIcon from '../../atoms/icons/SearchIcon'

type Props = {
  className?: string
}

export default function SearchForm({ className = 'search-form' }: Props) {
  const [value, setValue] = useState('')

  return (
    <form className={`${className} relative flex `} action={`/search?search=${value}`}>
      <Input
        className={``}
        name='search'
        label='search'
        type='search'
        value={value}
        style='secondary'
        size='sm'
        placeholder={'Search...'}
        onChange={setValue}
        hideLabel
        hideError
        required
      />
      <Button className='absolute right-0' type='submit' size='sm' icon={<SearchIcon />} />
    </form>
  )
}
