'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import NavBar from './NavBar'
import SearchForm from './SearchForm'
import Drawer from '../../molecules/popover/Drawer'
import Hamburger from '../../atoms/common/Hamburger'

export default function TopPanel() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathName = usePathname()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathName])

  return (
    <header
      className={`flex h-headerHeight w-full items-center border-b border-border bg-primary-500 py-4 shadow-button`}
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
          >
            <SearchForm className='mx-4 pb-2 pt-4' />
            <NavBar menu onClick={setIsMenuOpen} />
          </Drawer>
          <Logo />
          <NavBar className={'hidden md:flex'} />
        </div>
        <SearchForm className='hidden md:flex' />
      </div>
    </header>
  )
}
