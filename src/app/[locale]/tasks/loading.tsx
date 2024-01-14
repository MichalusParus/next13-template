import { useTranslations } from 'next-intl'
import Loader from '@/src/components/atoms/common/Loader'
import Section from '@/src/components/atoms/common/Section'
import Tabs from '@/src/components/molecules/popover/Tabs'

export default function Loading() {
  const t = useTranslations('tasks')
  const tabs = [
    {
      label: t('in-progress'),
      slug: 'in-progress',
      component: (
        <Section className='mt-4 min-h-[70vh] w-full'>
          <Loader className='mt-[20%]' />
        </Section>
      ),
    },
    {
      label: t('to-do'),
      slug: 'to-do',
      component: <></>,
    },
    {
      label: t('completed'),
      slug: 'completed',
      component: <></>,
    },
    {
      label: t('backlog'),
      slug: 'backlog',
      component: <></>,
    },
    {
      label: '+ ' + t('create.title'),
      slug: 'form',
      component: <></>,
    },
  ]

  return <Tabs name={t('navLabel')} tabs={tabs} />
}
