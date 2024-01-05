import Loader from '@/src/components/atoms/common/Loader'
import Section from '@/src/components/atoms/common/Section'
import Tabs from '@/src/components/molecules/popover/Tabs'
import React from 'react'

export default function Loading() {
    const tabs = [
        { label: 'Common', slug: 'common', component: (
            <Section className='mt-4 min-h-[70vh] w-full'>
              <Loader className='mt-[20%]' />
            </Section>
          ) },
        { label: 'Typography', slug: 'typography', component: <></>},
        { label: 'Icons', slug: 'icons', component: <></> },
        { label: 'Form', slug: 'form', component: <></>},
        { label: 'Popovers', slug: 'popovers', component: <></> },
        { label: 'Tables', slug: 'tables', component: <></> },
      ]

  return <Tabs tabs={tabs} />
}
