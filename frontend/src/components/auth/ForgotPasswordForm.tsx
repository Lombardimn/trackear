"use client";

import { Envelope } from "@phosphor-icons/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ForgotPasswordForm() {
  return (
    <form
      className="mt-8 px-4 space-y-3 w-full"
      noValidate
    >
      <div className="pb-5">
        <Input
          type="email"
          placeholder="Email de Registro"
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
          icon={<Envelope size={24} color="inherit" weight="duotone" />}
        />

        <div className="py-5 flex flex-col items-center justify-center">
          <Button
            type="submit"
            value="Solicitar"
            method={() => { }}
            classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
          />
        </div>
      </div>
    </form>
  )
}