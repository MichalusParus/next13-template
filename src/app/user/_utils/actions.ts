import { connect } from '@/src/libs/mongoose'
import { PasswordChangeInput, UserInput, UserType } from './types'
import { compare, hash } from 'bcrypt'
import User from '@/src/models/user'

export const getUsers = async (): Promise<any> => {
  'use server'
  try {
    connect()
    const users = await User.find({})
    return await JSON.parse(JSON.stringify(users))
  } catch (e: any) {
    return String(Object.values(e.errors)[0])
  }
}

export const createUser = async (user: UserInput): Promise<any> => {
  'use server'
  try {
    connect()
    const existingEmail = await User.findOne({ email: user.email })
    if (existingEmail) {
      throw new Error('Email already used')
    }
    return new Promise((resolve) => {
      hash(user.password, 10, async function (error, hash) {
        if (error) {
          throw new Error('Password hash failed')
        }
        const newUser = new User({
          name: user.name,
          email: user.email,
          password: hash,
          role: 'user',
        })
        const savedUser = await newUser.save()
        resolve(await JSON.parse(JSON.stringify(savedUser)))
      })
    })
  } catch (e: any) {
    if (e.errors) {
      return String(Object.values(e.errors)[0])
    } else {
      return String(e)
    }
  }
}

export const updateUser = async (user: UserType): Promise<any> => {
  'use server'
  try {
    connect()
    const editedUser = new User(user)
    const savedUser = await User.findByIdAndUpdate(user._id, editedUser, { runValidators: true })
    return await JSON.parse(JSON.stringify(savedUser))
  } catch (e: any) {
    return String(Object.values(e.errors)[0])
  }
}

export const changePassword = async (input: PasswordChangeInput): Promise<any> => {
  'use server'
  try {
    connect()
    const userData = await User.findOne({ email: input.email })
    if (!userData) {
      throw new Error('User not found')
    }
    const check = await compare(input!.password, userData.password)
    if (!check) {
      throw new Error('Wrong password')
    }
    return new Promise((resolve) => {
      hash(input.newPassword, 10, async function (error, hash) {
        if (error) {
          throw new Error('Password hash failed')
        }
        const savedUser = await User.findByIdAndUpdate(
          userData._id,
          {
            ...userData,
            password: hash,
          },
          { runValidators: true }
        )
        resolve(await JSON.parse(JSON.stringify(savedUser)))
      })
    })
  } catch (e: any) {
    if (e.errors) {
      return String(Object.values(e.errors)[0])
    } else {
      return String(e)
    }
  }
}

export const deleteUsers = async (ids: string[]): Promise<any> => {
  'use server'
  try {
    connect()
    const deletedItems = await User.deleteMany({ _id: { $in: ids } })
    return await JSON.parse(JSON.stringify(deletedItems))
  } catch (e: any) {
    return String(Object.values(e.errors)[0])
  }
}
