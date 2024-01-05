import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { routes } from '@/src/constants/routes'
import { redirect } from 'next/navigation'
import { changePassword, updateUser } from '../_utils/actions'
import { Metadata } from 'next'
import UserProfile from './_components/UserProfile'
import Section from '@/src/components/atoms/common/Section'

export const metadata: Metadata = {
  title: 'Profile || Next 13 Template',
  description: 'Next 13 Template with tailwindCSS',
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(routes.login)
  }

  return (
    <Section className='mx-auto w-full md:mt-20 md:w-[45rem]' title='User profile'>
      <UserProfile user={session.user} updateUser={updateUser} changePassword={changePassword} />
    </Section>
  )
}
