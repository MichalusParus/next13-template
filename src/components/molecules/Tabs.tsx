'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { slugify } from '@/src/components/utils/utils'
import NextLink from '../atoms/common/NextLink'
import Dropdown from './popover/Dropdown'

type Props = {
  className?: string
  tabs: string[]
  style?: 'primary' | 'secondary' | 'none'
  children?: React.ReactNode | React.ReactNode[]
}

export default function Tabs({ className = '', tabs, style = 'primary', children }: Props) {
  const selectedTab = useSearchParams().get('tab')
  const [isTabsOpen, setIsTabsOpen] = useState(false)

  const tabsStyle = {
    primary: 'border border-border bg-primary-500 text-primary-text shadow-button',
    secondary: 'border border-border bg-secondary-500 text-secondary-text shadow-button',
    none: '',
  }

  useEffect(() => {
    setIsTabsOpen(false)
  }, [selectedTab])

  return (
    <div className={`TabsWrap relative w-full ${className}`}>
      <div
        className={`TabsInnerWrap hidden w-full justify-center overflow-hidden rounded-md md:flex ${tabsStyle[style]}`}
      >
        {tabs.map((tab) => (
          <NextLink
            key={tab}
            className={`${slugify(tab) === selectedTab ? 'selected' : ''}`}
            style='menu'
            size='lg'
            href={`?tab=${slugify(tab)}`}
          >
            {tab}
          </NextLink>
        ))}
        {children}
      </div>
      <div className='TabsMobileWrap relative flex w-full justify-center md:hidden'>
        <Dropdown
          className='w-full'
          type='left'
          isOpen={isTabsOpen}
          style={style}
          size='lg'
          padding=' '
          overlay
          title={tabs.find((tab) => slugify(tab) === selectedTab) || tabs[0]}
          setIsOpen={setIsTabsOpen}
        >
          <ul className='flex w-full flex-col justify-center'>
            {tabs.map((tab) => (
              <li key={tab}>
                <NextLink
                  className={`${slugify(tab) === selectedTab ? 'selected' : ''}`}
                  style='menu'
                  size='lg'
                  href={`?tab=${slugify(tab)}`}
                >
                  {tab}
                </NextLink>
              </li>
            ))}
            {children}
          </ul>
        </Dropdown>
      </div>
    </div>
  )
}
