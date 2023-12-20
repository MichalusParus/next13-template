import { useEffect, useState } from 'react'
import Section from '@/src/components/atoms/common/Section'
import P from '@/src/components/atoms/typography/P'
import Span from '@/src/components/atoms/typography/Span'
import Title from '@/src/components/atoms/typography/Title'
import List from '@/src/components/atoms/typography/List'

export default function TypographyComponents() {
  const sizes: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg']
  const [isLoading, setIsLoading] = useState(true)
  const titleType = {
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
  }
  const titleSize = {
    sm: 'lg',
    md: 'xl',
    lg: '2xl',
    none: '',
  }

  const getAligment = (index: number) => {
    if ((index + 1) % 3 === 0) {
      return 'text-right'
    } else if ((index + 1) % 3 === 2) {
      return 'text-center'
    } else {
      return 'text-left'
    }
  }

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000)
  }, [])

  return (
    <Section className='mt-8 w-full' type='center' title='Typography'>
      <div className='flex flex-wrap items-start justify-center'>
        {sizes
          .map((item) => [item, item, item])
          .flat()
          .map((size, index) => (
            <div className='m-4 block w-full max-w-[24rem]' key={size + index}>
              <Title
                align={getAligment(index)}
                type={titleType[size] as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
                size={titleSize[size] as 'lg' | 'xl' | '2xl'}
                isLoading={isLoading}
              >
                {`Title for ${size} paragraphs`}
              </Title>
              <P align={`${getAligment(index)}`} size={size} isLoading={isLoading} expectedLines={10}>
                {`This is ${size} sized paragraph. ${getAligment(
                  index
                )} aligned paragraph. This is ${size} sized paragraph. ${getAligment(index)} aligned paragraph. `}
                <Span type='bold' size={size}>
                  {`Random ${size} bold span.`}
                </Span>
                {` This is ${size} sized paragraph. ${getAligment(
                  index
                )} aligned paragraph. This is ${size} sized paragraph. ${getAligment(
                  index
                )} aligned paragraph. ${getAligment(index)} aligned paragraph. `}
                <Span type='underline' size={size}>
                  {`Random ${size} underline span.`}
                </Span>
                {` This is ${size} sized paragraph. ${getAligment(
                  index
                )} aligned paragraph. This is ${size} sized paragraph. ${getAligment(
                  index
                )} aligned paragraph. ${getAligment(index)} aligned paragraph. `}
                <Span type='italic' size={size}>
                  {`Random ${size} italic span.`}
                </Span>
                {size !== 'lg' && ` This is ${size} sized paragraph. Center aligned paragraph. `}
                {size === 'sm' && ` This is ${size} sized paragraph. This is ${size} sized paragraph. `}
              </P>
            </div>
          ))}
        <div className='flex flex-wrap'>
          {sizes.map((size) => (
            <div key={size} className='m-4 max-w-[24rem]'>
              <List
                type='ul'
                liType='list-[square]'
                title={`Unorganized square List ${size}`}
                size={size}
                isLoading={isLoading}
                expectedLines={3}
                content={new Array(2).fill(
                  `Unorganized List ${size}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod cum animi dolorum debitis culpa. ${
                    size !== 'lg' && `Unorganized List ${size}. Lorem ipsum.`
                  }  ${
                    size === 'sm' &&
                    `Unorganized List ${size}. Lorem ipsum dolor sit amet consectetur adipisicing elit.`
                  }`
                )}
              />
            </div>
          ))}
        </div>
        <div className='flex flex-wrap'>
          {sizes.map((size) => (
            <div key={size} className='m-4 max-w-[24rem]'>
              <List
                type='ul'
                liType='list-[circle]'
                title={`Unorganized circle List ${size}`}
                size={size}
                isLoading={isLoading}
                expectedLines={3}
                content={new Array(2).fill(
                  `Unorganized List ${size}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod cum animi dolorum debitis culpa. ${
                    size !== 'lg' && `Unorganized List ${size}. Lorem ipsum.`
                  }  ${
                    size === 'sm' &&
                    `Unorganized List ${size}. Lorem ipsum dolor sit amet consectetur adipisicing elit.`
                  }`
                )}
              />
            </div>
          ))}
        </div>
        <div className='flex flex-wrap'>
          {sizes.map((size) => (
            <div key={size} className='m-4 max-w-[24rem]'>
              <List
                type='ol'
                liType='list-[upper-roman]'
                title={`Organized Roman List ${size}`}
                size={size}
                isLoading={isLoading}
                expectedLines={8}
                content={new Array(2).fill(
                  `Organized List ${size}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod cum animi dolorum debitis culpa. Organized List ${size}. ${
                    size !== 'lg' && `Organized List ${size}. Lorem ipsum.`
                  }  ${
                    size === 'sm' && `Organized List ${size}. Lorem ipsum dolor sit amet consectetur adipisicing elit.`
                  }`
                )}
              />
            </div>
          ))}
        </div>
        <div className='flex flex-wrap'>
          {sizes.map((size) => (
            <div key={size} className='m-4 max-w-[24rem]'>
              <List
                type='ol'
                liType='list-[number]'
                title={`Organized Number List ${size}`}
                size={size}
                isLoading={isLoading}
                expectedLines={8}
                content={new Array(2).fill(
                  `Organized List ${size}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod cum animi dolorum debitis culpa. Organized List ${size}. ${
                    size !== 'lg' && `Organized List ${size}. Lorem ipsum.`
                  }  ${
                    size === 'sm' && `Organized List ${size}. Lorem ipsum dolor sit amet consectetur adipisicing elit.`
                  }`
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
