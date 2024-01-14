import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import FormComponents from './_components/FormComponents'
import Tabs from '@/src/components/molecules/popover/Tabs'
import IconComponents from './_components/IconComponents'
import CommonComponents from './_components/CommonComponents'
import TableComponents from './_components/TableComponents'
import TypographyComponents from './_components/TypographyComponents'
import PopoverComponents from './_components/PopoverComponents'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'components' })
  return {
    title: t('metadata') + ' || Next 13 Template',
  }
}

export default function ComponentsPage() {
  const t = useTranslations('components')
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
      <Tabs name={t('navLabel')} tabs={tabs} />
    </div>
  )
}
