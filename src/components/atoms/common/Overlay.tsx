type Props = {
  className?: string
  isOpen: Boolean
  dark?: Boolean
  onClick: (value: boolean) => void
}

export default function Overlay({ className = '', isOpen, dark, onClick }: Props) {
  const overlayPosition = 'fixed left-0 top-0 z-30 h-full w-full cursor-default'
  const darkClass = dark ? 'bg-overlay focus-visible:bg-[rgba(0,0,0,0.5)]' : ''

  return (
    <button
      className={`${className} transition-colors ${overlayPosition} ${darkClass} ${
        isOpen ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
      type='button'
      aria-label={isOpen ? 'Overlay close popover' : 'popover closed'}
      onClick={() => onClick(!isOpen)}
    />
  )
}
