'use client'
import { useCallback } from 'react'
import { usePathname, useRouter } from '@/src/navigation'
import { Button } from '../../atoms/common/Button'
import NextLink from '../../atoms/common/NextLink'

type Props = {
  className?: string
  label: string
  menu?: boolean
  navLinks: { slug: string; title: string; private?: boolean }[]
  onClick?: (value: boolean) => void
}

export default function NavBar({ className, label, menu, navLinks, onClick = () => {} }: Props) {
  const pathName = usePathname()
  const router = useRouter()

  const handleRefresh = useCallback(() => {
    onClick(false)
    router.refresh()
  }, [router, onClick])

  const navLinkStyle =
    'border border-transparent bg-transparent font-semibold w-full ' +
    'hover:bg-transparent hover:text-text ' +
    'focus:outline-none focus-visible:outline-text ' +
    'active:bg-transparent active:text-secondary-100 ' +
    '[&.selected]:border-overlay [&.selected]:bg-overlay [&.selected]:text-bg [&.selected]:shadow-active '
  const navLinkSize =
    `text-md p-smy py-smy px-smx rounded-sm ` + `md:text-md md:py-smy md:px-smx ` + `xl:text-lg xl:py-mdy xl:px-mdx `

  return (
    <nav className={className}>
      <ul className={menu ? 'flex flex-col' : 'flex pt-1'} role='listbox' aria-label={label}>
        {navLinks.map(({ slug, title }) => (
          <li key={slug} className='flex justify-center' role='option' aria-selected={pathName === slug}>
            {pathName === slug && menu ? (
              <Button className={`selected ${navLinkSize}`} style={'menu'} size='none' onClick={handleRefresh}>
                {title}
              </Button>
            ) : (
              <NextLink
                className={`flex ${menu ? '' : navLinkStyle} ${navLinkSize}`}
                href={slug}
                style={menu ? 'menu' : 'none'}
                size='none'
              >
                {title}
              </NextLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
