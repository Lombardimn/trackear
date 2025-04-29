import type { Request, Response } from "express"
import User from "../models/user.model"
import { checkPassword, hashPassword } from "../helpers/auth.helper"
import { generateToken } from "../helpers/token.helper"
import { AuthEmail } from "../emails/Auth.email"
import { generateJWT } from "../helpers/jwt.helper"
import { NODE_ENV } from "../connection/config"

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body

    /** Verificar duplicidad */
    const userExists = await User.findOne({ where: { email } })

    if (userExists) {
      const error = new Error('El correo ya se encuentra registrado')
      res.status(409).json({
        error: error.message
      })
    }

    try {
      const user = new User(req.body)

      user.password = await hashPassword(password)
      user.token = generateToken()

      await user.save()

      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token
      })

      res.status(201).json('Cuenta creada correctamente')

    } catch (error) {
      console.error('Error al crear una cuenta ->>', error)
      res.status(500).json({
        message: 'Hubo un error al crear una cuenta'
      })
    }
  }

  static confirmAccount = async (req: Request, res: Response) => {
    const { token } = req.body

    const user = await User.findOne({ where: { token } })

    if (!user) {
      const error = new Error('Token no valido')
      res.status(401).json({
        error: error.message
      })
    }

    /** Confirmar cuenta */
    user.validated = true
    user.token = null

    await user.save()

    res.status(200).json('Cuenta confirmada correctamente')
  }

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    /** Verificar su existencia */
    const user = await User.findOne({ where: { email } })
    if (!user) {
      const error = new Error('El usuario ingresado no existe')
      res.status(404).json({
        error: error.message
      })
    }

    /** Verificar si es un usuario validado */
    if (!user.validated) {
      const error = new Error('La cuenta no ha sido confirmada')
      res.status(403).json({
        error: error.message
      })
    }

    /** Verificar si el password es correcto */
    const isPasswordValid = await checkPassword(password, user.password)

    if (!isPasswordValid) {
      const error = new Error('El password es incorrecto')
      res.status(401).json({
        error: error.message
      })
    }

    /** Generar token */
    const token = generateJWT(user.id)

    res.status(200).json(token)
  }

  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body

    /** Verificar si el usuario existe */
    const user = await User.findOne({ where: { email } })

    if (!user) {
      const error = new Error('El usuario ingresado no existe')
      res.status(404).json({
        error: error.message
      })
    }

    /** Generar token */
    user.token = generateToken()
    await user.save()

    /** Enviar correo */
    await AuthEmail.sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: user.token
    })

    res.status(200).json('Te enviamos un correo para restablecer tu contraseña. Por favor revisa tu bandeja de entrada.')
  }

  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body

    /** Verificar si el token es valido */
    const tokenExists = await User.findOne({ where: { token } })

    if (!tokenExists) {
      const error = new Error('Token no valido')
      res.status(404).json({
        error: error.message
      })
    }

    res.status(200).json('Token valido. Asigna tu nueva contraseña.')
  }

  static resetPasswordWithToken = async (req: Request, res: Response) => {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ where: { token } })

    /** Verificar si el token es valido */
    if (!user) {
      const error = new Error('Token no valido')
      res.status(404).json({
        error: error.message
      })
    }

    /** Hasheo de la contraseña */
    user.password = await hashPassword(password)
    user.token = null

    await user.save()

    res.status(200).json('Contraseña actualizada correctamente')
  }

  static user = async (req: Request, res: Response) => {
    res.status(200).json(req.user)
  }

  static updatePassword = async (req: Request, res: Response) => {
    const { current_password, password } = req.body
    const { id } = req.user

    const user = await User.findByPk(id)

    /** Verificar si la contraseña actual es correcta */
    const isPasswordValid = await checkPassword(current_password, user.password)
    if (!isPasswordValid) {
      const error = new Error('Contraseña actual es incorrecta')
      res.status(401).json({
        error: error.message
      })
    }

    /** Hasheo de la contraseña */
    user.password = await hashPassword(password)
    await user.save()

    res.status(200).json('Contraseña actualizada correctamente')
  }

  static checkPassword = async (req: Request, res: Response) => {
    const { password } = req.body
    const { id } = req.user

    const user = await User.findByPk(id)

    const isPasswordValid = await checkPassword(password, user.password)

    /** Verificar si la contraseña es correcta */
    if (!isPasswordValid) {
      const error = new Error('La contraseña es incorrecta')
      res.status(401).json({
        error: error.message
      })
    }

    res.status(200).json('Contraseña valida')
  }

  static updateUser = async (req: Request, res: Response) => {
    const { name, email } = req.body
    const { id } = req.user

    try {
      /** Validar si el email existe */
      const userExists = await User.findOne({ where: { email } })

      if (userExists && userExists.id !== id) {
        const error = new Error('El email ya es utilizado por otro usuario')
        res.status(409).json({
          error: error.message
        })
      }

      /** Actualizar el usuario */
      await User.update({ name, email }, { where: { id } })
      res.status(200).json('Usuario actualizado correctamente')

    } catch (error) {
      console.error('Error al actualizar el usuario ->>' ,error)
      res.status(500).json({ 
        message: 'Hubo un error al actualizar el usuario'
      })
    }
  }
}
