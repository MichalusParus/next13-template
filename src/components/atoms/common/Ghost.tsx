type Props = {
  className?: string
}

export default function Ghost({ className = '' }: Props) {
  const ghostStyle =
    'relative overflow-hidden rounded-lg bg-overlay ' +
    'after:content=[""] after:animate-ghostAnim after:bg-ghostBg after:absolute after:translate-x-[-100%] after:top-0 after:left-0 after:bottom-0 after:right-0'

  return <span className={`${className} block ${ghostStyle}`} />
}
