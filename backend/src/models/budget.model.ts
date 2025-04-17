import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import Expense from "./expense.model"
import User from "./user.model"

@Table({
  tableName: 'budgets'
})

class Budget extends Model<Budget> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string

  @AllowNull(false)
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

  @ForeignKey(() => User)
  declare userId: number

  @BelongsTo(() => User)
  declare user: User
}

export default Budget