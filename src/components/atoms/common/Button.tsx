import { ForwardedRef, forwardRef } from 'react'
import Loader from './Loader'

type Props = {
  id?: string
  className?: string
  type?: 'button' | 'submit'
  style?: 'primary' | 'secondary' | 'menu' | 'delete' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'none'
  icon?: React.ReactNode
  isLoading?: boolean
  disabled?: boolean
  role?: string
  ariaLabel?: string
  tabIndex?: number
  children?: string | React.ReactNode
  onClick?: () => void
}

export const Button = forwardRef(
  (
    {
      className = '',
      type = 'button',
      style = 'primary',
      size = 'md',
      icon,
      isLoading,
      disabled,
      role = 'button',
      ariaLabel,
      children,
      onClick,
      ...rest
    }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const iconOnly = Boolean(icon && (!children || ![children].flat().some((x) => x)))
    const defaultAria = typeof children === 'string' ? children : ''

    const buttonStyle = {
      primary:
        'border border-primary-text rounded-md bg-primary-500 text-primary-text shadow-button ' +
        'hover:bg-primary-700 hover:text-primary-textHover hover:shadow-button ' +
        'focus-visible:bg-primary-700 focus-visible:text-primary-textHover focus-visible:shadow-button ' +
        'active:bg-primary-300 active:text-primary-textActive active:shadow-active ' +
        '[&.selected]:bg-primary-300 [&.selected]:text-primary-textActive [&.selected]:shadow-active [&.selected]:focus:bg-primary-700 ' +
        'disabled:bg-zinc-400 disabled:text-zinc-800 disabled:shadow-none disabled:cursor-not-allowed',
      secondary:
        'border border-secondary-text rounded-md bg-secondary-500 text-secondary-text shadow-button ' +
        'hover:bg-secondary-700 hover:text-secondary-textHover hover:shadow-button ' +
        'focus-visible:bg-secondary-700 focus-visible:text-secondary-textHover focus-visible:shadow-button ' +
        'active:bg-secondary-300 active:text-secondary-textActive active:shadow-active ' +
        '[&.selected]:bg-secondary-300 [&.selected]:text-secondary-textActive [&.selected]:shadow-active [&.selected]:focus:bg-secondary-700 ' +
        'disabled:border-zinc-800 disabled:bg-zinc-400 disabled:text-secondary-zinc-800 disabled:shadow-none disabled:cursor-not-allowed',
      menu:
        'w-full border border-transparent bg-transparent ' +
        'hover:bg-overlay hover:text-text ' +
        'focus-within:bg-overlay focus-within:text-text group-focus-within:bg-overlay group-focus-within:text-text ' +
        'active:border-overlay active:bg-overlay active:shadow-active ' +
        '[&.selected]:border-overlay [&.selected]:bg-overlay [&.selected]:text-bg [&.selected]:shadow-active ',
      delete:
        'border border-primary-text rounded-md bg-red-500 text-primary-text shadow-button ' +
        'hover:bg-red-600 hover:text-primary-textHover hover:shadow-button ' +
        'focus-visible:bg-red-600 focus-visible:text-primary-textHover focus-visible:shadow-button ' +
        'active:bg-red-400 active:text-primary-textActive active:shadow-active ' +
        'disabled:bg-zinc-400 disabled:text-zinc-800 disabled:shadow-none disabled:cursor-not-allowed',
      none: '',
    }
    const errorStyle =
      '[&.error]:shadow-error [&.error]:hover:shadow-error [&.error]:focus-visible:shadow-error [&.error]:active:shadow-error'
    const buttonSize = {
      sm: `text-sm ${iconOnly ? 'p-smy' : 'py-smy px-smx'}`,
      md: `text-md ${iconOnly ? 'p-mdy' : 'py-mdy px-mdx'}`,
      lg: `text-lg ${iconOnly ? 'p-lgy' : 'py-lgy px-lgx'}`,
      none: '',
    }
    const loaderStyle = style === 'secondary' ? 'secondary' : 'primary'
    const iconSize = {
      sm: '[&_svg]:w-smHeight [&_svg]:h-smHeight',
      md: '[&_svg]:w-mdHeight [&_svg]:h-mdHeight',
      lg: '[&_svg]:w-lgHeight [&_svg]:h-lgHeight',
      none: '',
    }

    return (
      <button
        className={`${className} flex items-center justify-center whitespace-nowrap font-semibold transition-activity focus:outline-none ${buttonStyle[style]} ${errorStyle} ${buttonSize[size]}`}
        type={type}
        disabled={disabled}
        onClick={onClick}
        tabIndex={disabled ? -1 : 0}
        role={role}
        aria-label={ariaLabel ? ariaLabel : defaultAria}
        ref={ref}
        {...rest}
      >
        {isLoading ? (
          <Loader style={loaderStyle} size={size} />
        ) : (
          <>
            {icon ? <div className={`IconWrap ${iconSize[size]} ${iconOnly ? '' : 'mr-2'}`}>{icon}</div> : null}
            {children}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
