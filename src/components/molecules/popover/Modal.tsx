import Button from '../../atoms/common/Button'
import Overlay from '../../atoms/common/Overlay'
import XIcon from '../../atoms/icons/XIcon'
import Title from '../../atoms/typography/Title'

type Props = {
  className?: string
  isOpen: boolean
  style?: 'main' | 'primary' | 'secondary' | 'none'
  title?: string
  width?: string
  padding?: string
  children: React.ReactNode | React.ReactNode[]
  onClose?: () => void
}

export default function Modal({
  className = '',
  isOpen,
  title,
  style = 'main',
  width = 'w-full md:w-1/2',
  padding = 'px-10 py-6',
  children,
  onClose,
}: Props) {
  const modalPosition = 'fixed left-1/2 top-1/2 z-50 translate-x-[-50%] translate-y-[-50%] transition-transform'
  const modalStyle = {
    main: 'border border-text bg-overlay text-text shadow-modal',
    primary: 'border border-primary-text bg-primary-500 text-primary-text shadow-modal ',
    secondary: 'border border-secondary-text bg-secondary-500 text-secondary-text shadow-modal ',
    none: '',
  }

  return (
    <>
      <div
        className={`ModalWrap max-w-[93vw] rounded-xl bg-bg ${width} ${modalPosition} ${
          isOpen ? 'visible scale-100' : 'invisible scale-90'
        }`}
      >
        <div className={`ModalInnerWrap ${className} relative w-full rounded-xl ${modalStyle[style]}`}>
          {title && (
            <Title
              className='absolute left-0 top-0 my-2 w-full text-center'
              type='h4'
              style={style === 'secondary' ? 'secondary' : 'primary'}
              size='xl'
            >
              {title}
            </Title>
          )}
          {onClose && (
            <Button
              className='absolute right-[6px] top-[6px]'
              style='none'
              size='sm'
              icon={<XIcon />}
              onClick={onClose}
            />
          )}
          <div className={`ModalContentWrap mt-12 max-h-[80vh] overflow-y-auto ${padding}`}>{children}</div>
        </div>
      </div>
      {onClose && <Overlay isOpen={isOpen} onClick={onClose} dark />}
    </>
  )
}
