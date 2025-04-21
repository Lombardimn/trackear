"use client"

import { Envelope, Lock, User } from "@phosphor-icons/react/dist/ssr";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterForm() {
  return (
    <form
      className="mt-8 px-4 space-y-3 w-full"
      noValidate
    >
      <div className="pb-6">
        <Input
          type="email"
          placeholder="Email de Registro"
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
          icon={<Envelope size={24} color="inherit" weight="duotone" />}
        />
      </div>

      <div className="pb-6">
        <Input
          type="text"
          placeholder="Nombre de Registro"
          id="username"
          name="username"
          label="Nombre de Usuario"
          autoComplete="username"
          icon={<User size={24} color="inherit" weight="duotone" />}
        />
      </div>

      <div className="pb-6">
        <Input
          type="password"
          placeholder="*************"
          id="password"
          name="password"
          label="Contraseña"
          icon={<Lock size={24} color="inherit" weight="duotone" />}
          variant
        />
      </div>

      <div className="pb-6">
        <Input
          type="password"
          placeholder="*************"
          id="password_confirmation"
          name="password_confirmation"
          label="Confirmar Contraseña"
          icon={<Lock size={24} color="inherit" weight="duotone" />}
          variant
        />
      </div>

      <div className="pb-6 flex flex-col items-center justify-center">
        <Button
          type="submit"
          value="Registrarse"
          method={() => { }}
          classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
        />
      </div>
    </form>
  )
}