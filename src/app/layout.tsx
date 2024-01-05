import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopPanel from '../components/organisms/header/TopPanel'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Provider from '../context/client-session-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next13 Template',
  description: 'Next 13 Template with tailwindCSS',
}

type Props = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions)
  return (
    <html lang='en'>
      <Provider session={session}>
        <body className={`${inter.className} bg-bg text-text`}>
          <TopPanel />
          <main className='h-mainHeight w-full overflow-y-scroll'>
            <div className='LayoutWrap mx-2 max-w-contentSize py-6 md:mx-6 md:py-10 xl:mx-14 xl:py-14 2xl:mx-auto'>
              {children}
            </div>
          </main>
        </body>
      </Provider>
    </html>
  )
}
