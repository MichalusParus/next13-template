import NavBar from '../molecules/NavBar';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  open: Boolean;
  onClick: (value: boolean) => void;
};

export default function MenuContainer({ open, onClick }: Props) {
  const pathName = usePathname();

  useEffect(() => {
    onClick(false);
  }, [pathName]);

  return (
    <div
      className={`absolute top-headerHeight min-w-[35%] border-b border-r border-title bg-primary-bg shadow-md transition-all duration-300 ${
        open ? 'left-0' : '-left-[50%]'
      }`}
    >
      <NavBar menu onClick={onClick} />
    </div>
  );
}
