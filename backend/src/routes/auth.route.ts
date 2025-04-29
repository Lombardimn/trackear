import { Router } from "express";
import { body, param } from "express-validator";
import { limiter } from "../connection/limiter";
import { AuthController } from "../controllers/auth.controller";
import { handleInputErrors } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router = Router()

router.use(limiter)

router.post(
  '/create-account',
  body('name')
    .notEmpty().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe ser una cadena de texto'),
  body('password')
  .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .custom(value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)).withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'),
    body('email')
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('El email es invalido'),
  handleInputErrors,
  AuthController.createAccount
)

router.post(
  '/confirm-account',
  body('token')
    .notEmpty().withMessage('El token es requerido')
    .isLength({ min: 6, max: 6 }).withMessage('El token debe tener 6 caracteres'),
  handleInputErrors,
  AuthController.confirmAccount
)

router.post(
  '/login',
  body('email')
    .notEmpty().withMessage('El correo es requerido')
    .isEmail().withMessage('El correo es invalido'),
  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .custom(value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)).withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'),
  handleInputErrors,
  AuthController.login
)

router.post(
  '/forgot-password',
  body('email')
  .notEmpty().withMessage('El email es requerido')
  .isEmail().withMessage('El email es invalido'),
  handleInputErrors,
  AuthController.forgotPassword
)

router.post(
  '/validate-token',
  body('token')
    .notEmpty().withMessage('El token es requerido')
    .isLength({ min: 6, max: 6 }).withMessage('El token debe tener 6 caracteres'),
  handleInputErrors,
  AuthController.validateToken
)

router.post(
  '/reset-password/:token',
  param('token')
    .notEmpty().withMessage('El token es requerido')
    .isLength({ min: 6, max: 6 }).withMessage('El token debe tener 6 caracteres'),
  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .custom(value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)).withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'),
  handleInputErrors,
  AuthController.resetPasswordWithToken
)

router.get(
  '/user',
  authenticate,
  AuthController.user
)

router.put(
  '/user',
  authenticate,
  body('name')
    .notEmpty().withMessage('El Nombre es requerido')
    .isString().withMessage('El Nombre debe ser una cadena de texto'),
  body('email')
    .isEmail().withMessage('El email es invalido'),
  handleInputErrors,
  AuthController.updateUser
)

router.post(
  '/update-password',
  authenticate,
  body('current_password')
    .notEmpty().withMessage('La contraseña actual es requerida'),
  body('password')
    .notEmpty().withMessage('La nueva contraseña es requerida')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .custom(value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)).withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'),
  handleInputErrors,
  AuthController.updatePassword
)

router.post(
  '/check-password',
  authenticate,
  body('password')
    .notEmpty().withMessage('La contraseña es requerida'),
  handleInputErrors,
  AuthController.checkPassword
)

export default router