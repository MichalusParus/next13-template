type Props = {
  className?: string
  type?: 'none' | 'bold' | 'italic' | 'underline'
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'none'
  isLoading?: boolean
  expectedLines?: number
  children?: string | React.ReactNode
}

export default function Span({ className = '', type = 'bold', style = 'primary', size = 'lg', children }: Props) {
  const spanType = {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    none: '',
  }
  const spanStyle = {
    primary: `text-primary-text`,
    secondary: `text-secondary-text`,
    none: '',
  }
  const spanSize = {
    sm: `text-sm`,
    md: `text-md`,
    lg: `text-lg`,
    none: '',
  }

  return <span className={`${className} ${spanType[type]} ${spanStyle[style]} ${spanSize[size]}`}>{children}</span>
}
