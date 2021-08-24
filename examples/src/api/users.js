import Axios from 'axios'

export async function getUserList(params, config) {
  const response = await Axios.get('/api/users', { ...config, params })
  return response.data
}
