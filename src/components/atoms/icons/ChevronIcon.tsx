type Props = {
  className?: string
}

export default function ChevronIcon({ className = '' }: Props) {
  return (
    <svg
      className={className}
      width='1.5rem'
      height='1.5rem'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='6 9 12 15 18 9'></polyline>
    </svg>
  )
}
