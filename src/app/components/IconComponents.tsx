'use client'
import Button from '@/src/components/atoms/common/Button'
import Section from '@/src/components/atoms/common/Section'
import Tooltip from '@/src/components/atoms/common/Tooltip'
import CheckIcon from '@/src/components/atoms/icons/CheckIcon'
import ChevronIcon from '@/src/components/atoms/icons/ChevronIcon'
import DeleteIcon from '@/src/components/atoms/icons/DeleteIcon'
import EditIcon from '@/src/components/atoms/icons/EditIcon'
import ErrorIcon from '@/src/components/atoms/icons/ErrorIcon'
import FilterIcon from '@/src/components/atoms/icons/FilterIcon'
import ProfileIcon from '@/src/components/atoms/icons/ProfileIcon'
import RefreshIcon from '@/src/components/atoms/icons/RefreshIcon'
import SearchIcon from '@/src/components/atoms/icons/SearchIcon'
import SettingIcon from '@/src/components/atoms/icons/SettingIcon'
import SignInIcon from '@/src/components/atoms/icons/SignInIcon'
import SignOutIcon from '@/src/components/atoms/icons/SignOutIcon'
import XIcon from '@/src/components/atoms/icons/XIcon'

export default function IconComponents() {
  return (
    <Section className='mt-8 w-full' type='center' title='Icons'>
      <div className='my-12 flex h-full flex-wrap justify-center gap-4'>
        <Tooltip title='ChevronIconv'>
          <Button style='primary' size='lg' icon={<ChevronIcon />}></Button>
        </Tooltip>
        <Tooltip title='XIcon'>
          <Button style='primary' size='lg' icon={<XIcon />}></Button>
        </Tooltip>
        <Tooltip title='CheckIcon'>
          <Button style='primary' size='lg' icon={<CheckIcon />}></Button>
        </Tooltip>
        <Tooltip title='ErrorIcon'>
          <Button style='primary' size='lg' icon={<ErrorIcon />}></Button>
        </Tooltip>
        <Tooltip title='SearchIcon'>
          <Button style='primary' size='lg' icon={<SearchIcon />}></Button>
        </Tooltip>
        <Tooltip title='SettingIcon'>
          <Button style='primary' size='lg' icon={<SettingIcon />}></Button>
        </Tooltip>
        <Tooltip title='EditIcon'>
          <Button style='primary' size='lg' icon={<EditIcon />}></Button>
        </Tooltip>
        <Tooltip title='DeleteIcon'>
          <Button style='primary' size='lg' icon={<DeleteIcon />}></Button>
        </Tooltip>
        <Tooltip title='SignInIcon'>
          <Button style='primary' size='lg' icon={<SignInIcon />}></Button>
        </Tooltip>
        <Tooltip title='ProfileIcon'>
          <Button style='primary' size='lg' icon={<ProfileIcon />}></Button>
        </Tooltip>
        <Tooltip title='SignOutIcon'>
          <Button style='primary' size='lg' icon={<SignOutIcon />}></Button>
        </Tooltip>
        <Tooltip title='FilterIcon'>
          <Button style='primary' size='lg' icon={<FilterIcon />}></Button>
        </Tooltip>
        <Tooltip title='RefreshIcon'>
          <Button style='primary' size='lg' icon={<RefreshIcon />}></Button>
        </Tooltip>
      </div>
    </Section>
  )
}
