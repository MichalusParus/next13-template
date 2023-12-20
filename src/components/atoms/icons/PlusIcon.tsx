type Props = {
  className?: string
}

export default function PlusIcon({ className = '' }: Props) {
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
      <line x1='12' y1='5' x2='12' y2='19'></line>
      <line x1='5' y1='12' x2='19' y2='12'></line>
    </svg>
  )
}
