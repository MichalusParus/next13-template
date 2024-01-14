import { compare } from 'bcrypt'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { routes } from '@/src/constants/routes'
import { Adapter } from 'next-auth/adapters'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import clientPromise from '@/src/libs/mongoDB'

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // @ts-expect-error
      async authorize(credentials) {
        const client = await clientPromise
        const users = client.db('nextStartDemo').collection('users')
        const user = await users.findOne({ email: credentials!.email })
        if (!user) {
          throw new Error('Email not found')
        }
        const check = await compare(credentials!.password, user?.password)
        if (!check) {
          throw new Error('credencials dont match')
        }
        await users.findOneAndUpdate({ _id: user._id }, { $set: { lastLogAt: new Date() } })
        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 20 * 60,
  },
  jwt: { maxAge: 20 * 60 },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: token,
      }
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          lastLogAt: user.lastLogAt,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      }
      return token
    },
  },

  adapter: MongoDBAdapter(clientPromise) as Adapter,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
