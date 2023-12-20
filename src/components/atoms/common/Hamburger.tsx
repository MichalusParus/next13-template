type Props = {
  className?: string
  isOpen: Boolean
  onClick: (value: boolean) => void
}

export default function Hamburger({ className = '', isOpen, onClick }: Props) {
  return (
    <button className={`${className} relative h-9 w-8`} onClick={() => onClick(!isOpen)}>
      <div
        className={`absolute left-0 h-1 w-full bg-text transition-dropdown ${
          isOpen ? 'top-[1.125rem] rotate-[135deg]' : 'left-0 top-1.5'
        }`}
      />
      <div
        className={`absolute left-0 h-1 w-full bg-text transition-dropdown ${
          isOpen ? '-left-8 opacity-0' : 'left-0 top-4'
        }`}
      />
      <div
        className={`absolute left-0 h-1 w-full bg-text transition-dropdown ${
          isOpen ? 'top-[1.125rem] rotate-[-135deg]' : 'left-0 top-[1.625rem]'
        }`}
      />
    </button>
  )
}
