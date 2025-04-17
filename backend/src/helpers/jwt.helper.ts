import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../connection/config'

export const generateJWT = (id: string): string => {
  const token = jwt.sign(
    { id },
    JWT_SECRET as string,
    { expiresIn: '30d' }
  )
  
  return token
}
