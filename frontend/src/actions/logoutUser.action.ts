"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logoutUserAction() {
  (await cookies()).delete('TRACKEAR_TOKEN')

  redirect('/auth/login')
}