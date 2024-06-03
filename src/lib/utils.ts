import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractErrorMessage(error) {
  if (error.response && error.response.data) {
    // Extrae la primera clave de error y devuelve su primer mensaje.
    const errorKeys = Object.keys(error.response.data);
    if (errorKeys.length > 0) {
      const firstKey = errorKeys[0];
      const message = error.response.data[firstKey];
      if (Array.isArray(message)) {
        return message[0]; // Devuelve el primer mensaje de error para esa clave
      }
      return message;
    }
  }
  return "Error conectando con el servidor, intenta más tarde.";
}
