import { getServerSession } from 'next-auth'
import { authOptions } from '../../../api/auth/[...nextauth]/route'
import { redirect } from '@/src/navigation'
import { privateRoutes, routes } from '@/src/constants/routes'
import { getTranslations } from 'next-intl/server'
import Section from '@/src/components/atoms/common/Section'
import LogInForm from './_components/LogInForm'
import NextLink from '@/src/components/atoms/common/NextLink'
import P from '@/src/components/atoms/typography/P'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'login' })
  return {
    title: t('metadata') + ' || Next 13 Template',
  }
}

export default async function LogInPage() {
  const session = await getServerSession(authOptions)
  const t = await getTranslations('login')

  if (session?.user) {
    redirect(privateRoutes.profile)
  }

  return (
    <Section className='mx-auto w-full md:mt-20 md:w-[42rem]' title={t('title')}>
      <LogInForm />
      <P className='mt-4'>
        {t('noAccount')}{' '}
        <NextLink style='inline' href={routes.signup}>
          {t('signup')}
        </NextLink>
      </P>
    </Section>
  )
}
