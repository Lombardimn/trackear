import { Router } from "express"
import { BudgetController } from "../controllers/Budget.controller"
import { handleInputErrors } from "../middleware/validate.middleware"
import { createBudgetValidation, getBudgetByIdValidation } from "../validators/budget.validator"
import { budgetExistsMiddleware } from "../middleware/budget.middleware"

const router = Router()

router.get(
  '/',
  BudgetController.getAll
)

router.post(
  '/',
  [
    ...createBudgetValidation,
    handleInputErrors
  ],
  BudgetController.create
)

router.get(
  '/:budgetId',
  [
    ...getBudgetByIdValidation,
    handleInputErrors
  ],
  budgetExistsMiddleware,
  BudgetController.getById
)

router.put(
  '/:budgetId',
  [
    ...getBudgetByIdValidation,
    ...createBudgetValidation,
    handleInputErrors
  ],
  budgetExistsMiddleware,
  BudgetController.updateById
)

router.delete(
  '/:budgetId',
  [
    ...getBudgetByIdValidation,
    handleInputErrors
  ],
  budgetExistsMiddleware,
  BudgetController.deleteById
)

export default router