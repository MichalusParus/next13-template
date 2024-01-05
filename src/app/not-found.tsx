import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not Found || Next 13 Template',
  description: 'Next 13 Template with tailwindCSS',
}

export default function NotFound() {
  return <div className='NotFoundWrap'>OOPs, bad redirect, not found</div>
}
