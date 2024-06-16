import authService from './authService'
import { Request, Response } from 'express'

import userService from '../user/userService'
import { jwtService } from '../../services/jwtService'

export default { login, signup, logout }

async function login(req: Request, res: Response) {
  const { email, password } = req.body
  try {
    const user = await authService.login(email, password)

    const accessToken = jwtService.createTokens(user)

    res.status(201).json({ user, accessToken })
  } catch (err) {
    console.error(err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function signup(req: Request, res: Response) {
  try {
    const { email, password, fullName } = req.body

    const userFromDB = await userService.getByEmail(email)
    if (userFromDB) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    await authService.signup(email, password, fullName)
    const user = await authService.login(email, password)
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).send({ err: 'Failed to signup' })
  }
}

async function logout(req: Request, res: Response) {
  try {
    req.session.destroy((err) => console.log()) // ?
    res.clearCookie('access-token')
    res.send({ msg: 'Logged out successfully' })
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' })
  }
}
