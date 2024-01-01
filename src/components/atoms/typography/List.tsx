import Ghost from '../common/Ghost'
import Title from './Title'

type Props = {
  className?: string
  type?: 'ul' | 'ol'
  title?: string
  content: string[]
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'none'
  liType?: string
  isLoading?: boolean
  expectedLines?: number
}

export default function List({
  className = '',
  type = 'ul',
  style = 'primary',
  size = 'md',
  liType = 'none',
  content,
  title,
  isLoading = false,
  expectedLines = 8,
}: Props) {
  const titleType = {
    sm: 'h5',
    md: 'h4',
    lg: 'h3',
    none: '',
  }
  const listStyle = {
    primary: `text-primary-text`,
    secondary: `text-secondary-text`,
    none: '',
  }
  const titleSize = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    none: '',
  }
  const liSize = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    none: '',
  }
  const ghostSize = {
    sm: `h-sm my-smGhost`,
    md: `h-md my-mdGhost`,
    lg: `h-lg my-lgGhost`,
    none: '',
  }

  if (isLoading) {
    return (
      <div className={`${className}`}>
        {title ? (
          <Title
            type={titleType[size] as 'h4' | 'h5' | 'h6'}
            style={style}
            size={titleSize[size] as 'lg' | 'xl' | '2xl'}
          >
            {title}
          </Title>
        ) : null}
        <div className='w-full'>
          {new Array(expectedLines).fill(null).map((line, index) => (
            <Ghost className={ghostSize[size]} key={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} ${listStyle[style]}`}>
      {title ? (
        <Title type={titleType[size] as 'h4' | 'h5' | 'h6'} style={style} size={titleSize[size] as 'lg' | 'xl' | '2xl'}>
          {title}
        </Title>
      ) : null}
      {type === 'ul' ? (
        <ul className={`${liType} pl-4`}>
          {content.map((li, index) => (
            <li key={`${title} ${index}`} className={`${liSize[size]}`}>
              {li}
            </li>
          ))}
        </ul>
      ) : (
        <ol className={`${liType} pl-4`}>
          {content.map((li, index) => (
            <li key={`${title} ${index}`} className={`${liSize[size]}`}>
              {li}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
