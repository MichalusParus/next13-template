import Logo from '../molecules/Logo';
import NavBar from '../molecules/NavBar';
import HamburgerMenu from '../molecules/HamburgerMenu';

export default function TopPanel() {
  return (
    <header
      className={`flex h-headerHeight w-full items-center border-b border-title bg-primary-bg py-4 shadow-md`}
    >
      <div className='mx-6 flex max-w-contentSize items-center md:mx-10 xl:mx-14 2xl:mx-auto'>
        <HamburgerMenu />
        <Logo />
        <NavBar />
      </div>
    </header>
  );
}
