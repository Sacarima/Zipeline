import { test, expect } from '@playwright/test'

test('job description analysis renders results', async ({ page }) => {
  await page.route('**/api/job-description/analyze', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          roleTitle: 'Frontend Engineer',
          seniority: 'senior',
          summary: [
            'Build UI with React and Next.js',
            'Improve performance and maintainability',
            'Collaborate with design and product',
          ],
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
          confidence: 0.88,
        },
      }),
    })
  })

  await page.goto('/job-description')

  await page.locator('textarea').fill('x'.repeat(250))
  await page.getByRole('button', { name: /analyze/i }).click()

  await expect(page.getByRole('heading', { name: 'Frontend Engineer' })).toBeVisible()

  const mustSection = page.getByRole('region', { name: 'Must-have skills' })
  await expect(mustSection.getByText('React', { exact: true })).toBeVisible()
  await expect(mustSection.getByText('TypeScript', { exact: true })).toBeVisible()

  const niceSection = page.getByRole('region', { name: 'Nice-to-have skills' })
  await expect(niceSection.getByText('GraphQL', { exact: true })).toBeVisible()
})