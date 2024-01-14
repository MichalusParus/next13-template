import { routes } from '@/src/constants/routes'
import Image from 'next/image'
import Title from '../../atoms/typography/Title'
import NextLink from '../../atoms/common/NextLink'

export default function Logo() {
  const logoSize = 'text-lg md:text-xl xl:text-2xl font-semibold'

  return (
    <div className='mr-4 xl:mr-8'>
      <NextLink
        className='flex rounded-sm focus:outline-none focus-visible:outline-offset-4 focus-visible:outline-text '
        style='none'
        size='none'
        href={routes.home}
      >
        <div className='flex items-center'>
          <Image className='mr-2' src='/favicon.ico' width={30} height={30} alt='Logo' />
          <Title className={`flex whitespace-nowrap ${logoSize}`} type='h1' size='none' style='primary'>
            Next13 Template
          </Title>
        </div>
      </NextLink>
    </div>
  )
}
