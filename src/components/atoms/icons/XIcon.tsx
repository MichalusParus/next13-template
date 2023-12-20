type Props = {
  className?: string
}

export default function XIcon({ className = '' }: Props) {
  return (
    <svg className={className} width='1.5rem' height='1.5rem' viewBox='0 0 24 24' fill='none'>
      <path
        d='M6 6L18 18M18 6L6 18'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
