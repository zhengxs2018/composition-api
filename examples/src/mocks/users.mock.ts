import Mock from 'better-mock'
import { toSafeInteger } from 'lodash'

import type { User, UsersSearchResponse } from '../api/users'

const users: User[] = Array.from({ length: 65 }).map(generateUser)

Mock.mock('/api/users', 'GET', (req: { url: string }) => {
  const url = new URL(req.url, window.location.origin)
  const searchParams = url.searchParams

  const page = toPage(searchParams.get('page') || 1)
  const pageSize = toPageSize(searchParams.get('pageSize') || 10)
  const skip = (page - 1) * pageSize
  const take = skip + pageSize

  return <UsersSearchResponse>{
    items: users.slice(skip, take),
    total: users.length,
  }
})

function generateUser(): User {
  return Mock.mock({
    id: '@id',
    nickname: '@cname',
  })
}

function toPage(page: number | string): number {
  return Math.max(toSafeInteger(page), 1)
}

function toPageSize(pageSize: number | string): number {
  return Math.min(toSafeInteger(pageSize), 100)
}
