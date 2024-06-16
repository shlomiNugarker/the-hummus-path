/* eslint-disable @typescript-eslint/no-explicit-any */
import { proxyService } from './proxy.service'

export const authService = {
  login,
  logout,
  signup,
  getLoggedUser,
  getAccessToken,
}

const STORAGE_KEY_LOGGED_USER = 'logged_user'

async function login(userCred: { email: string; password: string }) {
  const data = await proxyService.post('/api/auth/login', userCred)

  if (data.user)
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken)

      return _saveLocalUser(data.user)
    }
}

async function signup(userCred: any) {
  const user = await proxyService.post('/api/auth/signup', userCred)
  return _saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGED_USER)
  localStorage.clear()
  return await proxyService.remove('/api/auth/logout')
}

function _saveLocalUser(user: any) {
  sessionStorage.setItem(STORAGE_KEY_LOGGED_USER, JSON.stringify(user))
  return user
}

function getLoggedUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER) || 'null')
}

function getAccessToken() {
  return localStorage.getItem('accessToken')
}
