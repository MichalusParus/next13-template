import CheckIcon from '../../atoms/icons/CheckIcon'
import ErrorIcon from '../../atoms/icons/ErrorIcon'

type Props = {
  className?: string
  type?: 'error' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'none'
  error?: string | undefined
}

export default function Error({ className = '', type = 'error', size = 'md', error }: Props) {
  const errorSize = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    none: '',
  }
  const iconSize = {
    sm: 'w-smHeight h-smHeight',
    md: 'w-mdHeight h-mdHeight',
    lg: 'w-lgHeight h-lgHeight',
    none: '',
  }

  return (
    <div
      className={`ErrorWrap ${className} ${type === 'error' ? 'text-red-700' : 'text-green-700'} ${
        Boolean(error) ? 'visible' : 'invisible'
      }`}
    >
      <div className={`flex justify-start ${errorSize[size]}`}>
        <div>
          {type === 'error' ? (
            <ErrorIcon className={`mr-2 text-red-700 ${iconSize[size]}`} />
          ) : (
            <CheckIcon className={`mr-2 text-green-700 ${iconSize[size]}`} />
          )}
        </div>
        {error}
      </div>
    </div>
  )
}
