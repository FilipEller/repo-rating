import { render, within } from '@testing-library/react-native'
//N import {  } from '@testing-library/dom'

import { RepositoryListContainer } from './RepositoryList'

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      }

      const { getAllByTestId, debug } = render(
        <RepositoryListContainer repositories={repositories} />
      )

      const repositoryItems = getAllByTestId('repositoryItem')
      const [firstRepositoryItem, secondRepositoryItem, ...rest] =
        repositoryItems

      debug()

      expect(firstRepositoryItem).toBeDefined()
      expect(secondRepositoryItem).toBeDefined()
      expect(rest).toHaveLength(0)

      expect(firstRepositoryItem).toHaveTextContent(/jaredpalmer\/formik/i)
      expect(secondRepositoryItem).toHaveTextContent(
        /async-library\/react-async/i
      )

      expect(firstRepositoryItem).toHaveTextContent(
        /build forms in react, without the tears/i
      )
      expect(secondRepositoryItem).toHaveTextContent(
        /flexible promise-based react data loader/i
      )

      expect(firstRepositoryItem).toHaveTextContent(/typescript/i)
      expect(secondRepositoryItem).toHaveTextContent(/javascript/i)

      expect(within(firstRepositoryItem).getByText(/1.6k/i)).toBeDefined()
      expect(within(firstRepositoryItem).getByText(/21.9k/i)).toBeDefined()
      expect(within(firstRepositoryItem).getByText(/88/i)).toBeDefined()
      expect(within(firstRepositoryItem).getByText(/3/i)).toBeDefined()

      expect(within(secondRepositoryItem).getByText(/69/i)).toBeDefined()
      expect(within(secondRepositoryItem).getByText(/1.8/i)).toBeDefined()
      expect(within(secondRepositoryItem).getByText(/72/i)).toBeDefined()
      expect(within(secondRepositoryItem).getByText(/3/i)).toBeDefined()
    })
  })
})
