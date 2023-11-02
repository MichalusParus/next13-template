'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  {
    slug: '',
    title: 'Home',
  },
  {
    slug: 'about',
    title: 'About',
  },
];

type Props = {
  menu?: boolean;
  onClick?: (value: boolean) => void;
};

export default function NavBar({ menu, onClick = () => {} }: Props) {
  const pathName = usePathname();

  const navItemStyle = menu
    ? `w-full p-4 text-center font-medium hover:bg-primary-bgHover`
    : 'mr-3 px-2 font-medium md:text-base xl:text-lg';

  return (
    <nav className={menu ? 'flex flex-col' : 'hidden md:flex'}>
      {navLinks.map(({ slug, title }) =>
        pathName === '/' + slug && menu ? (
          <button
            key={slug}
            onClick={() => onClick(false)}
            className={`${navItemStyle}`}
          >
            {title}
          </button>
        ) : (
          <Link
            key={slug}
            href={`/${slug}`}
            className={`${navItemStyle}`}
          >
            {title}
          </Link>
        )
      )}
    </nav>
  );
}
