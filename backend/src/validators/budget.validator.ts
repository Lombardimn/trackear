import { body, param } from 'express-validator'

export const createBudgetValidation = [
  body('name')
    .notEmpty().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe ser una cadena de texto'),

  body('amount')
    .notEmpty().withMessage('El monto es requerido')
    .isNumeric().withMessage('El monto debe ser un número')
    .custom((value) => value > 0).withMessage('El monto debe ser mayor a 0'),
]

export const getBudgetByIdValidation = [
  param('budgetId')
    .isInt().withMessage('El id debe ser un número entero')
    .custom((value) => value > 0).withMessage('El id debe ser mayor a 0'),
]