import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TopPanel from '../components/organisms/TopPanel';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next 13 Template',
  description: 'Next 13 Template with tailwindCSS',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-bg text-text`}>
        <TopPanel />
        <main className='mx-6 flex min-h-screen max-w-contentSize flex-col items-center py-6 md:mx-10 md:py-10 xl:mx-14 xl:py-14 2xl:mx-auto'>
          {children}
        </main>
      </body>
    </html>
  );
}
