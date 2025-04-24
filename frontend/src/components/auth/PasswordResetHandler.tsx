"use client"

import { useState } from "react"
import Card from "../ui/Card"
import ValidateTokenForm from "./ValidateTokenForm"
import ResetPasswordForm from "./ResetPasswordForm"

export default function PasswordResetHandler() {
  const [isValidToken, setIsValidToken] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')

  return (
    <Card>
      {
        !isValidToken 
          ? (
            <>
              <p className="text-lg pt-4 px-8 text-gray-700">A continuación, ingresa el c&oacute;digo de confirmaci&oacute;n que enviamos a tu correo. Puedes escribirlo o puedes copiarlo y pegarlo.</p>
              <ValidateTokenForm 
                mehtod={setIsValidToken}
                token={token}
                setToken={setToken}
              />
            </>
          )
          : (
            <ResetPasswordForm
              token={token}
            />
          )
      }
    </Card>
  )
}