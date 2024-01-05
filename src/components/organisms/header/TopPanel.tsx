'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { privateRoutes, routes } from '@/src/constants/routes'
import { useSession } from 'next-auth/react'
import Logo from './Logo'
import NavBar from './NavBar'
import SearchBar from '../../molecules/form/SearchBar'
import Drawer from '../../molecules/popover/Drawer'
import Hamburger from '../../atoms/common/Hamburger'
import NextLink from '../../atoms/common/NextLink'
import Avatar from '../../atoms/common/Avatar'

export default function TopPanel() {
  const pathName = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathName])

  return (
    <header
      className={`flex h-headerHeight w-full items-center border-b border-border bg-primary-500 py-4 pr-2 shadow-button`}
    >
      <div className='mx-6 flex w-full max-w-contentSize items-center justify-between md:mx-10 xl:mx-14 2xl:mx-auto'>
        <div className='flex items-center'>
          <Drawer
            className='mr-4 md:hidden'
            isOpen={isMenuOpen}
            top='top-headerHeight'
            height='h-mainHeight'
            width='w-1/2'
            padding='0px'
            setIsOpen={setIsMenuOpen}
            drawerButton={<Hamburger isOpen={isMenuOpen} onClick={setIsMenuOpen} />}
            role={'menu'}
          >
            <SearchBar className='mx-4 flex pb-2 pt-4' placeholder='Search...' />
            <NavBar menu onClick={setIsMenuOpen} session={session || undefined} />
          </Drawer>
          <Logo />
          <NavBar className={'hidden md:flex'} session={session || undefined} />
        </div>
        <div className='flex items-center'>
          <SearchBar className='mr-4 hidden md:flex' placeholder='Search...' />
          <NextLink
            icon={<Avatar size='sm' />}
            style='none'
            size='none'
            href={session ? privateRoutes.profile : routes.login}
          />
        </div>
      </div>
    </header>
  )
}
