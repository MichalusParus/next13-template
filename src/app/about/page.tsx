import { Metadata } from 'next'
import Section from '@/src/components/atoms/common/Section'
import List from '@/src/components/atoms/typography/List'
import P from '@/src/components/atoms/typography/P'
import Title from '@/src/components/atoms/typography/Title'

export const metadata: Metadata = {
  title: 'About || Next 13 Template',
  description: 'Next 13 Template with tailwindCSS',
}

export default function AboutPage() {
  return (
    <div className='flex w-full flex-wrap gap-8 md:flex-nowrap'>
      <Section type='center' className='w-full min-w-[20rem]' title='About'>
        <div className='my-4 w-full'>
          <Title type='h5' size='md'>
            Setup
          </Title>
          <P>Project is build by Next 13 in typescript with basic lint and prettier setup</P>
        </div>
        <div className='my-4 w-full'>
          <Title type='h5' size='md'>
            Frontend
          </Title>
          <P>
            Frontend is build by completely custom made components with no aditional libraries, except Yup and React
            Hook Form. Css is handled by tailwind with customizable theme. Components have primary and secondary styles.
          </P>
        </div>
        <div className='my-4 w-full'>
          <Title type='h5' size='md'>
            Backend
          </Title>
          <P>
            Currently is MongoDB connected through Mongoose, connect fn is located in libs folder and mongoose models in
            models folder. Currently without api, data is fetched directly from DB through Server Actions. Loading,
            errors and refresh is handled by useServerAction hook. Actions are stored inside page folder under utils
            folder.{' '}
          </P>
        </div>
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
          <List
            className='mb-6'
            title='#3/mongoDB CRUD'
            liType='list-[circle]'
            content={[
              'mongoDB, mongoose setup',
              'Tasks page',
              'ServerActions, connection hook, validation',
              'routes enum',
              'minor component fixes',
            ]}
          />
        </div>
      </Section>
    </div>
  )
}
