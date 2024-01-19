'use client'
import { useEffect, useState } from 'react'
import { usePagination } from '@/src/utils/hooks/usePagination'
import { Button } from '@/src/components/atoms/common/Button'
import Ghost from '@/src/components/atoms/common/Ghost'
import Loader from '@/src/components/atoms/common/Loader'
import NextImage from '@/src/components/atoms/common/NextImage'
import Section from '@/src/components/atoms/common/Section'
import Pagination from '@/src/components/organisms/pagination/Pagination'
import Tooltip from '@/src/components/atoms/common/Tooltip'
import Avatar from '@/src/components/atoms/common/Avatar'
import NextLink from '@/src/components/atoms/common/NextLink'
import ProfileIcon from '@/src/components/atoms/icons/ProfileIcon'
import { Select } from '@/src/components/molecules/form/select/Select'
import Dropdown from '@/src/components/molecules/popover/Dropdown'
import SettingIcon from '@/src/components/atoms/icons/SettingIcon'

export default function CommonComponents() {
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [paginationStyle, setPaginationStyle] = useState<'primary' | 'secondary' | 'none'>('primary')
  const [paginationSize, setPaginationSize] = useState<'sm' | 'md' | 'lg'>('md')
  type buttonType = 'primary' | 'secondary' | 'menu' | 'delete' | 'disabled'
  const buttonVariants: buttonType[] = ['primary', 'secondary', 'menu', 'delete', 'disabled']
  type linkType = 'primary' | 'secondary' | 'menu' | 'inline'
  const linkVariants: linkType[] = ['primary', 'secondary', 'menu', 'inline']
  const sizes: {
    size: 'sm' | 'md' | 'lg'
  }[] = [{ size: 'sm' }, { size: 'md' }, { size: 'lg' }]
  const data = new Array(350).fill(null).map((data, index) => ({
    id: 'data1' + index,
    name1: 'data1' + index,
    name2: 'data2' + index,
    name3: 'data3' + index,
  }))
  const [paginationData] = useState(data)
  const { pages, selectedPage, setSelectedPage } = usePagination(paginationData, 20)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000)
  }, [])

  return (
    <div className='items-strech mt-8 flex w-full flex-wrap justify-between gap-8'>
      <Section title='Buttons' type='center'>
        <div className='mt-4 flex flex-wrap justify-center'>
          {buttonVariants.map((style) => (
            <div key={style} className='mb-12 flex flex-col items-center justify-between md:mx-8'>
              <div className='flex w-full items-center justify-around'>
                {sizes.map(({ size }) => (
                  <Tooltip key={`${size} icon`} title={`${style} ${size}`}>
                    <Button
                      icon={<ProfileIcon />}
                      className='m-2'
                      style={style === 'disabled' ? 'primary' : style}
                      size={`${size}`}
                      disabled={style === 'disabled'}
                      ariaLabel={`${style}Button ${size}`}
                    />
                  </Tooltip>
                ))}
              </div>
              {sizes.map(({ size }) => (
                <Button
                  key={`${size}`}
                  className='m-2'
                  style={style === 'disabled' ? 'primary' : style}
                  size={size}
                  disabled={style === 'disabled'}
                >
                  {style}Button {size}
                </Button>
              ))}
              {sizes.map(({ size }) => (
                <Button
                  key={`${size}+icon`}
                  className='m-2'
                  icon={<ProfileIcon />}
                  style={style === 'disabled' ? 'primary' : style}
                  size={size}
                  disabled={style === 'disabled'}
                >
                  {style}IconButton {size}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </Section>
      <Section title='Links' type='center' className=' w-full'>
        <div className='mt-4 flex flex-wrap justify-center'>
          {linkVariants.map((style) => (
            <div key={style} className='mb-12 flex flex-col items-center justify-between'>
              <div className='flex w-full items-center justify-around'>
                {sizes.map(({ size }) => (
                  <Tooltip key={`${size} icon`} title={`${style} ${size}`}>
                    <NextLink
                      icon={<ProfileIcon />}
                      href=''
                      className='m-2'
                      style={style}
                      size={`${size}`}
                      ariaLabel={`${style}NextLink ${size}`}
                    />
                  </Tooltip>
                ))}
              </div>
              {sizes.map(({ size }) => (
                <NextLink key={`${size}`} className='m-2' href='' style={style} size={size}>
                  {style}NextLink {size}
                </NextLink>
              ))}
              {sizes.map(({ size }) => (
                <NextLink key={`${size}+icon`} className='m-2' href='' icon={<ProfileIcon />} style={style} size={size}>
                  {style}IconNextLink {size}
                </NextLink>
              ))}
            </div>
          ))}
        </div>
      </Section>
      <Section className='w-full' type='center' title={'NextImage'}>
        <div className='flex flex-col justify-center md:flex-row'>
          <NextImage
            className='m-4'
            src='/favicon.ico'
            alt='dd'
            ratio={80}
            isLoading={isLoading}
            width={'15rem'}
            priority={true}
          />
          <NextImage
            className='m-4'
            src='/favicon.ico'
            alt='dd'
            ratio={100}
            isLoading={isLoading}
            width={'15rem'}
            priority={true}
          />
          <NextImage
            className='m-4'
            src='/favicon.ico'
            alt='dd'
            ratio={120}
            isLoading={isLoading}
            width={'15rem'}
            priority={true}
          />
        </div>
      </Section>

      <Section className='w-full md:w-[47%]' type='center' title={'Loader'}>
        <div className='flex h-full items-center justify-center'>
          <Tooltip className='mb-4' title='Primary Loader'>
            <Loader />
          </Tooltip>
        </div>
      </Section>

      <Section className='w-full md:w-[47%]' type='center' title={'Ghost'}>
        <div className='my-12 flex w-full justify-center'>
          <Ghost className='h-[2rem] w-[10rem]' />
        </div>
      </Section>

      <Section className='w-full md:w-[47%]' type='center' title={'Avatar'}>
        <div className='my-12 flex w-full justify-around'>
          <Avatar session={null} />
        </div>
      </Section>

      <Section className='w-full md:w-[47%]' type='center' title={'Tooltip'}>
        <div className='my-12 flex h-full w-full flex-col items-center justify-center'>
          <Tooltip title='Top tooltip'>Top Tooltip</Tooltip>
          <Tooltip type='bottom' title='Bottom tooltip'>
            Bottom Tooltip
          </Tooltip>
        </div>
      </Section>

      <Section className='relative mb-8 w-full' type='center' title={'Pagination'}>
        <div className='absolute right-0 top-0'>
          <Dropdown
            className='[&_.DropdownContentWrap]:pt-0'
            type='right'
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            hideChevron
            overlay
            style='none'
            size='lg'
            width='w-[10rem]'
            padding='0'
            ariaLabel='Pagination settings'
            title={
              <Tooltip title='Settings'>
                <SettingIcon />
              </Tooltip>
            }
          >
            <Select
              name='style'
              label='Style'
              value={paginationStyle}
              options={[
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'None', value: 'none' },
              ]}
              style='secondary'
              size='sm'
              hideLabel
              hideError
              onChange={(value: 'primary' | 'secondary' | 'none') => setPaginationStyle(value)}
            />
            <Select
              name='size'
              label='Size'
              value={paginationSize}
              options={[
                { label: 'Sm', value: 'sm' },
                { label: 'Md', value: 'md' },
                { label: 'Lg', value: 'lg' },
              ]}
              style='secondary'
              size='sm'
              hideLabel
              hideError
              onChange={(value: 'md' | 'sm' | 'lg') => setPaginationSize(value)}
            />
          </Dropdown>
        </div>
        <div className='my-12 flex w-full flex-col items-center justify-center'>
          <Pagination
            className='my-4'
            pages={pages}
            style={paginationStyle}
            size={paginationSize}
            selectedPage={selectedPage}
            setSelectedPage={(page) => setSelectedPage(page)}
          />
        </div>
      </Section>
    </div>
  )
}
