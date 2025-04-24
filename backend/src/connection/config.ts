import dotenv from 'dotenv'
dotenv.config()

// ROUTES
export const PORT = process.env.PORT || 3000
export const MESSAGE_API = process.env.MESSAGE_API || "Error connection API"

// DATABASE
export const DATABASE_URL = process.env.DATABASE_URL || "Error connection database"

// EMAIL
export const EMAIL_HOST = process.env.MTMAIL_HOST || process.env.GMAIL_HOST
export const EMAIL_PORT = process.env.MTMAIL_PORT || process.env.GMAIL_PORT
export const EMAIL_USER = process.env.MTMAIL_USER || process.env.GMAIL_USER
export const EMAIL_PASS = process.env.MTMAIL_PASS || process.env.GMAIL_PASS

// JWT
export const JWT_SECRET = process.env.SECRET_JWT_KEY
export const NODE_ENV = process.env.NODE_ENV

// URLs
export const URL_RESET = process.env.URL_RESET
export const URL_VALIDATION = process.env.URL_VALIDATION