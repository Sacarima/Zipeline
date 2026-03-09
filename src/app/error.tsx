'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error)
    }
  }, [error])

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">
      <section
        aria-labelledby="error-title"
        className="w-full max-w-xl rounded-2xl bg-card p-6 text-center"
      >
        <p className="text-sm text-muted-foreground">Something went wrong</p>

        <h1
          id="error-title"
          className="mt-2 text-2xl font-semibold text-foreground md:text-4xl"
        >
          We hit an unexpected error
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Please try again. If the issue continues, return home and retry the flow.
        </p>

        {error.digest ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-6 flex items-center justify-center gap-2">
          <Button type="button" variant="secondary" onClick={() => reset()}>
            Try again
          </Button>

          <Button asChild>
            <Link href="/">Go to home</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}