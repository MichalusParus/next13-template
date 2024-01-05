import Loader from '@/src/components/atoms/common/Loader'
import Section from '@/src/components/atoms/common/Section'
import Tabs from '@/src/components/molecules/popover/Tabs'
import React from 'react'

export default function Loading() {
  const tabs = [
    {
      label: 'In Progress',
      slug: 'in-progress',
      component: (
        <Section className='mt-4 min-h-[70vh] w-full'>
          <Loader className='mt-[20%]' />
        </Section>
      ),
    },
    {
      label: 'To Do',
      slug: 'to-do',
      component: <></>,
    },
    {
      label: 'Completed',
      slug: 'completed',
      component: <></>,
    },
    {
      label: 'BackLog',
      slug: 'backlog',
      component: <></>,
    },
    {
      label: '+ Create Task',
      slug: 'form',
      component: <></>,
    },
  ]

  return <Tabs tabs={tabs} />
}
