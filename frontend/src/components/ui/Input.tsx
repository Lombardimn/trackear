"use client"

import { Eye, EyeSlash } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

type InputType = 'text' | 'email' | 'password' | 'number' | 'textarea' | 'url' | 'search' | 'date' | 'tel' | 'color' | 'file' | 'select' | 'checkbox' | 'radio' | 'hidden'

type AutoComplete = "on" | "off" | "name" | "email" | "username" | "new-password" | "current-password" | "one-time-code" | "tel" | "tel-country-code" | "street-address" | "address-line1" | "address-line2" | "address-level1" | "address-level2" | "postal-code" | "country-name" | "organization-title" | "organization" | "given-name" | "additional-name" | "family-name"

interface InputProps<T extends InputType> {
  type: T
  placeholder: string
  id: string
  name: string
  label: string
  variant?: boolean
  icon?: React.ReactNode
  defaultValue?: T extends "number" ? number : string
  className?: string
  error?: string
  autoComplete?: AutoComplete
  submitCount?: number
}

export default function Input(props: InputProps<InputType>) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [localError, setLocalError] = useState<string | undefined>(props.error)

  // Hacemos visible la contraseña cambiando el tipo de input
  const isPasswordType = props.type === "password"
  const inputType = isPasswordType && props.variant
    ? (showPassword ? "text" : "password")
    : props.type


  // Manejo de errores
  useEffect(() => {
    setLocalError(props.error)
  }, [props.error, props.submitCount])

  // Visibilidad de contraseña
  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }
  
  return (
    <div className="relative w-full">
      <label htmlFor={props.name} className="absolute left-2 top-[0.5px] transform -translate-y-1/2 bg-white px-1">{props.label}</label>
      {
        props.icon &&
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-auto">{props.icon}</div>
      }
     {
        props.variant && isPasswordType && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-auto text-gray-600 hover:text-gray-800"
          >
            {
              showPassword 
              ? (<Eye size={24} weight="duotone" />) 
              : (<EyeSlash size={24} weight="duotone" />)
            }
          </button>
        )
      }
      <input 
        type={inputType}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        autoComplete={props.autoComplete}
        onChange={() => { if (localError) setLocalError(undefined) }}
        className={`w-full border border-gray-300 p-3 rounded-lg ${props.icon ? "pl-12" : "pl-3"} ${localError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-green-600 focus:ring-green-600 hover:border-green-600 hover:ring-green-600"} ${props.className}`}
      />
      {
        localError &&
          <span className="absolute text-red-500 text-sm left-3 top-full mt-1">{localError}</span>
      }
    </div>
  )
}