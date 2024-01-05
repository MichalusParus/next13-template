import { connect } from '@/src/libs/mongoose'
import { TaskType } from './types'
import Task from '@/src/models/task'

export const getTasks = async (): Promise<any> => {
  'use server'
  try {
    connect()
    const tasks = await Task.find({})
    return await JSON.parse(JSON.stringify(tasks))
  } catch (e: any) {
    return String(Object.values(e.errors)[0])
  }
}

export const createTask = async (task: TaskType): Promise<any> => {
  'use server'
  try {
    connect()
    const newTask = new Task(task)
    const savedTask = await newTask.save()
    return await JSON.parse(JSON.stringify(savedTask))
  } catch (e: any) {
    return String(Object.values(e.errors)[0])
  }
}

export const updateTask = async (task: TaskType): Promise<any> => {
  'use server'
  try {
    connect()
    const editedTask = new Task(task)
    const savedTask = await Task.findByIdAndUpdate(task._id, editedTask, { runValidators: true })
    return await JSON.parse(JSON.stringify(savedTask))
  } catch (e: any) {
    return String(Object.values(e.errors)[0])
  }
}

export const deleteTask = async (id: string): Promise<any> => {
  'use server'
  try {
    connect()
    const deletedItem = await Task.findByIdAndDelete(id)
    return await JSON.parse(JSON.stringify(deletedItem))
  } catch (e: any) {
    return String(Object.values(e.errors)[0])
  }
}
