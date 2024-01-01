import Link from 'next/link'

type Props = {
  className?: string
  href: string
  style?: 'primary' | 'secondary' | 'menu' | 'inline' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'none'
  icon?: React.ReactNode
  children?: string | React.ReactNode
}

export default function NextLink({ className = '', href, style = 'primary', size = 'md', icon, children }: Props) {
  const iconOnly = Boolean(icon && (!children || ![children].flat().some((x) => x)))

  const linkStyle = {
    primary:
      'flex border border-primary-text rounded-md bg-primary-500 text-primary-text shadow-button ' +
      'hover:bg-primary-700 hover:text-primary-textHover hover:shadow-button ' +
      'focus-visible:bg-primary-700 focus-visible:text-primary-textHover focus-visible:shadow-button ' +
      'active:bg-primary-300 active:text-primary-textActive active:shadow-active ' +
      '[&.selected]:bg-primary-300 [&.selected]:text-primary-textActive [&.selected]:shadow-active ' +
      'disabled:bg-zinc-400 disabled:text-zinc-800 disabled:shadow-none disabled:cursor-not-allowed',
    secondary:
      'flex border border-secondary-text rounded-md bg-secondary-500 text-secondary-text shadow-button ' +
      'hover:bg-secondary-700 hover:text-secondary-textHover hover:shadow-button ' +
      'focus-visible:bg-secondary-700 focus-visible:text-secondary-textHover focus-visible:shadow-button ' +
      'active:bg-secondary-300 active:text-secondary-textActive active:shadow-active ' +
      '[&.selected]:bg-secondary-300 [&.selected]:text-secondary-textActive [&.selected]:shadow-active ' +
      'disabled:border-zinc-800 disabled:bg-zinc-400 disabled:text-secondary-zinc-800 disabled:shadow-none disabled:cursor-not-allowed',
    menu:
      'flex w-full border border-transparent bg-transparent ' +
      'hover:bg-overlay hover:text-text ' +
      'focus-visible:bg-overlay focus-visible:text-text ' +
      'active:border-overlay active:bg-overlay active:shadow-active ' +
      '[&.selected]:border-overlay [&.selected]:bg-overlay [&.selected]:text-bg [&.selected]:shadow-active ',
    inline: 'inline-flex hover:underline',
    none: '',
  }
  const errorStyle =
    '[&.error]:shadow-error [&.error]:hover:shadow-error [&.error]:focus-visible:shadow-error [&.error]:active:shadow-error'
  const buttonSize = {
    sm: `text-sm ${style === 'inline' ? '' : iconOnly ? 'p-smy' : 'py-smy px-smx'}`,
    md: `text-md ${style === 'inline' ? '' : iconOnly ? 'p-mdy' : 'py-mdy px-mdx'}`,
    lg: `text-lg ${style === 'inline' ? '' : iconOnly ? 'p-lgy' : 'py-lgy px-lgx'}`,
    none: '',
  }
  const iconSize = {
    sm: '[&_svg]:w-smHeight [&_svg]:h-smHeight',
    md: '[&_svg]:w-mdHeight [&_svg]:h-mdHeight',
    lg: '[&_svg]:w-lgHeight [&_svg]:h-lgHeight',
    none: '',
  }

  return (
    <Link
      href={href}
      className={`${className} items-center justify-center whitespace-nowrap font-medium transition-activity focus:outline-none ${linkStyle[style]} ${buttonSize[size]} ${errorStyle}`}
    >
      {icon ? <div className={`IconWrap ${iconSize[size]} ${iconOnly ? '' : 'mr-2'}`}>{icon}</div> : null}
      {children}
    </Link>
  )
}
