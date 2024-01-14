'use client'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { adminRoutes, routes } from '@/src/constants/routes'
import { PasswordChangeInput, UserType } from '../../_utils/types'
import { useRouter } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { Session } from 'next-auth'
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
  session: Session | null
  updateUser: (user: UserType) => Promise<UserType>
  changePassword: (user: PasswordChangeInput) => Promise<UserType>
}

export default function UserProfile({ session, updateUser, changePassword }: Props) {
  const { push, refresh } = useRouter()
  const t = useTranslations('profile')
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isChangePassOpen, setIsChangePassOpen] = useState(false)

  const handleSignOut = () => {
    signOut({
      redirect: false,
    })
    push(routes.login)
    refresh()
  }

  if (!session) {
    return
  }

  return (
    <div className='flex w-full flex-col flex-wrap items-center justify-center md:flex-row'>
      <Avatar session={session} className='h-[7rem] w-[7rem] text-[3rem] font-bold' size='none' />
      <div className='my-6 md:ml-6 md:mr-14'>
        <Title type='h2' size='lg'>
          {session.user.name}
        </Title>
        <P>
          {t('email')}: {session.user.email}
        </P>
        <P>
          {t('role')}:{' '}
          {session.user.role === 'admin' ? (
            <NextLink style='inline' href={adminRoutes.admin}>
              Admin
            </NextLink>
          ) : (
            session.user.role
          )}
        </P>
      </div>
      <div className='flex flex-col'>
        <Button
          icon={<EditIcon />}
          size='sm'
          role='combobox'
          aria-haspopup='dialog'
          aria-expanded={isEditOpen}
          aria-controls='userEditModal'
          onClick={() => setIsEditOpen(true)}
        >
          {t('update.button')}
        </Button>
        <Button
          className='my-2'
          style='secondary'
          size='sm'
          icon={<LockIcon />}
          role='combobox'
          aria-haspopup='dialog'
          aria-expanded={isChangePassOpen}
          aria-controls='changePassModal'
          onClick={() => setIsChangePassOpen(true)}
        >
          {t('changePass.button')}
        </Button>
        <Button style='delete' size='sm' icon={<SignOutIcon />} onClick={handleSignOut}>
          {t('signout')}
        </Button>
      </div>
      <UpdateUserForm user={session.user} isOpen={isEditOpen} setIsOpen={setIsEditOpen} updateUser={updateUser} />
      <ChangePassForm
        user={session.user}
        isOpen={isChangePassOpen}
        setIsOpen={setIsChangePassOpen}
        changePassword={changePassword}
      />
    </div>
  )
}
