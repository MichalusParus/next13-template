import { useRouter } from '@/src/navigation'
import { useState, useTransition } from 'react'

export const useServerAction = <P, R>(action: (value: P) => Promise<R>) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const reset = () => {
    setIsSuccess(false)
    setError(undefined)
    router.refresh()
  }

  const runAction = async (args: P) => {
    startTransition(() => {
      action(args)
        .then((data) => {
          setError(undefined)
          setIsSuccess(true)
          router.refresh()
        })
        .catch((e) => {
          const error = String(e).split(':')
          setError(error[error.length - 1])
        })
    })
  }

  return {
    action: runAction,
    isLoading: isPending,
    isSuccess: isSuccess,
    error: error,
    reset: reset,
  }
}
