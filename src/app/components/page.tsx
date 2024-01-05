import { Metadata } from 'next'
import FormComponents from './_components/FormComponents'
import Tabs from '@/src/components/molecules/popover/Tabs'
import IconComponents from './_components/IconComponents'
import CommonComponents from './_components/CommonComponents'
import TableComponents from './_components/TableComponents'
import TypographyComponents from './_components/TypographyComponents'
import PopoverComponents from './_components/PopoverComponents'

export const metadata: Metadata = {
  title: 'Components || Next 13 Template',
  description: 'Next 13 Template with tailwindCSS',
}

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
