import Loader from '@/src/components/atoms/common/Loader'
import Section from '@/src/components/atoms/common/Section'

export default function Loading() {
  return (
    <Section className='min-h-[80vh]'>
      <Loader className='mt-[20%]' />
      Loading
    </Section>
  )
}
