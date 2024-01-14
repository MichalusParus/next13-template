'use client'
import { useEffect, useState } from 'react'
import { usePathname } from '@/src/navigation'
import { privateRoutes, routes } from '@/src/constants/routes'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'
import Logo from './Logo'
import NavBar from './NavBar'
import SearchBar from '../../molecules/form/SearchBar'
import Drawer from '../../molecules/popover/Drawer'
import Hamburger from '../../atoms/common/Hamburger'
import NextLink from '../../atoms/common/NextLink'
import Avatar from '../../atoms/common/Avatar'

type Props = {
  session: Session | null
}

export default function TopPanel({ session }: Props) {
  const pathName = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations()
  const navLinks = [
    {
      slug: routes.home,
      title: t('home.navLabel'),
    },
    {
      slug: routes.about,
      title: t('about.navLabel'),
    },
    {
      slug: privateRoutes.components,
      title: t('components.navLabel'),
      private: true,
    },
    {
      slug: privateRoutes.tasks,
      title: t('tasks.navLabel'),
      private: true,
    },
  ]
  const filteredNavLinks = session ? navLinks : navLinks.filter((link) => !link.private)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathName])

  return (
    <header
      className={`flex h-headerHeight w-full items-center border-b border-border bg-primary-500 py-4 pr-2 shadow-button`}
    >
      <div className='mx-2 flex w-full max-w-contentSize items-center justify-between md:mx-6 xl:mx-14 2xl:mx-auto'>
        <div className='flex items-center'>
          <Drawer
            className='ml-2 mr-4 md:hidden'
            isOpen={isMenuOpen}
            top='top-headerHeight'
            height='h-mainHeight'
            width='w-1/2'
            padding='0px'
            setIsOpen={setIsMenuOpen}
            drawerButton={<Hamburger isOpen={isMenuOpen} onClick={setIsMenuOpen} />}
          >
            <div id='hamburgerMenu'>
              <SearchBar className='mx-4 flex pb-2 pt-4' placeholder={`${t('search.search')}...`} menu />
              <NavBar label={t('common.navigation')} menu onClick={setIsMenuOpen} navLinks={filteredNavLinks} />
            </div>
          </Drawer>
          <Logo />
          <NavBar className={'hidden md:flex'} label={t('common.navigation')} navLinks={filteredNavLinks} />
        </div>
        <div className='flex items-center'>
          <SearchBar className='mr-4 hidden md:flex' placeholder={`${t('search.search')}...`} />
          <NextLink
            className='rounded-sm focus:outline-none focus-visible:outline-offset-4 focus-visible:outline-text'
            icon={<Avatar session={session} size='sm' />}
            style='none'
            size='none'
            href={session ? privateRoutes.profile : routes.login}
            ariaLabel={session ? t('profile.title') : t('login.title')}
          />
        </div>
      </div>
    </header>
  )
}
