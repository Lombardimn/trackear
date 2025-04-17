import express from 'express'
import morgan from 'morgan'
import { connetDB } from './db'
import budgetRouter from '../routes/budget.route'
import auhtRouter from '../routes/auth.route'

connetDB()

const server = express()

/** Limitador de peticiones */
//server.use(limiter)

/** Middlewares */

server.use(morgan('dev'))
server.use(express.json())

/** Rutas */

server.use('/api/v1/budgets', budgetRouter)
server.use('/api/v1/auth', auhtRouter)

export default server