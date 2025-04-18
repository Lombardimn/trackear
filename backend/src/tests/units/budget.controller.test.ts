import { BudgetController } from "../../controllers/Budget.controller"
import { createRequest, createResponse } from "node-mocks-http"
import { budgets } from "./mocks/budgets"
import Budget from "../../models/budget.model"
import Expense from "../../models/expense.model"

jest.mock('../../models/budget.model', () => ({
  findAll: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn()
}))

/** Test de la función getAll */
describe('BudgetController.getAll', () => {

  /** Reutilizo el modelo de mock por cada test al iniciar */
  beforeEach(() => {
    (Budget.findAll as jest.Mock).mockReset();
    (Budget.findAll as jest.Mock).mockImplementation((options) => {
      const updatedBudgets = budgets.filter(budget => budget.userId === options.where.userId);
      return Promise.resolve(updatedBudgets)
    })
  })

  it('Debe retornar todos los presupuestos del usuario 1', async () => {
    
    const req = createRequest({
      method: 'GET',
      url: '/api/v1/budgets',
      user: { id: 1 }
    })

    const res = createResponse();
    await BudgetController.getAll(req, res)

    const data = res._getJSONData()
    
    expect(data).toHaveLength(2);
    expect(res.statusCode).toBe(200);
    expect(res.statusCode).not.toBe(404);
  })

  it('Debe retornar todos los presupuestos del usuario 2', async () => {
    
    const req = createRequest({
      method: 'GET',
      url: '/api/v1/budgets',
      user: { id: 2 }
    })

    const res = createResponse();
    await BudgetController.getAll(req, res)

    const data = res._getJSONData()
    
    expect(data).toHaveLength(1);
    expect(res.statusCode).toBe(200);
    expect(res.statusCode).not.toBe(404);
  })

  it('Debe retornar O presupuestos del usuario 10', async () => {
    
    const req = createRequest({
      method: 'GET',
      url: '/api/v1/budgets',
      user: { id: 10 }
    })

    const res = createResponse();
    await BudgetController.getAll(req, res)

    const data = res._getJSONData()
    
    expect(data).toHaveLength(0);
    expect(res.statusCode).toBe(200);
    expect(res.statusCode).not.toBe(404);
  })

  it('Debe retornar un error 500 - Obtener', async () => {

    const req = createRequest({
      method: 'GET',
      url: '/api/v1/budgets',
      user: { id: 100 }
    })

    const res = createResponse();
    (Budget.findAll as jest.Mock).mockRejectedValue(new Error)
    await BudgetController.getAll(req, res)

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ message: 'Hubo un error al obtener los presupuestos' });
  })
})

/** Test de la función create */
describe('BudgetController.create', () => {

  it('Debe crear un presupuesto y devolver un 201', async () => {

     const mockBudget = {
      save: jest.fn().mockResolvedValue(true)
     };

    (Budget.create as jest.Mock).mockResolvedValue(mockBudget)
    
    const req = createRequest({
      method: 'POST',
      url: '/api/v1/budgets',
      user: { id: 1 },
      body: { name: 'Presupuesto de prueba', amount: 500 }
    })

    const res = createResponse();
    await BudgetController.create(req, res)

    const data = res._getJSONData()
    
    expect(res.statusCode).toBe(201);
    expect(data).toEqual({"message": "Presupuesto creado exitosamente"});
    expect(mockBudget.save).toHaveBeenCalled();
    expect(Budget.create).toHaveBeenCalledWith(req.body);
  })

  it('Debe retornar un error 500 - Crear', async () => {

    const mockBudget = {
      save: jest.fn()
     };

   (Budget.create as jest.Mock).mockRejectedValue(new Error)
   
   const req = createRequest({
     method: 'POST',
     url: '/api/v1/budgets',
     user: { id: 1 },
     body: { name: 'Presupuesto de prueba', amount: 500 }
   })

   const res = createResponse();
   await BudgetController.create(req, res)

   const data = res._getJSONData()

   expect(res.statusCode).toBe(500);
   expect(data).toEqual({ message: 'Hubo un error al crear un presupuesto' });
   expect(mockBudget.save).not.toHaveBeenCalled();
   expect(Budget.create).toHaveBeenCalledWith(req.body);
 })
})

/** Test de la función getById */
describe('BudgetController.getById', () => {

  beforeEach(() => {
    (Budget.findByPk as jest.Mock).mockReset();
    (Budget.findByPk as jest.Mock).mockImplementation((id) => {
      const budget = budgets.filter(b => b.id === id)[0]
      return Promise.resolve(budget)
    })
  })

  it('Debe devolver un presupuesto con id 1 y 3 gastos', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/v1/budgets/:budgetId',
      budget: { id: 1 },
    })
 
    const res = createResponse();
    await BudgetController.getById(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(200);
    expect(data.expenses).toHaveLength(3);
    expect(Budget.findByPk).toHaveBeenCalled();
    expect(Budget.findByPk).toHaveBeenCalledTimes(1);
    expect(Budget.findByPk).toHaveBeenCalledWith(req.budget.id, { include: [Expense] });
  })

  it('Debe devolver un presupuesto con id 2 y 2 gastos', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/v1/budgets/:budgetId',
      budget: { id: 2 },
    })
 
    const res = createResponse();
    await BudgetController.getById(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(200);
    expect(data.expenses).toHaveLength(2);
  })

  it('Debe devolver un presupuesto con id 3 y 0 gastos', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/v1/budgets/:budgetId',
      budget: { id: 3 },
    })
 
    const res = createResponse();
    await BudgetController.getById(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(200);
    expect(data.expenses).toHaveLength(0);
  })
})

/** Test de la función updateById */
describe('BudgetController.updateById', () => {

  it('Debe actualizar el presupuesto y devolver un mensaje exitoso', async () => {
    const budgetMock = {
      update: jest.fn().mockResolvedValue(true)
    }

    const req = createRequest({
      method: 'PUT',
      url: '/api/v1/budgets/:budgetId',
      budget: budgetMock,
      body: { name: 'Presupuesto Actualizado', amount: 5000 }
    })
  
    const res = createResponse();
    await BudgetController.updateById(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(200);
    expect(data).toEqual({message: "Presupuesto actualizado exitosamente"});
    expect(budgetMock.update).toHaveBeenCalled();
    expect(budgetMock.update).toHaveBeenCalledTimes(1);
    expect(budgetMock.update).toHaveBeenCalledWith(req.body);
  })
})

/** Test de la función deleteById */
describe('BudgetController.deleteById', () => {

  it('Debe eliminar el presupuesto y devolver un mensaje exitoso', async () => {
    const budgetMock = {
      update: jest.fn().mockResolvedValue(true)
    }

    const req = createRequest({
      method: 'DELETE',
      url: '/api/v1/budgets/:budgetId',
      budget: budgetMock
    })
  
    const res = createResponse();
    await BudgetController.deleteById(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(200);
    expect(data).toEqual({message: "Presupuesto eliminado exitosamente"});
    expect(budgetMock.update).toHaveBeenCalled();
    expect(budgetMock.update).toHaveBeenCalledTimes(1);
  })

})