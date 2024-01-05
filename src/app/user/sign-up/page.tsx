import { getServerSession } from 'next-auth'
import { createUser } from '../_utils/actions'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { privateRoutes, routes } from '@/src/constants/routes'
import { Metadata } from 'next'
import Section from '@/src/components/atoms/common/Section'
import SignUpForm from './_components/SignUpForm'
import P from '@/src/components/atoms/typography/P'
import NextLink from '@/src/components/atoms/common/NextLink'

export const metadata: Metadata = {
  title: 'Signup || Next 13 Template',
  description: 'Next 13 Template with tailwindCSS',
}

export default async function SignUpPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect(privateRoutes.profile)
  }
  return (
    <Section className='mx-auto w-full md:mt-20 md:w-[42rem]' title='Create your account'>
      <SignUpForm createUser={createUser} />
      <P className='mt-4'>
        Already have an account?{' '}
        <NextLink style='inline' href={routes.login}>
          Log In
        </NextLink>
      </P>
    </Section>
  )
}
