'use client'
import { useSearchParams } from 'next/navigation'
import { slugify } from '@/src/components/utils/utils'
import FormComponents from './FormComponents'
import Tabs from '@/src/components/molecules/Tabs'
import IconComponents from './IconComponents'
import CommonComponents from './CommonComponents'
import TableComponents from './TableComponents'
import TypographyComponents from './TypographyComponents'
import PopoverComponents from './PopoverComponents'

export default function ComponentsPage() {
  const tabs = ['Common', 'Typography', 'Icons', 'Form', 'Popovers', 'Tables']
  const searchParams = useSearchParams().get('tab')
  const selectedTab = tabs.find((tab) => slugify(tab) === searchParams)
  return (
    <div className='w-full'>
      <Tabs tabs={tabs} />
      {(selectedTab === 'Typography' || !selectedTab) && <TypographyComponents />}
      {selectedTab === 'Form' && <FormComponents />}
      {selectedTab === 'Popovers' && <PopoverComponents />}
      {selectedTab === 'Icons' && <IconComponents />}
      {selectedTab === 'Common' && <CommonComponents />}
      {selectedTab === 'Tables' && <TableComponents />}
    </div>
  )
}
