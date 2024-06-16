import bcrypt from 'bcrypt'
import userService from '../user/userService'

export default {
  signup,
  login,
}

async function login(email: string, password: string) {
  try {
    const user = await userService.getByEmail(email)

    if (!user) return Promise.reject('Invalid email or password')

    const match = await bcrypt.compare(password, user.password)

    if (!match) return Promise.reject('Invalid email or password')

    delete user.password
    return user
  } catch (err) {
    console.error(err)
  }
}

async function signup(email: string, password: string, fullName: string) {
  try {
    const saltRounds = 10
    if (!email || !password || !fullName)
      return Promise.reject('fullName, email and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ email, password: hash, fullName })
  } catch (err) {
    console.error(err)
  }
}
