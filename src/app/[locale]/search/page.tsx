import Section from '@/src/components/atoms/common/Section'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'search' })
  return {
    title: t('metadata') + ' || Next 13 Template',
  }
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {
  const t = await getTranslations('search')

  return <Section title={t('title') + ' ' + searchParams.search}>Future result</Section>
}
