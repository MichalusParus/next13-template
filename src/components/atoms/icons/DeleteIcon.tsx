type Props = {
  className?: string
}

export default function DeleteIcon({ className = '' }: Props) {
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
      <polyline points='3 6 5 6 21 6'></polyline>
      <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
      <line x1='10' y1='11' x2='10' y2='17'></line>
      <line x1='14' y1='11' x2='14' y2='17'></line>
    </svg>
  )
}
