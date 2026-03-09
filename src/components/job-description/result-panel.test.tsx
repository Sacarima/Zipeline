import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResultPanel from './result-panel'
import type { JobAnalysis } from '@/lib/schemas/job-analysis.schema'

const mockData: JobAnalysis = {
  roleTitle: 'Frontend Engineer',
  seniority: 'senior',
  summary: ['Build UI', 'Improve performance', 'Collaborate with design'],
  skills: {
    mustHave: ['React', 'TypeScript'],
    niceToHave: ['GraphQL'],
  },
  tech: {
    languages: ['TypeScript'],
    frameworks: ['React', 'Next.js'],
    tooling: [],
    cloud: [],
    testing: ['Jest'],
  },
  confidence: 0.84,
}

describe('ResultPanel', () => {
  it('shows "Copied" after clicking Copy JSON and then resets', async () => {
    const user = userEvent.setup()

    render(<ResultPanel data={mockData} />)

    const button = screen.getByRole('button', { name: /copy json output/i })

    expect(button).toHaveTextContent('Copy JSON')

    await user.click(button)

    expect(button).toHaveTextContent('Copied')

    await waitFor(
      () => {
        expect(button).toHaveTextContent('Copy JSON')
      },
      { timeout: 1500 }
    )
  })

  it('renders empty states and disables summary copy when no summary or skills are returned', () => {
    const emptyData: JobAnalysis = {
      roleTitle: 'Analysis',
      seniority: 'junior',
      summary: [],
      skills: {
        mustHave: [],
        niceToHave: [],
      },
      tech: {
        languages: [],
        frameworks: [],
        tooling: [],
        cloud: [],
        testing: [],
      },
      confidence: 0.5,
    }

    render(<ResultPanel data={emptyData} />)

    expect(screen.getByText('No summary returned.')).toBeInTheDocument()
    expect(screen.getAllByText('None detected.')).toHaveLength(2)

    expect(
      screen.getByRole('button', { name: /copy summary text/i })
    ).toBeDisabled()
  })
})