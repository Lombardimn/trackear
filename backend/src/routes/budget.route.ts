import { Router } from "express"
import { BudgetController } from "../controllers/Budget.controller"
import { ExpensesController } from "../controllers/Expense.controller"
import { authenticate } from "../middleware/auth.middleware"
import { handleInputErrors } from "../middleware/validate.middleware"
import { budgetExistsMiddleware, hasAccess } from "../middleware/budget.middleware"
import { validateBudgetId, validateInputBudgets } from "../middleware/budget.middleware"
import { belongsToBudgetMiddleware, expenseExistsMiddleware, validateExpenseId, validateInputExpenses } from "../middleware/expenses.middleware"

const router = Router()

router.use(authenticate) // req.user

router.param('budgetId', validateBudgetId)
router.param('budgetId', budgetExistsMiddleware) // req.budget
router.param('budgetId', hasAccess)

router.param('expenseId', validateExpenseId)
router.param('expenseId', expenseExistsMiddleware)
router.param('expenseId', belongsToBudgetMiddleware)

/** Rutas de presupuestos */

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


/** Rutas de gastos */

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