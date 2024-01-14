'use client'
import { useState } from 'react'
import { Select } from '@/src/components/molecules/form/select/Select'
import { object, string, number, array } from 'yup'
import { useTranslations } from 'next-intl'
import Section from '@/src/components/atoms/common/Section'
import Tooltip from '@/src/components/atoms/common/Tooltip'
import SettingIcon from '@/src/components/atoms/icons/SettingIcon'
import Form from '@/src/components/molecules/form/Form'
import FormAutoComplete from '@/src/components/molecules/form/autocomplete/FormAutoComplete'
import FormCheckbox from '@/src/components/molecules/form/checkbox/FormCheckbox'
import FormInput from '@/src/components/molecules/form/input/FormInput'
import FormRadio from '@/src/components/molecules/form/radio/FormRadio'
import FormSelect from '@/src/components/molecules/form/select/FormSelect'
import FormTextArea from '@/src/components/molecules/form/textarea/FormTextArea'
import Dropdown from '@/src/components/molecules/popover/Dropdown'

export default function FormComponents() {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [success, setSuccess] = useState<{ label: string; message: string; onSuccess: () => void } | undefined>()
  const [error, setError] = useState('')
  const [style, setStyle] = useState<'primary' | 'secondary' | 'none'>('primary')
  const [size, setSize] = useState<'md' | 'sm' | 'lg'>('md')
  const t = useTranslations('errors')

  return (
    <Section className='relative mt-8' title='Form' type='center'>
      <div className='absolute right-0 top-0'>
        <Dropdown
          className='[&_.DropdownContentWrap]:pt-0'
          type='right'
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          hideChevron
          overlay
          style='none'
          size='lg'
          width='w-[10rem]'
          padding='0'
          ariaLabel='Form settings'
          title={
            <Tooltip title='Settings'>
              <SettingIcon />
            </Tooltip>
          }
        >
          <Select
            name='style'
            label='Style'
            value={style}
            options={[
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
              { label: 'None', value: 'none' },
            ]}
            style='secondary'
            size='sm'
            hideLabel
            hideError
            onChange={(value: 'primary' | 'secondary' | 'none') => setStyle(value)}
          />
          <Select
            name='size'
            label='Size'
            value={size}
            options={[
              { label: 'Sm', value: 'sm' },
              { label: 'Md', value: 'md' },
              { label: 'Lg', value: 'lg' },
            ]}
            style='secondary'
            size='sm'
            hideLabel
            hideError
            onChange={(value: 'md' | 'sm' | 'lg') => setSize(value)}
          />
        </Dropdown>
      </div>
      <Form
        className='w-full'
        style={'primary'}
        initialValues={{
          input: '',
          number: undefined,
          textarea: '',
          state: '',
          region: '',
          checkboxGroup: [''],
          checkbox: [''],
          checkboxcolumn: [''],
          radio: '',
          radiocolumn: '',
        }}
        validationSchema={object().shape({
          input: string().required(t('required', { field: 'input' })),
          number: number().required(t('required', { field: 'number' })),
          textarea: string().required(t('required', { field: 'textarea' })),
          state: string().required(t('required', { field: 'select' })),
          region: string().required(t('required', { field: 'autoComplete' })),
          radio: string().required(t('required', { field: 'radio' })),
          radiocolumn: string().required(t('required', { field: 'radiocolumn' })),
          checkbox: array()
            .of(string())
            .required(t('required', { field: 'checkbox' })),
          checkboxGroup: array().required(t('required', { field: 'checkboxGroup' })),
          checkboxcolumn: array().required(t('required', { field: 'checkboxcolumn' })),
        })}
        onSubmit={(values) => {
          setIsLoading(true)
          setTimeout(() => {
            if (error) {
              console.log(values)
              setIsLoading(false)
              setError('')
              setSuccess({ label: 'Continue', message: 'Great success!!', onSuccess: () => {} })
            } else {
              setIsLoading(false)
              setError('Terrible error')
            }
          }, 5000)
        }}
        submit='Submit'
        size={size}
        isLoading={isLoading}
        success={success}
        error={error}
      >
        <div className='mt-12 flex w-full flex-wrap items-start justify-around'>
          <div className='flex w-[30rem] flex-col items-start justify-start lg:mx-4'>
            <FormInput style={style} size={size} name='input' label='Input:' placeholder='Input Text' />
            <FormInput
              type='number'
              style={style}
              size={size}
              name='number'
              label='Input:'
              placeholder='Input Number'
            />
            <FormTextArea style={style} size={size} name='textarea' label='Text Area:' placeholder='Text Area' />
            <FormSelect
              style={style}
              size={size}
              name='state'
              label='State:'
              options={[
                { label: 'label1', value: 'value1' },
                { label: 'label2', value: 'value2' },
                { label: 'label3', value: 'value3' },
              ]}
              placeholder='States...'
            />
            <FormAutoComplete
              style={style}
              size={size}
              name='region'
              label='Region:'
              placeholder='Regions...'
              createNew={{ title: 'Create +', handleCreate: () => {} }}
              options={[
                { label: 'label1', value: 'value1' },
                { label: 'label2', value: 'value2' },
                { label: 'label3', value: 'value3' },
              ]}
            />
          </div>
          <div className='mx-4 flex w-[30rem] flex-col items-start justify-start'>
            <FormCheckbox
              name='checkbox'
              style={style}
              size={size}
              label='Checkbox:'
              options={[{ label: 'label1', value: 'value1' }]}
            />
            <FormCheckbox
              name='checkboxGroup'
              style={style}
              size={size}
              label='CheckboxGroup:'
              options={[
                { label: 'label1', value: 'value14' },
                { label: 'label2', value: 'value24' },
                { label: 'label3', value: 'value34' },
              ]}
            />
            <FormCheckbox
              type='column'
              style={style}
              size={size}
              name='checkboxcolumn'
              label='Checkbox-Column:'
              options={[
                { label: 'label1', value: 'value11' },
                { label: 'label2', value: 'value21' },
                { label: 'label3', value: 'value31' },
              ]}
            />
            <FormRadio
              name='radio'
              style={style}
              size={size}
              label='Radio:'
              options={[
                { label: 'label1', value: 'value12' },
                { label: 'label2', value: 'value22' },
                { label: 'label3', value: 'value32' },
              ]}
            />
            <FormRadio
              type='column'
              style={style}
              size={size}
              name='radiocolumn'
              label='Radio-Column:'
              options={[
                { label: 'label1', value: 'value13' },
                { label: 'label2', value: 'value23' },
                { label: 'label3', value: 'value33' },
              ]}
            />
          </div>
        </div>
      </Form>
    </Section>
  )
}
