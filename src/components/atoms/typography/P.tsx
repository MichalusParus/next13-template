import Ghost from '../common/Ghost'

type Props = {
  className?: string
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'none'
  align?: 'text-left' | 'text-center' | 'text-right'
  isLoading?: boolean
  expectedLines?: number
  children?: string | React.ReactNode | React.ReactNode[]
}

export default function P({
  className = '',
  style = 'primary',
  size = 'md',
  align = 'text-left',
  isLoading,
  expectedLines = 1,
  children,
}: Props) {
  const pStyle = {
    primary: `text-primary-text`,
    secondary: `text-secondary-text`,
    none: '',
  }
  const pSize = {
    sm: `text-sm`,
    md: `text-md`,
    lg: `text-lg`,
    none: '',
  }
  const ghostSize = {
    sm: `h-sm my-smGhost`,
    md: `h-md my-mdGhost`,
    lg: `h-lg my-lgGhost`,
    none: '',
  }

  return (
    <p className={`${className} ${pStyle[style]} ${pSize[size]} ${align}`}>
      {isLoading
        ? new Array(expectedLines)
            .fill(null)
            .map((line, index) => <Ghost key={index} className={`${ghostSize[size]} w-full`} />)
        : children}
    </p>
  )
}
