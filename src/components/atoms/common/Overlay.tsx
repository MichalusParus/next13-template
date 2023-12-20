type Props = {
  className?: string
  isOpen: Boolean
  dark?: Boolean
  onClick: (value: boolean) => void
}

export default function Overlay({ className = '', isOpen, dark, onClick }: Props) {
  const overlayPosition = 'fixed left-0 top-0 z-30 min-h-full min-w-full cursor-default transition-opacity'
  const darkClass = dark ? 'bg-overlay' : ''

  return (
    <button
      className={`${className} ${overlayPosition} ${darkClass} ${
        isOpen ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
      type='button'
      onClick={() => onClick(!isOpen)}
    />
  )
}
