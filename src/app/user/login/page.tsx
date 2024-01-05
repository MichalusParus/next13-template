import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { privateRoutes, routes } from '@/src/constants/routes'
import { Metadata } from 'next'
import Section from '@/src/components/atoms/common/Section'
import LogInForm from './_components/LogInForm'
import NextLink from '@/src/components/atoms/common/NextLink'
import P from '@/src/components/atoms/typography/P'

export const metadata: Metadata = {
  title: 'Login || Next 13 Template',
  description: 'Next 13 Template with tailwindCSS',
}

export default async function LogInPage() {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    redirect(privateRoutes.profile)
  }

  return (
    <Section className='mx-auto w-full md:mt-20 md:w-[42rem]' title='Log In'>
      <LogInForm />
      <P className='mt-4'>
        Don&apos;t have an account?{' '}
        <NextLink style='inline' href={routes.signup}>
          Sign Up
        </NextLink>
      </P>
    </Section>
  )
}
