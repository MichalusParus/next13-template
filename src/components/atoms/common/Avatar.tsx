import ProfileIcon from '../icons/ProfileIcon'
import NextImage from './NextImage'

type Props = {
  className?: string
  userName?: string
  size?: 'sm' | 'md' | 'lg' | 'none'
  src?: string
}

export default function Avatar({ className, userName, size = 'md', src }: Props) {
  const userInitials = userName?.split(' ').map((name) => name.slice(0, 1).toUpperCase())

  const avatarStyle = 'border-2 border-secondary-text bg-secondary-500 text-secondary-text'
  const avatarSize = {
    sm: 'h-[2.188rem] w-[2.188rem] text-md font-bold',
    md: 'h-[2.625rem] w-[2.625rem] text-lg font-bold',
    lg: 'h-[3.063rem] w-[3.063rem] text-xl font-bold',
    none: '',
  }

  if (!userName && !src) {
    return (
      <div
        className={`AvatarWrap ${className} relative flex items-center justify-center rounded-full ${avatarStyle} ${avatarSize[size]}`}
      >
        <ProfileIcon className='h-full w-full' />
      </div>
    )
  }

  return (
    <div
      className={`AvatarWrap ${className} relative flex items-center justify-center rounded-full ${avatarStyle} ${avatarSize[size]}`}
    >
      {src ? <NextImage src={src} alt='profil' ratio={100} width={'100%'} /> : userInitials}
    </div>
  )
}
