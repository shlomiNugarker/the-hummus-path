import userService from './userService'
import { Request, Response } from 'express'

export default {
  getUserByEmail,
  updateUser,
  addUser,
}

async function getUserByEmail(req: Request, res: Response) {
  try {
    const user = await userService.getByEmail(req.params.email)
    res.send(user)
  } catch (err) {
    console.error(err)
    res.status(500).send({ err: 'Failed to get user' })
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const user = req.body
    const savedUser = await userService.update(user)
    res.send(savedUser)
  } catch (err) {
    console.error(err)
    res.status(500).send({ err: 'Failed to update user' })
  }
}

async function addUser(req: Request, res: Response) {
  try {
    const user = req.body
    const savedUser = await userService.add(user)
    res.send(savedUser)
  } catch (err) {
    console.error(err)
    res.status(500).send({ err: 'Failed to update user' })
  }
}
