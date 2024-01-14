import { getServerSession } from 'next-auth'
import { createUser } from '../_utils/actions'
import { authOptions } from '../../../api/auth/[...nextauth]/route'
import { redirect } from '@/src/navigation'
import { privateRoutes, routes } from '@/src/constants/routes'
import { getTranslations } from 'next-intl/server'
import Section from '@/src/components/atoms/common/Section'
import SignUpForm from './_components/SignUpForm'
import P from '@/src/components/atoms/typography/P'
import NextLink from '@/src/components/atoms/common/NextLink'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'signup' })
  return {
    title: t('metadata') + ' || Next 13 Template',
  }
}

export default async function SignUpPage() {
  const session = await getServerSession(authOptions)
  const t = await getTranslations('signup')

  if (session) {
    redirect(privateRoutes.profile)
  }
  return (
    <Section className='mx-auto w-full md:mt-20 md:w-[42rem]' title={t('title')}>
      <SignUpForm createUser={createUser} />
      <P className='mt-4'>
        {t('haveAccount')}{' '}
        <NextLink style='inline' href={routes.login}>
          {t('login')}
        </NextLink>
      </P>
    </Section>
  )
}
