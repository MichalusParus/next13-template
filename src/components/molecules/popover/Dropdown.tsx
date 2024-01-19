import { Button } from '../../atoms/common/Button'
import ChevronIcon from '../../atoms/icons/ChevronIcon'
import Overlay from '../../atoms/common/Overlay'

type Props = {
  className?: string
  isOpen: Boolean
  type?: 'relative' | 'left' | 'right' | 'top'
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'none'
  width?: string
  padding?: string
  overlay?: Boolean
  title?: string | React.ReactNode
  hideChevron?: boolean
  isUnlocked?: boolean
  error?: boolean
  dropdownButton?: React.ReactNode | React.ReactNode[]
  role?: string
  ariaLabel?: string
  children: React.ReactNode | React.ReactNode[]
  setIsOpen: (value: boolean) => void
}

export default function Dropdown({
  className = '',
  isOpen,
  type = 'relative',
  style = 'primary',
  size = 'md',
  width = 'w-full',
  padding,
  overlay,
  title,
  hideChevron,
  isUnlocked,
  error,
  dropdownButton,
  ariaLabel,
  children,
  setIsOpen,
}: Props) {
  const buttonIcon = typeof title === 'string' ? null : title
  const buttonTitle = typeof title === 'string' ? title : ''
  const buttonAriaLabel = ariaLabel ? ariaLabel : buttonTitle

  const dropdownTransition = `transition-dropdown ${isOpen ? `visible opacity-100 ` : 'invisible opacity-0 '}`
  const dropdownType = {
    relative: `rounded-b-md pt-4 ${isOpen ? `max-h-fit -translate-y-2 ` : 'max-h-0 -translate-y-8 '}`,
    left: `absolute left-0 pt-2 rounded-b-md ${
      isOpen ? `visible top-[85%] opacity-100 ` : 'invisible top-0 opacity-0 '
    }`,
    right: `absolute right-0 pt-2 rounded-b-md ${
      isOpen ? `visible top-[85%] opacity-100 ` : 'invisible top-0 opacity-0 '
    }`,
    top: `absolute rounded-t-md pb-2 ${
      isOpen ? `visible bottom-[85%] opacity-100` : 'invisible bottom-1/3 opacity-0 '
    }`,
  }
  const dropdownStyle = {
    primary: 'border border-primary-text bg-primary-300 text-primary-text shadow-active ',
    secondary: 'border border-secondary-text bg-secondary-300 text-secondary-text shadow-active ',
    none: '',
  }
  const iconStyle = {
    primary: 'text-primary-text ',
    secondary: 'text-secondary-text ',
    none: '',
  }
  const dropdownSize = {
    sm: `text-sm ${padding ? padding : 'py-smy px-smx'}`,
    md: `text-md ${padding ? padding : 'py-mdy px-mdx'}`,
    lg: `text-lg ${padding ? padding : 'py-lgy px-lgx'}`,
    none: '',
  }

  return (
    <div className={`DropdownWrap ${className} ${!isUnlocked ? 'relative' : ''}`}>
      <div className={`DropdownButtonWrap relative ${isOpen ? 'z-40' : 'z-20'} ${!hideChevron ? 'w-full' : ''}`}>
        {!dropdownButton ? (
          <Button
            className={`DropdownButton relative w-full justify-between ${!hideChevron ? 'pr-8' : ''} ${
              isOpen ? 'selected' : ''
            } ${error ? 'error' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            style={style}
            size={size}
            icon={buttonIcon}
            role='combobox'
            aria-haspopup='listbox'
            aria-expanded={isOpen}
            aria-controls={buttonAriaLabel}
            ariaLabel={buttonAriaLabel}
          >
            {buttonTitle}
            {!hideChevron ? (
              <ChevronIcon
                className={`absolute right-2 top-[50%] translate-y-[-50%] transition-transform ${
                  isOpen ? 'rotate-180' : ''
                } ${iconStyle[style]}`}
              />
            ) : null}
          </Button>
        ) : (
          dropdownButton
        )}
        {!hideChevron && dropdownButton ? (
          <ChevronIcon
            className={`absolute right-2 top-[50%] z-40 translate-y-[-50%] transition-transform ${
              isOpen ? 'rotate-180' : ''
            } ${iconStyle[style]}`}
          />
        ) : null}
      </div>
      <div
        id={buttonAriaLabel}
        className={`DropdownContentWrap z-[35] ${dropdownType[type]} ${dropdownStyle[style]} ${dropdownTransition} ${dropdownSize[size]} ${width}`}
      >
        {children}
      </div>
      {overlay ? <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} /> : null}
    </div>
  )
}
