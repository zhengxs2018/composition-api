import Axios, { AxiosRequestConfig } from 'axios'

export type User = {
  id: string
  nickname: string
}

export type UsersSearchResponse = {
  items: User[]
  total: number
}

export type UsersSearchParams = {
  page?: number | string
  pageSize?: number | string
}

export async function getUserList(
  params: UsersSearchParams,
  config?: AxiosRequestConfig
): Promise<UsersSearchResponse> {
  const response = await Axios.get('/api/users', {
    ...config,
    params,
  })
  return response.data
}
