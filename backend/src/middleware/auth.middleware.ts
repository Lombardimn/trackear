import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import { JWT_SECRET } from '../connection/config'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization

  /** Validar si el token JWT es valido */
  if (!bearer) {
    const error = new Error('Sin autorización')
    res.status(401).json({
      error: error.message
    })
  }

  const [_, token] = bearer.split(' ')

  if (!token) {
    const error = new Error('Sin autorización')
    res.status(401).json({
      error: error.message
    })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (typeof decoded === 'object' && decoded.id) {
      req.user = await User.findByPk(decoded.id,{
        attributes: ['id', 'name', 'email', 'enabled']
      })

      if (req.user.enabled === 0) {
        const error = new Error('Cuenta deshabilitada. Contacte al administrador')
        res.status(401).json({
          error: error.message
        })
      }

      next()
    }

  } catch (error) {
    console.error('Error al obtener el usuario ->>' ,error)
    res.status(500).json({ 
      message: 'Error al obtener el usuario'
    })
  }
}
