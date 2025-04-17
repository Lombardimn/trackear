import type { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'
import Expense from '../models/expense.model'

declare global {
  namespace Express {
    interface Request {
      expense?: Expense
    }
  }
}

export const validateInputExpenses = async (req: Request, res: Response, next: NextFunction) => {
  await body('name')
    .notEmpty().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe ser una cadena de texto')
    .run(req)

  await body('amount')
    .notEmpty().withMessage('El monto es requerido')
    .isNumeric().withMessage('El monto debe ser un número')
    .custom((value) => value > 0).withMessage('El monto debe ser mayor a 0')
    .run(req)

  next()
}

export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {
  await param('expenseId')
    .isInt().withMessage('El id debe ser un número entero')
    .custom((value) => value > 0).withMessage('El id debe ser mayor a 0')
    .run(req)

  let errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }

  next()
}

export const expenseExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { expenseId } = req.params

    const expense = await Expense.findByPk(expenseId)

    if (!expense) {
      const error = new Error('Gasto no encontrado')
      res.status(404).json({
        error: error.message
      })
    }

    req.expense = expense

    next()

  } catch (error) {
    console.error('Error al obtener un gasto ->>' ,error)
    res.status(500).json({ 
      message: 'Hubo un error al obtener un gasto'
    })
  }
}