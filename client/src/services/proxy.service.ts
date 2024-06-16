import axios from 'axios'

export const proxyService = { get, post, put, remove }

const BASE_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3030'

async function get(endpoint: string) {
  try {
    const res = await axios.get(BASE_URL + endpoint, {
      headers: {
        Authorization: getToken(),
      },
    })
    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function post<T>(endpoint: string, data: T | null = null) {
  try {
    const res = await axios.post(BASE_URL + endpoint, data, {
      headers: {
        Authorization: getToken(),
      },
    })
    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function put<T>(endpoint: string, data: T) {
  try {
    const res = await axios.put(BASE_URL + endpoint, data, {
      headers: {
        Authorization: getToken(),
      },
    })
    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function remove(endpoint: string) {
  try {
    const res = await axios.delete(BASE_URL + endpoint, {
      headers: {
        Authorization: `${getToken()}`,
      },
    })
    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

function getToken() {
  const token = localStorage.getItem('accessToken')
  if (token) return token
  return ''
}
