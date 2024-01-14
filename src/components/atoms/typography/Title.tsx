import Ghost from '../common/Ghost'

type Props = {
  className?: string
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'none'
  align?: 'text-left' | 'text-center' | 'text-right'
  isLoading?: boolean
  children?: string | React.ReactNode | React.ReactNode[]
}

export default function Title({
  className = '',
  type = 'h2',
  style = 'primary',
  size = 'lg',
  align = 'text-left',
  isLoading,
  children,
  ...rest
}: Props) {
  const ghostAlign = align?.split('-')[1] as 'left' | 'center' | 'right'
  const titleStyle = {
    primary: `text-primary-text whitespace-pre-wrap`,
    secondary: `text-secondary-text whitespace-pre-wrap`,
    none: '',
  }
  const titleSize = {
    sm: `text-sm w-full font-semibold`,
    md: `text-md w-full font-semibold`,
    lg: `text-lg w-full font-semibold`,
    xl: `text-xl w-full font-semibold`,
    '2xl': `text-2xl w-full font-semibold`,
    '3xl': `text-3xl w-full font-semibold`,
    none: '',
  }
  const ghostSize = {
    sm: `h-sm my-smGhost`,
    md: `h-md my-mdGhost`,
    lg: `h-lg my-lgGhost`,
    xl: `h-xl my-xlGhost`,
    '2xl': `h-2xl my-2xlGhost`,
    '3xl': `h-3xl my-3xlGhost`,
    none: '',
  }
  const ghostAligment = {
    left: '',
    center: 'mx-auto',
    right: 'ml-auto',
  }

  switch (type) {
    case 'h1':
      return (
        <h1 className={`${className} ${titleStyle[style]} ${titleSize[size]} ${align}`} {...rest}>
          {isLoading ? <Ghost className={`${ghostSize[size]} ${ghostAligment[ghostAlign]} w-40`} /> : children}
        </h1>
      )
    case 'h2':
      return (
        <h2 className={`${className} ${titleStyle[style]} ${titleSize[size]} ${align}`} {...rest}>
          {isLoading ? <Ghost className={`${ghostSize[size]} ${ghostAligment[ghostAlign]} w-40`} /> : children}
        </h2>
      )
    case 'h3':
      return (
        <h3 className={`${className} ${titleStyle[style]} ${titleSize[size]} ${align}`} {...rest}>
          {isLoading ? <Ghost className={`${ghostSize[size]} ${ghostAligment[ghostAlign]} w-40`} /> : children}
        </h3>
      )
    case 'h4':
      return (
        <h4 className={`${className} ${titleStyle[style]} ${titleSize[size]} ${align}`} {...rest}>
          {isLoading ? <Ghost className={`${ghostSize[size]} ${ghostAligment[ghostAlign]} w-40`} /> : children}
        </h4>
      )
    case 'h5':
      return (
        <h5 className={`${className} ${titleStyle[style]} ${titleSize[size]} ${align}`} {...rest}>
          {isLoading ? <Ghost className={`${ghostSize[size]} ${ghostAligment[ghostAlign]} w-40`} /> : children}
        </h5>
      )
    case 'h6':
      return (
        <h6 className={`${className} ${titleStyle[style]} ${titleSize[size]} ${align}`} {...rest}>
          {isLoading ? <Ghost className={`${ghostSize[size]} ${ghostAligment[ghostAlign]} w-40`} /> : children}
        </h6>
      )
    default:
      return null
  }
}
