import type { Request, Response, NextFunction } from 'express'
import Budget from '../models/budget.model'
import { body, param, validationResult } from 'express-validator'

declare global {
  namespace Express {
    interface Request {
      budget?: Budget
    }
  }
}

export const budgetExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { budgetId } = req.params

    const budget = await Budget.findByPk(budgetId)

    if (!budget) {
      const error = new Error('Presupuesto no encontrado')
      res.status(404).json({
        error: error.message
      })
    }

    req.budget = budget

    next()

  } catch (error) {
    console.error('Error al obtener un presupuesto ->>' ,error)
    res.status(500).json({ 
      message: 'Hubo un error al obtener un presupuesto'
    })
  }
}

export const validateInputBudgets = async (req: Request, res: Response, next: NextFunction) => {
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

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
  await param('budgetId')
    .isInt().withMessage('El id debe ser un número entero')
    .custom((value) => value > 0).withMessage('El id debe ser mayor a 0')
    .run(req)

  let errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }

  next()
}

export const hasAccess = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.id !== req.budget.userId) {
    const error = new Error('No tienes acceso a esta acción')
    res.status(401).json({
      error: error.message
    })
  }

  next()
}