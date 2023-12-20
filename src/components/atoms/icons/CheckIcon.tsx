type Props = {
  className?: string
}

export default function CheckIcon({ className = '' }: Props) {
  return (
    <svg className={className} width='1.5rem' height='1.5rem' fill='none' viewBox='0 0 24 24'>
      <path
        d='M19.5 7L9 17.5L5 13.5'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
