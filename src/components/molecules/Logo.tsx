import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <div className='mr-4 2xl:mr-12'>
      <Link href='/'>
        <div className='flex items-center'>
          <Image
            className='mr-2'
            src='/favicon.ico'
            width={30}
            height={30}
            alt='LogoImg'
          />
          <h1 className='text-xl font-semibold text-title xl:text-2xl'>
            Next13 Template
          </h1>
        </div>
      </Link>
    </div>
  );
}
