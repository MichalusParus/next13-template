type Props = {
  className?: string
}

export default function DoubleChevronIcon({ className = '' }: Props) {
  return (
    <svg
      className={className}
      width='1.5rem'
      height='1.5rem'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='7 13 12 18 17 13'></polyline>
      <polyline points='7 6 12 11 17 6'></polyline>
    </svg>
  )
}
