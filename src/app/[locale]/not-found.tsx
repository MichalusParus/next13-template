import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'common' })
  return {
    title: t('notFound') + ' || Next 13 Template',
  }
}

export default async function NotFound() {
  const t = await getTranslations('common')
  return <div className='NotFoundWrap mt-16 text-center'>404 {t('notFound')}</div>
}
