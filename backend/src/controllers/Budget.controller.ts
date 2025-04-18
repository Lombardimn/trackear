import type { Request, Response } from "express"
import Budget from "../models/budget.model"
import Expense from "../models/expense.model"

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
          userId: req.user.id,
          enabled: 1
        }
      })

      res.status(200).json(budgets)

    } catch (error) {
      console.error('Error al obtener los presupuestos ->>' ,error)
      res.status(500).json({ 
        message: 'Hubo un error al obtener los presupuestos'
      })
    }
  }

  static getById = async (req: Request, res: Response) => {
    /** Consulta de las expensas de un presupuesto */
    const budget = await Budget.findByPk(req.budget.id, {
      include: [Expense]
    })

    res.status(200).json(budget)
  }

  static create = async (req: Request, res: Response) => {
    try {

      const budget = await Budget.create(req.body)
      budget.userId = req.user.id
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
      /** Modificar el presupuesto */ 
      await req.budget.update(req.body)

      res.status(200).json({
        message: 'Presupuesto actualizado exitosamente'
      })
  }

  static deleteById = async (req: Request, res: Response) => {
    /** Eliminar logicamente el presupuesto */
    await req.budget.update({ enabled: 0 })

    res.status(200).json({
      message: 'Presupuesto eliminado exitosamente'
    })
  }
}