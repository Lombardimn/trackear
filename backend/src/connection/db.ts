import { Sequelize } from "sequelize-typescript";
import { DATABASE_URL } from "./config";
import colors from 'colors'

export const db = new Sequelize(DATABASE_URL, {
  models: [__dirname + '/../models/**/*'],
  logging: false,
  dialectOptions: {
    ssl: true,
  },
})

export async function connetDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.blue.bold('Database connected successfully!'))
  } catch (error) {
    console.error(colors.red.bold('Error connecting to the database:'), colors.red(error))
  }
}