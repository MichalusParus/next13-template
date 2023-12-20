type Props = {
  className?: string
}

export default function SearchIcon({ className = '' }: Props) {
  return (
    <svg className={className} width='1.5rem' height='1.5rem' viewBox='0 0 24 24' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C12.125 19 14.078 18.2635 15.6177 17.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L17.0319 15.6177C18.2635 14.078 19 12.125 19 10C19 5.02944 14.9706 1 10 1ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z'
        fill='currentColor'
      />
    </svg>
  )
}
