import type { Request, Response } from "express"
import Budget from "../models/budget.model"

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        order: [
          ['createdAt', 'DESC']
        ],
        limit: 10,
        offset: 0,
        where: {
          enabled: 1
        }
      })

      // TODO: Hacer paginación y filtrar por usuario

      res.status(200).json(budgets)

    } catch (error) {
      console.error('Error al obtener los presupuestos ->>' ,error)
      res.status(500).json({ 
        message: 'Hubo un error al obtener los presupuestos'
      })
    }
  }

  static getById = async (req: Request, res: Response) => {
    try {
      const { budgetId } = req.params

      const budget = await Budget.findByPk(budgetId)

      if (!budget) {
        const error = new Error('Presupuesto no encontrado')
        res.status(404).json({
          error: error.message
        })
      }

      res.status(200).json(budget)

    } catch (error) {
      console.error('Error al obtener un presupuesto ->>' ,error)
      res.status(500).json({ 
        message: 'Hubo un error al obtener un presupuesto'
      })
    }
  }

  static create = async (req: Request, res: Response) => {
    try {
      const budget = new Budget(req.body)

      await budget.save()

      res.status(201).json({
        message: 'Presupuesto creado exitosamente',
      })

    } catch (error) {
      console.error('Error al crear un presupuesto ->>' ,error)
      res.status(500).json({ 
        message: 'Hubo un error al crear un presupuesto'
      })
    }
  }

  static updateById = async (req: Request, res: Response) => {
    try {
      const { budgetId } = req.params

      const budget = await Budget.findByPk(budgetId)

      if (!budget) {
        const error = new Error('Presupuesto no encontrado')
        res.status(404).json({
          error: error.message
        })
      }

      // Modificar el presupuesto
      await budget.update(req.body)

      res.status(200).json(budget)

    } catch (error) {
      console.error('Error al actualizar un presupuesto ->>' ,error)
      res.status(500).json({ 
        message: 'Hubo un error al actualizar un presupuesto'
      })
    }
  }

  static deleteById = async (req: Request, res: Response) => {
    try {
      const { budgetId } = req.params

      const budget = await Budget.findByPk(budgetId)

      if (!budget) {
        const error = new Error('Presupuesto no encontrado')
        res.status(404).json({
          error: error.message
        })
      }

      // Eliminar logicamente el presupuesto
      await budget.update({ enabled: 0 })

      res.status(200).json({
        message: 'Presupuesto eliminado exitosamente'
      })

    } catch (error) {
      console.error('Error al obtener un presupuesto ->>' ,error)
      res.status(500).json({ 
        message: 'Hubo un error al obtener un presupuesto'
      })
    }
  }
}