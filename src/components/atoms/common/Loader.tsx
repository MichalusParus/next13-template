type Props = {
  className?: string
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'none'
}

export default function Loader({ className = '', style = 'primary', size = 'md' }: Props) {
  const dottClass = `rounded-full inline-flex mx-1 min-w-[0.75rem] h-3 bg-primary-text animate-loaderAnim `
  const loaderStyle = {
    primary: `bg-primary-text`,
    secondary: `bg-secondary-text`,
    none: '',
  }
  const loaderSize = {
    sm: `h-smHeight`,
    md: `h-mdHeight`,
    lg: `h-lgHeight`,
    none: '',
  }

  return (
    <div className={`${className} flex w-16 items-center text-center ${loaderSize[size]}`} aria-label='loader'>
      <div className={`${dottClass} ${loaderStyle[style]}`} />
      <div className={`${dottClass} ${loaderStyle[style]}`} style={{ animationDelay: '150ms' }} />
      <div className={`${dottClass} ${loaderStyle[style]}`} style={{ animationDelay: '300ms' }} />
    </div>
  )
}
