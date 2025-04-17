import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import Budget from "./budget.model";


@Table({
  tableName: 'expenses',
})

class Expense extends Model<Expense>{
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

  @ForeignKey(() => Budget)
  declare budgetId: number

  @BelongsTo(() => Budget)
  declare budget: Budget
}

export default Expense