'use client';

import { useState } from 'react';
import Hamburger from '../atoms/Hamburger';
import Overlay from '../atoms/Overlay';
import MenuContainer from '../atoms/MenuContainer';

export default function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='mr-4 md:hidden'>
      <Overlay open={isMenuOpen} onClick={setIsMenuOpen} />
      <Hamburger open={isMenuOpen} onClick={setIsMenuOpen} />
      <MenuContainer open={isMenuOpen} onClick={setIsMenuOpen} />
    </div>
  );
}
