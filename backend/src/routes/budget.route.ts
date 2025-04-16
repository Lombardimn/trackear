import { Router } from "express"
import { body } from "express-validator"
import { BudgetController } from "../controllers/Budget.controller"
import { handleInputErrors } from "../middleware/validate.middleware"
import { createBudgetValidation, getBudgetByIdValidation } from "../validators/budget.validator"

const router = Router()

router.get(
  '/',
  BudgetController.getAll
)

router.post(
  '/',
  [...createBudgetValidation, handleInputErrors],
  BudgetController.create
)

router.get(
  '/:budgetId',
  [...getBudgetByIdValidation, handleInputErrors],
  BudgetController.getById
)

router.put(
  '/:budgetId',
  [
    ...getBudgetByIdValidation,
    ...createBudgetValidation,
    handleInputErrors
  ],
  BudgetController.updateById
)

router.delete(
  '/:budgetId',
  [...getBudgetByIdValidation, handleInputErrors],
  BudgetController.deleteById
)

export default router