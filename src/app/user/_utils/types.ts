export type UserType = {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
  lastLogAt: Date
  createdAt: Date
  updatedAt: Date
}

export type UserInput = {
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
}

export type PasswordChangeInput = {
  email: string
  password: string
  newPassword: string
}
