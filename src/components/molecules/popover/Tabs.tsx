'use client'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import NextLink from '../../atoms/common/NextLink'
import Dropdown from './Dropdown'

type Props = {
  className?: string
  name: string
  tabs: { label: string; slug: string; component: React.ReactNode; isHidden?: boolean }[]
  style?: 'primary' | 'secondary' | 'none'
  children?: React.ReactNode | React.ReactNode[]
}

export default function Tabs({ className = '', name, tabs, style = 'primary', children }: Props) {
  const selectedParams = useSearchParams().get('tab')
  const selectedTab = tabs.find((tab) => tab.slug === selectedParams) || tabs[0]
  const [isTabsOpen, setIsTabsOpen] = useState(false)
  const tabsref = useRef<any>(null)
  const tabPanelId = `${selectedTab.slug}-tabpanel`

  useEffect(() => {
    setIsTabsOpen(false)
  }, [selectedTab])

  // Focus Trap
  useEffect(() => {
    let index = 0
    let open = false
    const focusableEl = tabsref.current.querySelectorAll('.TabLink')
    const handleClick = (e: any) => {
      if (e.target.id === `tablist` && (e.keyCode === 13 || (e.keyCode === 32 && !open))) {
        e.preventDefault()
        open = true
        focusableEl[0].focus()
      } else if (open) {
        switch (e.keyCode) {
          case 39:
            e.preventDefault()
            if (index + 1 === focusableEl.length) {
              focusableEl[0].focus()
              index = 0
            } else {
              focusableEl[index + 1].focus()
              index++
            }
            break
          case 37:
            e.preventDefault()
            if (index <= 0) {
              focusableEl[focusableEl.length - 1].focus()
              index = focusableEl.length - 1
            } else {
              focusableEl[index - 1].focus()
              index--
            }
            break
          case 27:
            e.preventDefault()
            open = false
            tabsref.current.focus()
            break
          default:
            break
        }
      }
    }
    window.addEventListener('keydown', handleClick)
    return () => {
      window.removeEventListener('keydown', handleClick)
    }
  }, [selectedParams])

  const tabsStyle = {
    primary: 'border border-primary-text bg-primary-500 text-primary-text shadow-button',
    secondary: 'border border-secondary-text bg-secondary-500 text-secondary-text shadow-button',
    none: '',
  }

  return (
    <div className={`TabsWrap ${className} relative w-full`}>
      <ul
        id='tablist'
        className={`hidden w-full overflow-hidden rounded-md focus:outline-offset-8 focus:outline-text md:flex ${tabsStyle[style]}`}
        role='tablist'
        ref={tabsref}
        tabIndex={0}
        aria-label={name}
      >
        {tabs.map((tab) =>
          !tab.isHidden ? (
            <li
              className='w-full'
              key={tab.slug}
              role='tab'
              aria-controls={tabPanelId}
              aria-selected={tab.slug === selectedTab.slug}
            >
              <NextLink
                className={`TabLink ${tab.slug === selectedTab.slug ? 'selected' : ''}`}
                style='menu'
                size='lg'
                href={`?tab=${tab.slug}`}
                tabIndex={-1}
              >
                {tab.label}
              </NextLink>
            </li>
          ) : null
        )}
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
        <ul className='flex w-full flex-col justify-center' role='tablist' aria-label={name}>
          {tabs.map((tab) => (
            <li
              key={tab.slug}
              id={name + tab.slug}
              role='tab'
              aria-controls={tabPanelId}
              aria-selected={tab.slug === selectedTab.slug}
            >
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
      <div id={tabPanelId} className='mt-8 w-full' role='tabpanel' aria-labelledby={name + selectedTab.slug}>
        {selectedTab.component}
      </div>
    </div>
  )
}
