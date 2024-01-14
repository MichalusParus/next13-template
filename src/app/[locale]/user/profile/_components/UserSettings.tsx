'use client'
import { useState } from 'react'
import { Select } from '@/src/components/molecules/form/select/Select'
import { privateRoutes } from '@/src/constants/routes'
import { locales } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import Title from '@/src/components/atoms/typography/Title'

export default function UserSettings() {
  const t = useTranslations('profile')
  const { locale } = useParams()
  const { push, refresh } = useRouter()
  const [value, setValue] = useState<string>(String(locale))
  const options = Array.from(locales).map((locale) => ({ label: t(locale), value: locale }))

  const handleOnChange = (value: string) => {
    setValue(value)
    push(`/${value}/${privateRoutes.profile}`)
    refresh()
  }

  return (
    <div className='mt-8 w-full'>
      <Title className='my-8' type='h3' align='text-center' size='lg'>
        {t('settings')}
      </Title>
      <Select
        name='languageSelect'
        label={`${t('language')}:`}
        style='secondary'
        options={options}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  )
}
