import { Metadata } from 'next'
import Section from '@/src/components/atoms/common/Section'
import List from '@/src/components/atoms/typography/List'
import P from '@/src/components/atoms/typography/P'

export const metadata: Metadata = {
  title: 'About || Next 13 Template',
  description: 'Next 13 Template with tailwindCSS',
}

export default function AboutPage() {
  return (
    <div className='flex w-full flex-wrap gap-8 md:flex-nowrap'>
      <Section type='center' className='w-full min-w-[20rem]' title='About'>
        <P>This is About page</P>
      </Section>
      <Section type='center' className='w-full md:w-[20rem]' title='Commits'>
        <div className='w-full'>
          <List
            className='mb-6'
            title='#1/project setup'
            liType='list-[circle]'
            content={['tailwind setup', 'prettier settings', 'eslint config', 'basic layout']}
          />
          <List
            className='mb-6'
            title='#2/parus components'
            liType='list-[circle]'
            content={['common', 'typography', 'icons', 'form', 'popovers', 'pagination', 'table', 'components page']}
          />
          <List
            className='mb-6'
            title='#2.1/components update'
            liType='list-[circle]'
            content={['tabs reworked', 'components roles', 'SearchBar', 'componentsPage update']}
          />
        </div>
      </Section>
    </div>
  )
}
