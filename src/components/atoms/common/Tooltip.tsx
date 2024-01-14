type Props = {
  className?: string
  type?: 'top' | 'bottom'
  title: string
  children?: React.ReactNode
}

export default function Tooltip({ className = '', type = 'top', title, children }: Props) {
  const tooltipStyle = 'rounded-md border border-border bg-bg text-text shadow-button '
  const tooltipPosition = {
    top: 'absolute bottom-full left-[50%] translate-x-[-50%] ',
    bottom: 'absolute top-full left-[50%] translate-x-[-50%] ',
  }
  const tooltipVisibility =
    'invisible opacity-0 transition-opacity ' +
    'hover:visible hover:opacity-100 group-hover/tooltip:visible group-hover/tooltip:opacity-100 group-focus-within/tooltip:visible group-focus-within/tooltip:opacity-100 '

  return (
    <div className={`TooltipWrap group/tooltip relative`} role='tooltip' aria-label={title}>
      <div
        className={`Tooltip ${className} m-2 px-smx py-smy text-sm ${tooltipStyle} ${tooltipPosition[type]} ${tooltipVisibility}`}
      >
        {title}
      </div>
      {children}
    </div>
  )
}
