import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Section from '../../components/atoms/common/Section'
import P from '../../components/atoms/typography/P'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: t('metadata') + ' || Next 13 Template',
    description: 'Next 13 Template with tailwindCSS',
  }
}

export default function HomePage() {
  const t = useTranslations('home')
  return (
    <Section className='min-h-[80vh]' title={t('title')}>
      <P align='text-center'>{t('info')} </P>
    </Section>
  )
}
