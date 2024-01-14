import { useCallback, useEffect, useRef } from 'react'
import Button from '../../atoms/common/Button'
import Overlay from '../../atoms/common/Overlay'
import XIcon from '../../atoms/icons/XIcon'
import Title from '../../atoms/typography/Title'

type Props = {
  className?: string
  name: string
  isOpen: boolean
  style?: 'main' | 'primary' | 'secondary' | 'none'
  title?: string
  width?: string
  padding?: string
  children: React.ReactNode | React.ReactNode[]
  setIsOpen: (value: boolean) => void
}

export default function Modal({
  className = '',
  name,
  isOpen,
  title,
  style = 'main',
  width = 'w-full md:w-1/2',
  padding = 'px-10 py-6',
  children,
  setIsOpen,
}: Props) {
  const modalRef = useRef<any>(null)
  const buttonRef = useRef<any>(null)

  const handleOnClose = useCallback(() => {
    buttonRef.current!.focus()
    setIsOpen(!isOpen)
  }, [isOpen, setIsOpen])

  // Focus Trap
  useEffect(() => {
    buttonRef.current = document.activeElement
    const modalElement = modalRef.current
    const focusableEl = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableEl[0]
    const lastElement = focusableEl[focusableEl.length - 1]
    if (isOpen) {
      firstElement.focus()
    } else {
      buttonRef.current.focus()
    }
    const handleClick = (e: any) => {
      if (e.keyCode === 9) {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
      if (e.keyCode === 27) {
        handleOnClose()
      }
    }
    window.addEventListener('keydown', handleClick)
    return () => {
      window.removeEventListener('keydown', handleClick)
    }
  }, [isOpen, handleOnClose])

  const modalPosition = 'fixed left-1/2 top-1/2 z-50 translate-x-[-50%] translate-y-[-50%] transition-transform'
  const modalOpen = isOpen ? 'visible scale-100 opacity-100' : 'invisible scale-90 opacity-0'
  const modalStyle = {
    main: 'border border-text bg-overlay text-text shadow-modal',
    primary: 'border border-primary-text bg-primary-500 text-primary-text shadow-modal ',
    secondary: 'border border-secondary-text bg-secondary-500 text-secondary-text shadow-modal ',
    none: '',
  }

  return (
    <div ref={modalRef}>
      <div
        id={name}
        className={`ModalWrap max-w-[93vw] rounded-xl bg-bg ${width} ${modalPosition} ${modalOpen}`}
        role='dialog'
        aria-modal='true'
        aria-label={title || name}
      >
        <div className={`ModalInnerWrap ${className} relative w-full rounded-xl ${modalStyle[style]}`}>
          {title ? (
            <Title
              className='absolute left-0 top-0 my-2 w-full pr-10 text-center'
              type='h4'
              style={style === 'secondary' ? 'secondary' : 'primary'}
              size='xl'
            >
              {title}
            </Title>
          ) : null}
          <Button
            className='absolute right-[6px] top-[6px]'
            style='none'
            size='sm'
            icon={<XIcon />}
            onClick={handleOnClose}
            aria-label='Close dialog'
          />
          <div className={`ModalContentWrap mt-12 max-h-[80vh] overflow-y-auto ${padding}`}>{children}</div>
        </div>
      </div>
      <Overlay isOpen={isOpen} onClick={handleOnClose} dark />
    </div>
  )
}
