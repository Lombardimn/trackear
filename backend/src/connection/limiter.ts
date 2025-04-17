import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 5, // Limite de peticiones por IP
  message: {
    error: "Demasiadas peticiones, intenta nuevamente en unos minutos"
  }
})