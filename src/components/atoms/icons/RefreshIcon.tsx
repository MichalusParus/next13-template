type Props = {
  className?: string
}

export default function RefreshIcon({ className = '' }: Props) {
  return (
    <svg className={className} width='1.5rem' height='1.5rem' viewBox='0 0 24 24' fill='none'>
      <path
        d='M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
