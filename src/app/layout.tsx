import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopPanel from '../components/organisms/header/TopPanel'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next13 Template',
  description: 'Next 13 Template with tailwindCSS',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-bg text-text`}>
        <TopPanel />
        <main className='h-mainHeight w-full overflow-x-auto'>
          <div className='LayoutWrap mx-2 max-w-contentSize py-6 md:mx-10 md:py-10 xl:mx-14 xl:py-14 2xl:mx-auto'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
