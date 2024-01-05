'use client'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { adminRoutes, routes } from '@/src/constants/routes'
import { PasswordChangeInput, UserType } from '../../_utils/types'
import { useRouter } from 'next/navigation'
import SignOutIcon from '@/src/components/atoms/icons/SignOutIcon'
import Button from '@/src/components/atoms/common/Button'
import Avatar from '@/src/components/atoms/common/Avatar'
import Title from '@/src/components/atoms/typography/Title'
import P from '@/src/components/atoms/typography/P'
import UpdateUserForm from './UpdateUserForm'
import ChangePassForm from './ChangePassForm'
import LockIcon from '@/src/components/atoms/icons/LockIcon'
import EditIcon from '@/src/components/atoms/icons/EditIcon'
import NextLink from '@/src/components/atoms/common/NextLink'

type Props = {
  user: UserType
  updateUser: (user: UserType) => Promise<UserType>
  changePassword: (user: PasswordChangeInput) => Promise<UserType>
}

export default function UserProfile({ user, updateUser, changePassword }: Props) {
  const { push } = useRouter()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isChangePassOpen, setIsChangePassOpen] = useState(false)

  const handleSignOut = () => {
    signOut({
      redirect: false,
    })
    push(routes.login)
  }

  return (
    <div className='flex w-full flex-col flex-wrap items-center justify-center md:flex-row'>
      <Avatar className='h-[7rem] w-[7rem] text-[3rem] font-bold' size='none' />
      <div className='my-6 md:ml-6 md:mr-14'>
        <Title type='h5' size='lg'>
          {user.name}
        </Title>
        <P>Email: {user.email}</P>
        <P>
          Role:{' '}
          {user.role === 'admin' ? (
            <NextLink style='inline' href={adminRoutes.admin}>
              Admin
            </NextLink>
          ) : (
            user.role
          )}
        </P>
      </div>
      <div className='flex flex-col'>
        <Button icon={<EditIcon />} size='sm' onClick={() => setIsEditOpen(true)}>
          Update Info
        </Button>
        <Button
          className='my-2'
          style='secondary'
          size='sm'
          icon={<LockIcon />}
          onClick={() => setIsChangePassOpen(true)}
        >
          Change Pass
        </Button>
        <Button style='delete' size='sm' icon={<SignOutIcon />} onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
      <UpdateUserForm user={user} isOpen={isEditOpen} setIsOpen={setIsEditOpen} updateUser={updateUser} />
      <ChangePassForm
        user={user}
        isOpen={isChangePassOpen}
        setIsOpen={setIsChangePassOpen}
        changePassword={changePassword}
      />
    </div>
  )
}
