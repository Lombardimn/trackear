import { Router } from "express"
import { BudgetController } from "../controllers/Budget.controller"
import { validateBudgetId, validateInputBudgets } from "../middleware/budget.middleware"
import { budgetExistsMiddleware } from "../middleware/budget.middleware"
import { ExpensesController } from "../controllers/Expense.controller"
import { handleInputErrors } from "../middleware/validate.middleware"
import { expenseExistsMiddleware, validateExpenseId, validateInputExpenses } from "../middleware/expenses.middleware"

const router = Router()

router.param('budgetId', validateBudgetId)
router.param('budgetId', budgetExistsMiddleware)

router.param('expenseId', validateExpenseId)
router.param('expenseId', expenseExistsMiddleware)

/** Routes for budgets */

router.get(
  '/',
  BudgetController.getAll
)

router.post(
  '/',
  validateInputBudgets,
  handleInputErrors,
  BudgetController.create
)

router.get(
  '/:budgetId',
  BudgetController.getById
)

router.put(
  '/:budgetId',
  validateInputBudgets,
  handleInputErrors,
  BudgetController.updateById
)

router.delete(
  '/:budgetId',
  BudgetController.deleteById
)


/** Routes for expenses */

router.post(
  '/:budgetId/expenses',
  validateInputExpenses,
  handleInputErrors,
  ExpensesController.create
)

router.get(
  '/:budgetId/expenses/:expenseId',
  ExpensesController.getById
)

router.put(
  '/:budgetId/expenses/:expenseId',
  validateInputExpenses,
  handleInputErrors,
  ExpensesController.updateById
)

router.delete(
  '/:budgetId/expenses/:expenseId',
  ExpensesController.deleteById
)

export default router