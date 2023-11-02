type Props = {
  open: Boolean;
  onClick: (value: boolean) => void;
};

export default function Overlay({ open, onClick }: Props) {
  return (
    <button
      className={`absolute left-0 top-0 min-h-full min-w-full bg-black opacity-0 transition-all duration-300 ${
        open ? 'visible opacity-20' : 'invisible opacity-0'
      }`}
      onClick={() => onClick(!open)}
    />
  );
}
