import Mock from 'better-mock'
import { toSafeInteger } from 'lodash'

const users = Array.from({ length: 65 }).map(generateUser)

function generateUser() {
  return Mock.mock({
    id: '@id',
    nickname: '@cname',
  })
}

function toPage(page = 1) {
  return Math.max(toSafeInteger(page), 1)
}

function toPageSize(page = 10) {
  return Math.min(toSafeInteger(page), 100)
}

Mock.mock('/api/users', 'GET', req => {
  const url = new URL(req.url, window.location.origin)
  const searchParams = url.searchParams

  const page = toPage(searchParams.get('page'))
  const pageSize = toPageSize(searchParams.get('pageSize'))
  const skip = (page - 1) * pageSize
  const take = skip + pageSize

  return {
    items: users.slice(skip, take),
    total: users.length,
  }
})
