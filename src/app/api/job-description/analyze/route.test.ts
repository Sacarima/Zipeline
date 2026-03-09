import { describe, expect, it, vi } from 'vitest'
import { POST } from './route'

vi.mock('@/lib/openai/analyze-job', () => {
  return {
    analyzeJobDescription: vi.fn(async () => ({
      roleTitle: 'Frontend Engineer',
      seniority: 'senior',
      summary: ['Build UI', 'Improve performance', 'Collaborate with design'],
      skills: { mustHave: ['React'], niceToHave: ['GraphQL'] },
      tech: {
        languages: ['TypeScript'],
        frameworks: ['React', 'Next.js'],
        tooling: [],
        cloud: [],
        testing: ['Jest'],
      },
      confidence: 0.9,
    })),
  }
})

describe('POST /api/job-description/analyze', () => {
  it('returns 400 for short input', async () => {
    const req = new Request('http://localhost/api/job-description/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'too short' }),
    })

    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 200 and data for valid input', async () => {
    const req = new Request('http://localhost/api/job-description/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'x'.repeat(250) }),
    })

    const res = await POST(req)
    expect(res.status).toBe(200)

    const json = await res.json()
    expect(json.data.roleTitle).toBe('Frontend Engineer')
    expect(Array.isArray(json.data.summary)).toBe(true)
  })

  it('returns 503 when OpenAI is not configured', async () => {
    const { analyzeJobDescription } = await import('@/lib/openai/analyze-job')

    ;(analyzeJobDescription as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('OPENAI_API_KEY is missing. Configure it in your environment variables.')
    )

    const req = new Request('http://localhost/api/job-description/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'x'.repeat(250) }),
    })

    const res = await POST(req)
    expect(res.status).toBe(503)

    const json = await res.json()
    expect(json.error).toBe('OpenAI is not configured')
  })

  it('returns 502 when analysis fails for a non-OpenAI reason', async () => {
    const { analyzeJobDescription } = await import('@/lib/openai/analyze-job')

    ;(analyzeJobDescription as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Upstream provider timeout')
    )

    const req = new Request('http://localhost/api/job-description/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'x'.repeat(250) }),
    })

    const res = await POST(req)
    expect(res.status).toBe(502)

    const json = await res.json()
    expect(json.error).toBe('Failed to analyze job description')
    expect(json.details).toBe('Upstream provider timeout')
  })

  it('returns 502 when analysis fails for a non-OpenAI reason', async () => {
  const { analyzeJobDescription } = await import('@/lib/openai/analyze-job')

  ;(analyzeJobDescription as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
    new Error('Upstream provider timeout')
  )

  const req = new Request('http://localhost/api/job-description/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'x'.repeat(250) }),
  })

  const res = await POST(req)

  expect(res.status).toBe(502)

  const json = await res.json()
  expect(json.error).toBe('Failed to analyze job description')
  expect(json.details).toBe('Upstream provider timeout')
})
})