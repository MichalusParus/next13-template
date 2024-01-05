import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

export const useServerAction = <P, R>(action: (value: P) => Promise<R>) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const runAction = async (args: P) => {
    startTransition(() => {
      action(args).then((data) => {
        try {
          if (!data) {
            throw new Error('server error, no returned data')
          } else if (typeof data === 'string') {
            throw new Error(data)
          } else {
            setError(undefined)
            setIsSuccess(true)
          }
          router.refresh()
        } catch (e: any) {
          setError(String(e))
        }
      })
    })
  }

  return {
    action: runAction,
    isLoading: isPending,
    isSuccess: isSuccess,
    error: error,
  }
}
