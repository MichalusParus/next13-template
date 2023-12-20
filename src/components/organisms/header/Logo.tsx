import Image from 'next/image'
import Link from 'next/link'
import Title from '../../atoms/typography/Title'

export default function Logo() {
  const logoSize = 'text-lg md:text-xl xl:text-2xl font-semibold'

  return (
    <div className='mr-4 xl:mr-8'>
      <Link href='/'>
        <div className='flex items-center'>
          <Image className='mr-2' src='/favicon.ico' width={30} height={30} alt='LogoImg' />
          <Title className={`flex whitespace-nowrap ${logoSize}`} type='h1' size='none' style='primary'>
            Next13 Template
          </Title>
        </div>
      </Link>
    </div>
  )
}
