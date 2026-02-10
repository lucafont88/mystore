import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'services/*/vitest.config.ts',
  'shared/vitest.config.ts',
  {
    test: {
      exclude: ['**/node_modules/**', '**/dist/**'],
      pool: 'forks',
      poolOptions: {
        forks: {
          singleFork: true,
        },
      },
    }
  }
])
