type Props = {
  className?: string
}

export default function SignOutIcon({ className = '' }: Props) {
  return (
    <svg className={className} width='1.5rem' height='1.5rem' fill='currentColor' viewBox='0 0 24 24'>
      <path d='M13,15a1,1,0,0,0-1,1v4H4V4h8V8a1,1,0,0,0,2,0V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V16A1,1,0,0,0,13,15Z'></path>
      <path d='M21.92,11.62a1.15,1.15,0,0,0-.21-.33h0l-4-4a1,1,0,1,0-1.42,1.42L18.59,11H8a1,1,0,0,0,0,2H18.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4h0a1.15,1.15,0,0,0,.21-.33.94.94,0,0,0,0-.76Z'></path>
    </svg>
  )
}
