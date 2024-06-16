import { NextFunction, Request, Response } from 'express'

import { JwtPayload, sign, verify } from 'jsonwebtoken'

export interface CustomRequest extends Request {
  userId?: string
}

interface ExtendedJwt extends JwtPayload {
  id: string
}

const createTokens = (user: any) => {
  const accessToken = sign(
    { id: user._id },
    process.env.TOKEN_SECRET as string,
    { expiresIn: '24h' }
  )
  return accessToken
}

const validateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']
  const accessToken = authHeader

  if (!accessToken)
    return res.status(400).json({ error: 'User not Authenticated!' })

  try {
    verify(accessToken, process.env.TOKEN_SECRET as string, (err, decoded) => {
      // console.log(err)
      if (err) {
        return res.status(401).json({ message: 'Invalid token' })
      }

      req.userId = (decoded as ExtendedJwt).id
      next()
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({ error: err })
  }
}

export const jwtService = {
  createTokens,
  validateToken,
}
