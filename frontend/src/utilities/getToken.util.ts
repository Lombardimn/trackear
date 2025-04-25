import { cookies } from "next/headers";

/** Función para obtener el token de autenticación */
const TOKEN_NAME = 'TRACKEAR_TOKEN'

export async function getToken() {
  const token = (await cookies()).get(TOKEN_NAME)?.value  
  return token
}
