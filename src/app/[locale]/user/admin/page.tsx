import { deleteUsers, getUsers } from '../_utils/actions'
import { getTranslations } from 'next-intl/server'
import Section from '@/src/components/atoms/common/Section'
import UsersTable from './_components/UsersTable'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'admin' })
  return {
    title: t('metadata') + ' || Next 13 Template',
  }
}

export default async function AdminPage() {
  const users = await getUsers()

  return (
    <Section className='mx-auto w-full md:mt-20 md:w-[42rem]' title='Admin'>
      <UsersTable users={users} deleteUsers={deleteUsers} />
    </Section>
  )
}
