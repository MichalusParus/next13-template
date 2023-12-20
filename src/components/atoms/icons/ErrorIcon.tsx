type Props = {
  className?: string
}

export default function ErrorIcon({ className = '' }: Props) {
  return (
    <svg className={className} width='1.5rem' height='1.5rem' viewBox='0 0 24 24' fill='none'>
      <path
        d='M12 16H12.01M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
