'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">
      <section
        aria-labelledby="not-found-title"
        className="w-full rounded-2xl bg-card p-6 text-center"
      >
        <p className="text-xl text-muted-foreground" aria-label="Error code 404">
          404
        </p>

        <h1 id="not-found-title" className="mt-2 text-sm text-foreground md:text-8xl">
          We can&apos;t find that page
        </h1>

        <p>
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2">
          <Button asChild>
            <Link href="/">Go to home</Link>
          </Button>

          <Button type="button" variant="secondary" onClick={() => history.back()}>
            Go back
          </Button>
        </div>
      </section>
    </main>
  )
}