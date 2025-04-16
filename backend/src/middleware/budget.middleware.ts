import type { Request, Response, NextFunction } from 'express'
import Budget from '../models/budget.model'

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