import { Metadata } from 'next'
import Section from '../components/atoms/common/Section'
import P from '../components/atoms/typography/P'

export const metadata: Metadata = {
  title: 'Home || Next 13 Template',
  description: 'Next 13 Template with tailwindCSS',
}

export default function HomePage() {
  return (
    <Section className='min-h-[80vh]' title='Home'>
      <P align='text-center'>This is homepage of Next13 Template. </P>
    </Section>
  )
}
