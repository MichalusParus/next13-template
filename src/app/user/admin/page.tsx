import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { Metadata } from 'next'
import { routes } from '@/src/constants/routes'
import { redirect } from 'next/navigation'
import { deleteUsers, getUsers } from '../_utils/actions'
import Section from '@/src/components/atoms/common/Section'
import UsersTable from './_components/UsersTable'

export const metadata: Metadata = {
  title: 'Admin || Next 13 Template',
  description: 'Next 13 Template with tailwindCSS',
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (session?.user.role !== 'admin') {
    redirect(routes.login)
  }

  const users = await getUsers()

  return (
    <Section className='mx-auto w-full md:mt-20 md:w-[42rem]' title='Admin'>
      <UsersTable users={users} deleteUsers={deleteUsers} />
    </Section>
  )
}
