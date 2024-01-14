import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Section from '@/src/components/atoms/common/Section'
import List from '@/src/components/atoms/typography/List'
import P from '@/src/components/atoms/typography/P'
import Title from '@/src/components/atoms/typography/Title'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    title: t('metadata') + ' || Next 13 Template',
  }
}

export default function AboutPage() {
  const t = useTranslations('about')
  return (
    <div className='PageWrap flex w-full flex-wrap gap-8 md:flex-nowrap'>
      <Section type='center' className='w-full min-w-[20rem]' title={t('title')}>
        <div className='my-4 w-full'>
          <Title type='h5' size='md'>
            Setup
          </Title>
          <P>Project is build by Next 13 with typescript with basic lint and prettier setup</P>
        </div>
        <div className='my-4 w-full'>
          <Title type='h5' size='md'>
            Frontend
          </Title>
          <P>
            Frontend is build by completely custom made components with no aditional libraries, except Yup and React
            Hook Form. Css is handled by tailwind with customizable theme. Components have primary and secondary styles.
            Component are accessible with basic keyboard control.
          </P>
        </div>
        <div className='my-4 w-full'>
          <Title type='h5' size='md'>
            Backend
          </Title>
          <P>
            Currently is MongoDB connected through Mongoose, connect() is located in libs folder and mongoose models in
            models folder. Currently without api, data is fetched directly from DB through Server Actions. Loading,
            errors and refresh is handled by useServerAction hook. Actions are stored inside page folder under utils
            folder.
          </P>
        </div>
        <div className='my-4 w-full'>
          <Title type='h5' size='md'>
            Auth
          </Title>
          <P>
            Authentication and authorization is handled by Next Auth Credencials. Because Next Auth doesnt support
            mongoose, there is separate mongoDb connection under libs folder. User information after log in are stored
            inside JWT token and pass to session. For private path protection there is basic middleware.
          </P>
        </div>
        <div className='my-4 w-full'>
          <Title type='h5' size='md'>
            Localization
          </Title>
          <P>
            Localization is made by Next Intl without translated paths. Routes have dynamic prefix and they are stored
            inside locales folder. Navigation.ts have new router and link with prefix .JSON files are inside messages
            folder.
          </P>
        </div>
      </Section>
      <Section className='w-full md:w-[25rem]' type='center' title={t('commits')}>
        <div className='CommitsWrap w-full'>
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
          <List
            className='mb-6'
            title='#4/Next Auth'
            liType='list-[circle]'
            content={[
              'Next Auth,separate mongoDB setup',
              'Login & Signup pages',
              'Profile & Admin pages',
              'User model & actions',
              'Middleware',
            ]}
          />
          <List
            className='mb-6'
            title='#5/Next Intl & Aria'
            liType='list-[circle]'
            content={['Next Intl setup', 'String translation,errors, metadata', 'Accessibility update', 'Focus traps']}
          />
        </div>
      </Section>
    </div>
  )
}
