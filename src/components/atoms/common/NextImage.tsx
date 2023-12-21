import Image from 'next/image'
import Ghost from './Ghost'

type Props = {
  className?: string
  src: string
  alt: string
  ratio: number
  width?: string
  isLoading?: boolean
  priority?: boolean
}

export default function NextImage({
  className = '',
  src,
  alt,
  ratio,
  width = '100%',
  isLoading,
  priority,
  ...rest
}: Props) {
  return (
    <div className={`${className} relative`} style={{ width: `${width}` }}>
      {isLoading ? (
        <div style={{ height: `calc(${width} * ${ratio} / 100)` }}>
          <Ghost className={`h-full w-full`} />
        </div>
      ) : (
        <div className={`relative overflow-hidden`} style={{ paddingTop: `${ratio}%` }}>
          <Image src={src} alt={alt} sizes='100%' fill priority={priority} {...rest} />
        </div>
      )}
    </div>
  )
}
