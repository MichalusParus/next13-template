import { forwardRef } from 'react'
import { Label, Props as LabelProps } from '../Label'
import Span from '@/src/components/atoms/typography/Span'

export type Props = Omit<LabelProps, 'htmlFor'> & {
  name: string
  spread: { min: number; max: number }
  value: number
  style?: 'primary' | 'secondary' | 'none'
  disabled?: boolean
  ariaLabel?: string
  onChange: (value: string) => void
}

export const Range = forwardRef(
  (
    {
      className = '',
      name,
      spread,
      label,
      value,
      style = 'primary',
      size = 'md',
      description,
      hideLabel,
      hideError,
      disabled,
      error,
      ariaLabel = 'range',
      onChange,
      ...rest
    }: Props,
    ref
  ) => {
    const thumbStyle =
      '[&::-webkit-slider-thumb]:appearance-none [&::-moz-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-moz-slider-track]:rounded-full '
    const rangeStyle = {
      primary:
        '[&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-button [&::--moz-range-thumb]:bg-primary-500 [&::--moz-range-thumb]:shadow-button ' +
        '[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-primary-500',
      secondary:
        '[&::-webkit-slider-thumb]:bg-secondary-500 [&::-webkit-slider-thumb]:shadow-button [&::--moz-range-thumb]:bg-secondary-500 [&::--moz-range-thumb]:shadow-button ' +
        '[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-secondary-500',
      none: '',
    }
    const rangeSize = {
      sm: 'py-smy px-smx [&>::-webkit-slider-thumb]:w-smHeight [&>::-webkit-slider-thumb]:h-smHeight [&>::-moz-slider-thumb]:w-smHeight [&>::-moz-slider-thumb]:h-smHeight ',
      md: 'py-mdy px-mdx [&>::-webkit-slider-thumb]:w-mdHeight [&>::-webkit-slider-thumb]:h-mdHeight [&>::-moz-slider-thumb]:w-mdHeight [&>::-moz-slider-thumb]:h-mdHeight ',
      lg: 'py-lgy px-lgx [&>::-webkit-slider-thumb]:w-lgHeight [&>::-webkit-slider-thumb]:h-lgHeight> [&::-moz-slider-thumb]:w-lgHeight> [&::-moz-slider-thumb]:h-lgHeight ',
      none: '',
    }

    return (
      <Label
        className={className}
        name={name}
        label={label}
        style={style}
        size={size}
        error={error}
        description={description}
        hideLabel={hideLabel}
        hideError={hideError}
      >
        <div className={`relative mb-1 flex w-full items-center border border-transparent ${rangeSize[size]}`}>
          <Span className='min-w-[3rem]' size={size}>
            {value}
          </Span>
          <input
            id={name}
            className={`h-2 w-full cursor-pointer appearance-none rounded-lg bg-overlay focus:outline-none ${thumbStyle} ${rangeStyle[style]}`}
            type='range'
            name={name}
            min={spread.min}
            max={spread.max}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            aria-label={ariaLabel}
            {...rest}
          />
        </div>
      </Label>
    )
  }
)

Range.displayName = 'Range'
