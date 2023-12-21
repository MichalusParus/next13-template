import Overlay from '../../atoms/common/Overlay'

type Props = {
  className?: string
  type?: 'left' | 'right'
  isOpen: boolean
  style?: 'primary' | 'secondary' | 'none'
  top?: string
  width?: string
  height?: string
  padding?: string
  drawerButton: React.ReactNode
  role?: string
  children: React.ReactNode | React.ReactNode[]
  setIsOpen: (value: boolean) => void
}

export default function Drawer({
  className,
  type = 'left',
  drawerButton,
  isOpen,
  style = 'primary',
  top = 'top-0',
  width = 'w-1/3',
  height = 'h-full',
  padding = 'p-lgx',
  role,
  children,
  setIsOpen,
}: Props) {
  const drawerTransition = `transition-dropdown ${isOpen ? `visible opacity-100 ` : 'invisible opacity-0 '}`
  const drawerType = {
    left: `absolute ${isOpen ? `left-0 ` : '-left-full '}`,
    right: `absolute ${isOpen ? `right-0` : '-right-full '}`,
  }
  const drawerStyle = {
    primary: 'border border-text bg-primary-300 text-primary-text shadow-active ',
    secondary: 'border border-text bg-secondary-300 text-secondary-text shadow-active ',
    none: '',
  }

  return (
    <div className={`DrawerWrap ${className}`} role={role}>
      <Overlay isOpen={isOpen} onClick={setIsOpen} dark />
      <div className={`relative ${isOpen ? 'z-40' : 'z-20'}`}>{drawerButton}</div>
      <div
        className={`Drawer z-[35] ${top} ${width} ${height} ${padding} ${drawerTransition} ${drawerType[type]} ${drawerStyle[style]}`}
      >
        {children}
      </div>
    </div>
  )
}
