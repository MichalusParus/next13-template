import FormComponents from './FormComponents'
import Tabs from '@/src/components/molecules/popover/Tabs'
import IconComponents from './IconComponents'
import CommonComponents from './CommonComponents'
import TableComponents from './TableComponents'
import TypographyComponents from './TypographyComponents'
import PopoverComponents from './PopoverComponents'

export default function ComponentsPage() {
  const tabs = [
    { label: 'Common', slug: 'common', component: <CommonComponents /> },
    { label: 'Typography', slug: 'typography', component: <TypographyComponents /> },
    { label: 'Icons', slug: 'icons', component: <IconComponents /> },
    { label: 'Form', slug: 'form', component: <FormComponents /> },
    { label: 'Popovers', slug: 'popovers', component: <PopoverComponents /> },
    { label: 'Tables', slug: 'tables', component: <TableComponents /> },
  ]

  return (
    <div className='w-full'>
      <Tabs tabs={tabs} />
    </div>
  )
}
