'use client'
import Table from '@/src/components/organisms/table/Table'
import { UserType } from '../../_utils/types'
import { RowDef } from '@/src/components/organisms/table/types'
import { useServerAction } from '@/src/utils/hooks/useServerAction'
import { useRouter } from '@/src/navigation'
import { privateRoutes } from '@/src/constants/routes'
import { useTranslations } from 'next-intl'

type Props = {
  users: UserType[]
  deleteUsers: (ids: string[]) => Promise<any>
}

export default function UsersTable({ users, deleteUsers }: Props) {
  const router = useRouter()
  const t = useTranslations('admin')
  const { action } = useServerAction(deleteUsers)
  const usersColumns = [
    {
      label: t('users'),
      name: 'usera',
      width: 'auto',
      columns: [
        {
          label: t('name'),
          name: 'name',
          width: 'auto',
        },
        {
          label: t('email'),
          name: 'email',
          width: 'auto',
        },
        {
          label: t('role'),
          name: 'role',
          width: 'auto',
        },
      ],
    },
  ]

  const handleMultiselect = (values: RowDef[]) => {
    const ids = values.map((v) => v._id)
    action(ids)
    router.push(privateRoutes.profile)
  }

  return (
    <div className='relative'>
      <Table
        name='usersTable'
        columns={usersColumns}
        rows={users}
        multiselect={{ submitLabel: t('deleteUsers'), handleMultiselect: handleMultiselect }}
      />
    </div>
  )
}
