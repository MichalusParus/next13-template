'use client'
import { useEffect, useState } from 'react'
import { TaskType } from '../utils/types'
import { useSearchParams } from 'next/navigation'
import { usePagination } from '@/src/utils/hooks/usePagination'
import TaskTile from './TaskTile'
import Section from '@/src/components/atoms/common/Section'
import Pagination from '@/src/components/organisms/pagination/Pagination'
import P from '@/src/components/atoms/typography/P'
import TaskDetail from './TaskDetail'

type Props = {
  data: TaskType[]
  selectedCategory: string
  updateTask: (task: TaskType) => Promise<{ _id: string }>
  deleteTask: (id: string) => Promise<{ _id: string }>
}

export default function TasksGrid({ data, selectedCategory, updateTask, deleteTask }: Props) {
  const searchParams = useSearchParams()
  const [filteredTasks, setFilteredTasks] = useState(data.filter((d) => d.status === selectedCategory))
  const [taskData, setTaskData] = useState(filteredTasks[0])
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const itemsPerPage = 15
  const { pagedData, pages, selectedPage, setSelectedPage } = usePagination(filteredTasks, itemsPerPage)

  const handleClick = (task: TaskType) => {
    setTaskData(task)
    setIsDetailOpen(true)
  }

  useEffect(() => {
    const filtered = data.filter((d) => d.status === selectedCategory)
    setFilteredTasks(filtered)
  }, [selectedCategory, data])

  useEffect(() => {
    setIsDetailOpen(false)
  }, [searchParams])

  return (
    <Section className='relative mt-4 min-h-[70vh] w-full' padding='p-mdx pb-16 sm:p-lgx sm:pb-20'>
      {isDetailOpen ? (
        <TaskDetail task={taskData} setIsDetailOpen={setIsDetailOpen} updateTask={updateTask} deleteTask={deleteTask} />
      ) : (
        <div className='TaskListWrap flex w-full flex-wrap place-content-center place-items-start gap-6'>
          {filteredTasks.length > 0 ? (
            pagedData.map((task) => (
              <div key={task._id} className='w-full sm:w-auto'>
                <TaskTile task={task} onClick={handleClick} />
              </div>
            ))
          ) : (
            <P className='mt-[20%] w-full text-center' size='lg'>
              No task here! Choose new task!
            </P>
          )}
          <Pagination
            className='absolute bottom-4 left-1/2 -translate-x-1/2'
            pages={pages}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        </div>
      )}
    </Section>
  )
}
