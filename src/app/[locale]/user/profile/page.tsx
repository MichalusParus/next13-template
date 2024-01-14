import { getServerSession } from 'next-auth'
import { authOptions } from '../../../api/auth/[...nextauth]/route'
import { changePassword, updateUser } from '../_utils/actions'
import { getTranslations } from 'next-intl/server'
import UserProfile from './_components/UserProfile'
import Section from '@/src/components/atoms/common/Section'
import UserSettings from './_components/UserSettings'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'profile' })
  return {
    title: t('metadata') + ' || Next 13 Template',
  }
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  const t = await getTranslations('profile')

  return (
    <Section className='mx-auto w-full md:mt-20 md:w-[45rem]' title={t('title')}>
      <UserProfile session={session} updateUser={updateUser} changePassword={changePassword} />
      <UserSettings />
    </Section>
  )
}
