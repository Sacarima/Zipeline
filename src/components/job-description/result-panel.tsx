'use client'

import * as React from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import type { JobAnalysis } from '@/lib/schemas/job-analysis.schema'

type Props = {
  data: JobAnalysis
}

function Section({
  title,
  children,
  labelledById,
}: {
  title: string
  children: React.ReactNode
  labelledById: string
}) {
  return (
    <section
      aria-labelledby={labelledById}
      className="space-y-2"
    >
      <h3
        id={labelledById}
        className="text-sm font-medium text-muted-foreground"
      >
        {title}
      </h3>
      <div className="rounded-xl border bg-card p-4">{children}</div>
    </section>
  )
}

export default function ResultPanel({ data }: Props) {
  const jsonString = React.useMemo(() => JSON.stringify(data, null, 2), [data])
  const [copied, setCopied] = React.useState<'json' | 'summary' | null>(null)

  const roleTitleId = React.useId()
  const summaryId = React.useId()
  const mustId = React.useId()
  const niceId = React.useId()
  const rawId = React.useId()

  async function copy(text: string, kind: 'json' | 'summary') {
    await navigator.clipboard.writeText(text)
    setCopied(kind)
    window.setTimeout(() => setCopied(null), 1200)
  }

  const summary = data.summary
  const must = data.skills.mustHave
  const nice = data.skills.niceToHave

  return (
    <article
      aria-labelledby={roleTitleId}
      className="space-y-4"
    >
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2
            id={roleTitleId}
            className="text-lg font-semibold"
          >
            {data.roleTitle || 'Analysis'}
          </h2>

          <p className="text-sm text-muted-foreground">
            <span className="sr-only">Seniority:</span>
            <span>Seniority: {data.seniority}</span>
            <span aria-hidden="true"> • </span>
            <span className="sr-only">Confidence:</span>
            <span>
              Confidence:{' '}
              {typeof data.confidence === 'number' ? data.confidence : '-'}
            </span>
          </p>
        </div>

        <div
          className="flex gap-2"
          role="group"
          aria-label="Copy actions"
        >
          <Button
            type="button"
            variant="secondary"
            onClick={() => copy(jsonString, 'json')}
            aria-label="Copy JSON output"
          >
            {copied === 'json' ? 'Copied' : 'Copy JSON'}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => copy(summary.join('\n'), 'summary')}
            disabled={summary.length === 0}
            aria-label="Copy summary text"
          >
            {copied === 'summary' ? 'Copied' : 'Copy summary'}
          </Button>
        </div>

        {/* Announces status to screen readers when Copy happens */}
        <p
          className="sr-only"
          role="status"
          aria-live="polite"
        >
          {copied ? 'Copied to clipboard' : ''}
        </p>
      </header>

      <Separator aria-hidden="true" />

      <Section
        title="Summary"
        labelledById={summaryId}
      >
        {summary.length ? (
          <ul className="list-disc space-y-1 pl-5 text-sm marker:text-muted-foreground">
            {summary.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No summary returned.</p>
        )}
      </Section>

      <div className="grid gap-4 md:grid-cols-2 md:items-start">
        <Section
          title="Must-have skills"
          labelledById={mustId}
        >
          {must.length ? (
            <ul className="list-disc space-y-1 pl-5 text-sm marker:text-muted-foreground">
              {must.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">None detected.</p>
          )}
        </Section>

        <Section
          title="Nice-to-have skills"
          labelledById={niceId}
        >
          {nice.length ? (
            <ul className="list-disc space-y-1 pl-5 text-sm marker:text-muted-foreground">
              {nice.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">None detected.</p>
          )}
        </Section>
      </div>

      <Section
        title="Raw output"
        labelledById={rawId}
      >
        <pre
          className="max-h-[420px] overflow-auto rounded-lg bg-muted p-3 text-xs"
          aria-label="Raw JSON output"
        >
          {jsonString}
        </pre>
      </Section>
    </article>
  )
}