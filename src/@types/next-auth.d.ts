import NextAuth, { User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface User {
    _id: string
    name: string
    email: string
    role: 'user' | 'admin'
    lastLogAt: Date
    createdAt: Date
    updatedAt: Date
  }
  interface Session {
    user: User
  }
}
