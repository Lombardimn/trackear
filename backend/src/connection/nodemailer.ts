import nodemailer from 'nodemailer'
import { EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_USER } from '../connection/config'

interface TransportProps {
  host: string
  port: number
  auth: {
    user: string
    pass: string
  }
}


const config = (): TransportProps => {
  return {
    host: EMAIL_HOST,
    port: +EMAIL_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  }
}

export const transport = nodemailer.createTransport(config())