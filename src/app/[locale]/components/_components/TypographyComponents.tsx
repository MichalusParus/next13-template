'use client'
import { useEffect, useState } from 'react'
import { Select } from '@/src/components/molecules/form/select/Select'
import Section from '@/src/components/atoms/common/Section'
import P from '@/src/components/atoms/typography/P'
import Span from '@/src/components/atoms/typography/Span'
import Title from '@/src/components/atoms/typography/Title'
import Dropdown from '@/src/components/molecules/popover/Dropdown'
import SettingIcon from '@/src/components/atoms/icons/SettingIcon'
import List from '@/src/components/atoms/typography/List'
import Tooltip from '@/src/components/atoms/common/Tooltip'

export default function TypographyComponents() {
  const [isOpen, setIsOpen] = useState(false)
  const [style, setStyle] = useState<'primary' | 'secondary' | 'none'>('primary')
  const [size, setSize] = useState<'md' | 'sm' | 'lg'>('md')
  const align: ('text-left' | 'text-center' | 'text-right')[] = ['text-left', 'text-center', 'text-right']
  const ulListType = ['list-[circle]', 'list-[square]', 'list-disc']
  const olListType = ['list-[upper-roman]', 'list-[lower-roman]', 'list-[decimal]']

  const [isLoading, setIsLoading] = useState(true)
  const titleType = {
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
  }

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000)
  }, [])

  return (
    <Section className='relative mt-8 w-full' type='center' title='Typography'>
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
          ariaLabel='Typography settings'
          title={
            <Tooltip title='Settings'>
              <SettingIcon />
            </Tooltip>
          }
        >
          <Select
            name='style'
            label='Style'
            value={style}
            options={[
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
              { label: 'None', value: 'none' },
            ]}
            style='secondary'
            size='sm'
            hideLabel
            hideError
            onChange={(value: 'primary' | 'secondary' | 'none') => setStyle(value)}
          />
          <Select
            name='size'
            label='Size'
            value={size}
            options={[
              { label: 'Sm', value: 'sm' },
              { label: 'Md', value: 'md' },
              { label: 'Lg', value: 'lg' },
            ]}
            style='secondary'
            size='sm'
            hideLabel
            hideError
            onChange={(value: 'md' | 'sm' | 'lg') => setSize(value)}
          />
        </Dropdown>
      </div>
      <div className='w-full'>
        <div className='flex min-w-full flex-col items-center lg:flex-row'>
          {align.map((a) => (
            <div className='m-4 w-full max-w-[24rem]' key={a}>
              <Title
                align={a}
                type={titleType[size] as 'h4' | 'h5' | 'h6'}
                style={style}
                size={size}
                isLoading={isLoading}
              >
                {`Title for ${size} paragraphs`}
              </Title>
              <P align={a} style={style} size={size} isLoading={isLoading} expectedLines={10}>
                {`This is ${size} sized paragraph. ${a} aligned paragraph. This is ${size} sized paragraph. ${a} aligned paragraph. `}
                <Span type='bold' size={size}>{`Random bold span.`}</Span>
                {` This is ${size} sized paragraph. ${a} aligned paragraph. This is ${size} sized paragraph. ${a} aligned paragraph. ${a} aligned paragraph. `}
                <Span type='underline' size={size}>{`Random underline span.`}</Span>
                {` This is ${size} sized paragraph. ${a} aligned paragraph. This is ${size} sized paragraph. ${a} aligned paragraph. ${a} aligned paragraph. `}
                <Span type='italic' size={size}>{`Random italic span.`}</Span>
              </P>
            </div>
          ))}
        </div>

        <div className='flex flex-col lg:flex-row'>
          {ulListType.map((typ) => (
            <div key={typ} className='m-4 w-full max-w-[24rem]'>
              <List
                type='ul'
                liType={typ}
                title={`Unorganized List ${size}`}
                size={size}
                isLoading={isLoading}
                expectedLines={9}
                content={new Array(3).fill(
                  `Unorganized List ${size}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod cum animi dolorum debitis culpa.`
                )}
              />
            </div>
          ))}
        </div>
        <div className='flex flex-col lg:flex-row'>
          {olListType.map((typ) => (
            <div key={typ} className='m-4 w-full max-w-[24rem]'>
              <List
                type='ol'
                liType={typ}
                title={`Organized List ${size}`}
                size={size}
                isLoading={isLoading}
                expectedLines={9}
                content={new Array(3).fill(
                  `Organized List ${size}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod cum animi dolorum debitis culpa.`
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
