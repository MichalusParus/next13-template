'use client'
import { useEffect, useState } from 'react'
import { TaskType } from '../_utils/types'
import { usePagination } from '@/src/utils/hooks/usePagination'
import { useTranslations } from 'next-intl'
import TaskTile from './TaskTile'
import Section from '@/src/components/atoms/common/Section'
import Pagination from '@/src/components/organisms/pagination/Pagination'
import P from '@/src/components/atoms/typography/P'

type Props = {
  data: TaskType[]
  selectedTab: string
}

export default function TasksGrid({ data, selectedTab}: Props) {
  const [filteredTasks, setFilteredTasks] = useState(data.filter((d) => d.status === selectedTab))
  const itemsPerPage = 15
  const t = useTranslations('tasks')
  const { pagedData, pages, selectedPage, setSelectedPage } = usePagination(filteredTasks, itemsPerPage)

  useEffect(() => {
    const filtered = data.filter((d) => d.status === selectedTab)
    setFilteredTasks(filtered)
  }, [selectedTab, data])

  return (
    <Section
      className='relative mt-4 flex min-h-[70vh] w-full items-start'
      type='left'
      padding='p-mdx pb-16 sm:p-lgx sm:pb-20'
    >
        <div className='TaskListWrap flex w-full flex-wrap place-content-center place-items-start gap-8'>
          {filteredTasks.length > 0 ? (
            pagedData.map((task) => (
              <div key={task._id} className='w-full sm:w-auto'>
                <TaskTile task={task} />
              </div>
            ))
          ) : (
            <P className='mt-[20%] w-full text-center' size='lg'>
              {t('noTasks')}
            </P>
          )}
          <Pagination
            className='absolute bottom-4 left-1/2 -translate-x-1/2'
            pages={pages}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        </div>
    </Section>
  )
}
