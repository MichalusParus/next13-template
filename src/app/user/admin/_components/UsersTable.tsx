'use client'
import Table from '@/src/components/organisms/table/Table'
import { UserType } from '../../_utils/types'
import { RowDef } from '@/src/components/organisms/table/types'
import { useServerAction } from '@/src/utils/hooks/useServerAction'
import { useRouter } from 'next/navigation'
import { privateRoutes } from '@/src/constants/routes'

type Props = {
  users: UserType[]
  deleteUsers: (ids: string[]) => Promise<any>
}

export default function UsersTable({ users, deleteUsers }: Props) {
  const router = useRouter()
  const { action } = useServerAction(deleteUsers)
  const usersColumns = [
    {
      label: 'Users',
      name: 'usera',
      width: 'auto',
      columns: [
        {
          label: 'Name',
          name: 'name',
          width: 'auto',
        },
        {
          label: 'Email',
          name: 'email',
          width: 'auto',
        },
        {
          label: 'Role',
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
        multiselect={{ submitLabel: 'Delete Users', handleMultiselect: handleMultiselect }}
      />
    </div>
  )
}
