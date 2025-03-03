import { Alert } from 'antd'
import { memo, useMemo } from 'react'
import type { ErrorViewerProps } from './types'
import type { ApiError } from '@/app/types/api.type'

export const ErrorViewer = memo(({ error }: ErrorViewerProps) => {
  const errorMessage = useMemo(() => {
    let err: ApiError | null = null

    if (!!error && typeof error === 'object' && 'data' in error) {
      err = error.data as ApiError
    }

    return {
      message: err?.message || 'Something went wrong',
      descriptions: err?.errors || []
    }
  }, [error])

  return (
    !!error && (
      <Alert
        message={errorMessage.message}
        description={
          errorMessage.descriptions.length > 0 && (
            <ul>
              {errorMessage.descriptions.map(desc => (
                <li key={desc.message}>{desc.message}</li>
              ))}
            </ul>
          )
        }
        type='error'
        showIcon
        className='my-4'
      />
    )
  )
})
