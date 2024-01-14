import { Session } from 'next-auth'
import ProfileIcon from '../icons/ProfileIcon'

type Props = {
  className?: string
  session: Session | null
  size?: 'sm' | 'md' | 'lg' | 'none'
}

export default function Avatar({ className, session, size = 'md' }: Props) {
  const avatarStyle = 'border-2 border-secondary-text bg-secondary-500 text-secondary-text'
  const avatarSize = {
    sm: 'h-[2.188rem] w-[2.188rem] text-md font-bold',
    md: 'h-[2.625rem] w-[2.625rem] text-lg font-bold',
    lg: 'h-[3.063rem] w-[3.063rem] text-xl font-bold',
    none: '',
  }

  if (!session) {
    return (
      <div
        className={`AvatarWrap ${className} relative flex items-center justify-center rounded-full ${avatarStyle} ${avatarSize[size]}`}
        aria-label='User Profile Link'
      >
        <ProfileIcon className='h-full w-full' />
      </div>
    )
  }

  const userInitials = session.user?.name?.split(' ').map((name) => name.slice(0, 1).toUpperCase())

  return (
    <div
      className={`AvatarWrap ${className} relative flex items-center justify-center rounded-full ${avatarStyle} ${avatarSize[size]}`}
      aria-label='User Profile Link'
    >
      {userInitials}
    </div>
  )
}
