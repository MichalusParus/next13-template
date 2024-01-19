'use client'
import { Button } from '@/src/components/atoms/common/Button'
import Section from '@/src/components/atoms/common/Section'
import Tooltip from '@/src/components/atoms/common/Tooltip'
import CheckIcon from '@/src/components/atoms/icons/CheckIcon'
import ChevronIcon from '@/src/components/atoms/icons/ChevronIcon'
import DeleteIcon from '@/src/components/atoms/icons/DeleteIcon'
import EditIcon from '@/src/components/atoms/icons/EditIcon'
import ErrorIcon from '@/src/components/atoms/icons/ErrorIcon'
import FilterIcon from '@/src/components/atoms/icons/FilterIcon'
import LockIcon from '@/src/components/atoms/icons/LockIcon'
import ProfileIcon from '@/src/components/atoms/icons/ProfileIcon'
import RefreshIcon from '@/src/components/atoms/icons/RefreshIcon'
import SearchIcon from '@/src/components/atoms/icons/SearchIcon'
import SettingIcon from '@/src/components/atoms/icons/SettingIcon'
import SignInIcon from '@/src/components/atoms/icons/SignInIcon'
import SignOutIcon from '@/src/components/atoms/icons/SignOutIcon'
import XIcon from '@/src/components/atoms/icons/XIcon'

export default function IconComponents() {
  return (
    <Section className='mt-8 min-h-[70vh] w-full' type='center' title='Icons'>
      <div className='my-12 flex h-full flex-wrap justify-center gap-4'>
        <Tooltip title='ChevronIcon'>
          <Button style='primary' size='lg' ariaLabel='ChevronIcon' icon={<ChevronIcon />}></Button>
        </Tooltip>
        <Tooltip title='XIcon'>
          <Button style='primary' size='lg' ariaLabel='XIcon' icon={<XIcon />}></Button>
        </Tooltip>
        <Tooltip title='CheckIcon'>
          <Button style='primary' size='lg' ariaLabel='CheckIcon' icon={<CheckIcon />}></Button>
        </Tooltip>
        <Tooltip title='ErrorIcon'>
          <Button style='primary' size='lg' ariaLabel='ErrorIcon' icon={<ErrorIcon />}></Button>
        </Tooltip>
        <Tooltip title='SearchIcon'>
          <Button style='primary' size='lg' ariaLabel='SearchIcon' icon={<SearchIcon />}></Button>
        </Tooltip>
        <Tooltip title='SettingIcon'>
          <Button style='primary' size='lg' ariaLabel='SettingIcon' icon={<SettingIcon />}></Button>
        </Tooltip>
        <Tooltip title='EditIcon'>
          <Button style='primary' size='lg' ariaLabel='EditIcon' icon={<EditIcon />}></Button>
        </Tooltip>
        <Tooltip title='DeleteIcon'>
          <Button style='primary' size='lg' ariaLabel='DeleteIcon' icon={<DeleteIcon />}></Button>
        </Tooltip>
        <Tooltip title='SignInIcon'>
          <Button style='primary' size='lg' ariaLabel='SignInIcon' icon={<SignInIcon />}></Button>
        </Tooltip>
        <Tooltip title='ProfileIcon'>
          <Button style='primary' size='lg' ariaLabel='ProfileIcon' icon={<ProfileIcon />}></Button>
        </Tooltip>
        <Tooltip title='SignOutIcon'>
          <Button style='primary' size='lg' ariaLabel='SignOutIcon' icon={<SignOutIcon />}></Button>
        </Tooltip>
        <Tooltip title='FilterIcon'>
          <Button style='primary' size='lg' ariaLabel='FilterIcon' icon={<FilterIcon />}></Button>
        </Tooltip>
        <Tooltip title='RefreshIcon'>
          <Button style='primary' size='lg' ariaLabel='RefreshIcon' icon={<RefreshIcon />}></Button>
        </Tooltip>
        <Tooltip title='LockIcon'>
          <Button style='primary' size='lg' ariaLabel='LockIcon' icon={<LockIcon />}></Button>
        </Tooltip>
      </div>
    </Section>
  )
}
