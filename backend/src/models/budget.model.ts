import { Column, DataType, Default, HasMany, Model, Table } from "sequelize-typescript"
import Expense from "./expense.model"

@Table({
  tableName: 'budgets'
})

class Budget extends Model<Budget> {
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string

  @Column({
    type: DataType.DECIMAL(10, 2)
  })
  declare amount: number

  @Default(1)
  @Column({
    type: DataType.INTEGER
  })
  declare enabled: number

  @HasMany(() => Expense, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  declare expenses: Expense[]
}

export default Budget