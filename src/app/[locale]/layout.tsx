import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import TopPanel from '../../components/organisms/header/TopPanel'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next13 Template',
  description: 'Next 13 Template with tailwindCSS',
}

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export default async function RootLayout({ children, params: { locale } }: Props) {
  const session = await getServerSession(authOptions)
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={`${inter.className} bg-bg text-text`}>
          <TopPanel session={session} />
          <main className='h-mainHeight w-full overflow-x-hidden overflow-y-scroll'>
            <div className='LayoutWrap mx-2 max-w-contentSize py-6 md:mx-6 md:py-10 xl:mx-14 xl:py-14 2xl:mx-auto'>
              {children}
            </div>
          </main>
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
