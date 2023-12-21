'use client'
import { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Button from '../../atoms/common/Button'
import NextLink from '../../atoms/common/NextLink'

const navLinks = [
  {
    slug: '',
    title: 'Home',
  },
  {
    slug: 'about',
    title: 'About',
  },
  {
    slug: 'components',
    title: 'Components',
  },
]

type Props = {
  className?: string
  menu?: boolean
  onClick?: (value: boolean) => void
}

export default function NavBar({ className, menu, onClick = () => {} }: Props) {
  const pathName = usePathname()
  const router = useRouter()

  const handleRefresh = useCallback(() => {
    onClick(false)
    router.refresh()
  }, [router, onClick])

  const navLinkStyle =
    'border border-transparent bg-transparent font-semibold w-full ' +
    'hover:bg-transparent hover:text-text ' +
    'focus-visible:bg-transparent focus-visible:text-text ' +
    'active:bg-transparent active:text-secondary-100 ' +
    '[&.selected]:border-overlay [&.selected]:bg-overlay [&.selected]:text-bg [&.selected]:shadow-active '
  const navLinkSize =
    `text-md p-smy py-smy px-smx ` + `md:text-md md:py-smy md:px-smx ` + `xl:text-lg xl:py-mdy xl:px-mdx `

  return (
    <nav className={className}>
      <ul className={menu ? 'flex flex-col' : 'flex pt-1'}>
        {navLinks.map(({ slug, title }) => (
          <li key={slug} className='flex justify-center' role={menu ? 'menuitem' : ''}>
            {pathName === '/' + slug && menu ? (
              <Button
                className={`selected ${navLinkStyle} ${navLinkSize}`}
                style={'none'}
                size='none'
                onClick={handleRefresh}
              >
                {title}
              </Button>
            ) : (
              <NextLink className={`flex ${navLinkStyle} ${navLinkSize}`} href={`/${slug}`} style={'none'} size='none'>
                {title}
              </NextLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
