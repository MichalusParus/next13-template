type Props = {
  className?: string
}

export default function SignInIcon({ className = '' }: Props) {
  return (
    <svg className={className} width='1.5rem' height='1.5rem' viewBox='0 0 24 24'>
      <path
        d='M20,22H10a2,2,0,0,1-2-2V16a1,1,0,0,1,2,0v4H20V4H10V8A1,1,0,0,1,8,8V4a2,2,0,0,1,2-2H20a2,2,0,0,1,2,2V20A2,2,0,0,1,20,22Z'
        fill='currentColor'
      ></path>
      <path d='M17,13H3a1,1,0,0,1,0-2H17a1,1,0,0,1,0,2Z' fill='currentColor'></path>
      <path
        d='M13,17a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42L15.59,12l-3.3-3.29a1,1,0,1,1,1.42-1.42l4,4a1,1,0,0,1,0,1.42l-4,4A1,1,0,0,1,13,17Z'
        fill='currentColor'
      ></path>
    </svg>
  )
}
