import { Column, DataType, Default, Model, Table } from "sequelize-typescript"

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
}

export default Budget