import express from 'express'
import morgan from 'morgan'
import { connetDB } from './db'
import budgetRouter from '../routes/budget.route'

connetDB()

const server = express()

// Limit of requests
//server.use(limiter)

//Middleware
server.use(morgan('dev'))
server.use(express.json())

// Routes
server.use('/api/v1/budgets', budgetRouter)

export default server