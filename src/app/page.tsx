import NextLink from '../components/atoms/common/NextLink'
import Section from '../components/atoms/common/Section'
import P from '../components/atoms/typography/P'

// TO DO

export default function HomePage() {
  return (
    <Section title='Home'>
      <P align='text-center'>
        This is homepage of Next13 Template. And this is{' '}
        <NextLink style='inline' href=''>
          inline link
        </NextLink>
      </P>
    </Section>
  )
}
