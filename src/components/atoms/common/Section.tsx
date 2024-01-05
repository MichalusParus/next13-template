import Title from '../typography/Title'

type Props = {
  className?: string
  type?: 'left' | 'center'
  style?: 'main' | 'primary' | 'secondary' | 'none'
  title?: string
  padding?: string
  children: React.ReactNode | React.ReactNode[]
}

export default function Section({
  className = '',
  type = 'center',
  style = 'main',
  title,
  padding = 'py-3 px-6 md:py-6 md:px-12',
  children,
}: Props) {
  const sectionType = {
    left: '',
    center: 'flex flex-col items-center',
  }
  const sectionStyle = {
    main: 'border border-text rounded-md bg-overlay text-text shadow-active',
    primary: 'border border-primary-text rounded-md bg-primary-500 text-text shadow-active',
    secondary: 'border border-secondary-text rounded-md bg-secondary-500 text-secondary-text shadow-active',
    none: '',
  }

  return (
    <section className={`${className} ${sectionType[type]} ${sectionStyle[style]} ${padding}`}>
      {title ? (
        <Title className={`mb-8 ${sectionType[type]}`} type='h2' size='2xl'>
          {title}
        </Title>
      ) : null}
      {children}
    </section>
  )
}
