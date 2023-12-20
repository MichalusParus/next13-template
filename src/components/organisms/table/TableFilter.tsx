import { ColumnsDef } from './types'
import { object } from 'yup'
import Button from '../../atoms/common/Button'
import Dropdown from '../../molecules/popover/Dropdown'
import FilterIcon from '../../atoms/icons/FilterIcon'
import Form from '../../molecules/form/Form'
import FormInput from '../../molecules/form/input/FormInput'
import SearchIcon from '../../atoms/icons/SearchIcon'
import Tooltip from '../../atoms/common/Tooltip'

type Props = {
  isOpen: boolean
  column: ColumnsDef
  style?: 'primary' | 'secondary' | 'none'
  setIsOpen: (value: boolean) => void
  onSubmit: (value: { filterBy: string }) => void
}

export default function TableFilter({ isOpen, column, style = 'primary', setIsOpen, onSubmit }: Props) {
  const initialValues = { filterBy: '' }
  const handleSubmit = (value: { filterBy: string }) => {
    onSubmit(value)
    setIsOpen(false)
  }

  const filterStyle = {
    primary: 'text-primary-text',
    secondary: 'text-secondary-text',
    none: '',
  }

  return (
    <Dropdown
      className='peer-hover:[&_.FilterButton]:opacity-100 peer-focus-visible:[&_.FilterButton]:opacity-100'
      type='left'
      isOpen={isOpen}
      style='none'
      size='sm'
      width='w-max'
      setIsOpen={setIsOpen}
      overlay
      hideChevron
      padding=' '
      isUnlocked
      dropdownButton={
        <Button
          className={`FilterButton opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 ${filterStyle[style]}`}
          style='none'
          size='sm'
          onClick={() => setIsOpen(!isOpen)}
          icon={<FilterIcon />}
        />
      }
    >
      <Form
        className='p-2'
        style={style}
        size='sm'
        initialValues={initialValues}
        validationSchema={object().shape({})}
        onSubmit={handleSubmit}
        hideError
        disabled={!isOpen}
      >
        <div className='flex min-w-[6rem]'>
          <FormInput
            className='w-full'
            name='filterBy'
            label='tableInputFilter'
            style={style}
            size='sm'
            placeholder={`Search in ${column.label}`}
            hideLabel
            hideError
            autoComplete='off'
          />
          <Button className='ml-3' type='submit' style={style} size={'sm'} icon={<SearchIcon />} />
        </div>
      </Form>
    </Dropdown>
  )
}
