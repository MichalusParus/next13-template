'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import NextLink from '../../atoms/common/NextLink'
import Dropdown from './Dropdown'

type Props = {
  className?: string
  tabs: { label: string; slug: string; component: React.ReactNode }[]
  style?: 'primary' | 'secondary' | 'none'
  children?: React.ReactNode | React.ReactNode[]
}

export default function Tabs({ className = '', tabs, style = 'primary', children }: Props) {
  const selectedParams = useSearchParams().get('tab')
  const selectedTab = tabs.find((tab) => tab.slug === selectedParams) || tabs[0]
  const [isTabsOpen, setIsTabsOpen] = useState(false)

  useEffect(() => {
    setIsTabsOpen(false)
  }, [selectedTab])

  const tabsStyle = {
    primary: 'border border-border bg-primary-500 text-primary-text shadow-button',
    secondary: 'border border-border bg-secondary-500 text-secondary-text shadow-button',
    none: '',
  }

  return (
    <div className={`TabsWrap ${className} relative w-full`}>
      <ul className={`hidden w-full overflow-hidden rounded-md md:flex ${tabsStyle[style]}`} role='tablist'>
        {tabs.map((tab) => (
          <li className='w-full' key={tab.slug} role='tab'>
            <NextLink
              className={`${tab.slug === selectedTab.slug ? 'selected' : ''}`}
              style='menu'
              size='lg'
              href={`?tab=${tab.slug}`}
            >
              {tab.label}
            </NextLink>
          </li>
        ))}
        {children}
      </ul>
      <Dropdown
        className='w-full md:hidden'
        type='left'
        isOpen={isTabsOpen}
        style={style}
        size='lg'
        padding=' '
        overlay
        title={selectedTab.label}
        setIsOpen={setIsTabsOpen}
      >
        <ul className='flex w-full flex-col justify-center' role='tablist'>
          {tabs.map((tab) => (
            <li key={tab.slug} role='tab'>
              <NextLink
                className={`${tab.slug === selectedTab.slug ? 'selected' : ''}`}
                style='menu'
                size='lg'
                href={`?tab=${tab.slug}`}
              >
                {tab.label}
              </NextLink>
            </li>
          ))}
          {children}
        </ul>
      </Dropdown>
      <div className='TabPanel mt-8 w-full' role='tabpanel'>
        {selectedTab.component}
      </div>
    </div>
  )
}
