import Error from './Error'

export type Props = {
  className?: string
  name?: string
  label: string
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'none'
  error?: string
  description?: string
  hideLabel?: boolean
  hideError?: boolean
  children?: React.ReactNode
}
export const Label = ({
  className = '',
  name,
  label,
  style = 'primary',
  size = 'md',
  error,
  description,
  hideLabel,
  hideError,
  children,
}: Props) => {
  const textColor = `text-${style}-text`
  const textSize = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    none: '',
  }

  return (
    <div className={`${className} relative flex w-full flex-col md:flex-row ${hideError ? 'items-center' : 'mb-2'}`}>
      <label
        id={`${name}-label`}
        className={`mb-1 mr-4 w-[50%] ${textColor} ${textSize[size]} ${hideLabel ? 'hidden' : ''}`}
        htmlFor={name}
      >
        {label}
      </label>
      <div className='flex w-full flex-col items-start justify-start'>
        {children}
        {description ? <div className='w-full px-1 pt-1 text-sm'>{description}</div> : null}
        {!hideError ? <Error error={error} size={size} /> : null}
      </div>
    </div>
  )
}

Label.displayName = 'Label'
