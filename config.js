// ============================================================
//  CONFIGURACIÓN — este es el ÚNICO archivo que hay que tocar
// ============================================================

// Datos del proyecto de Firebase "loteriamjydiego".
export const firebaseConfig = {
  apiKey: "AIzaSyDyCz24ivc89o1z-v0BGtUJxNxrei93Y5A",
  authDomain: "loteriamjydiego.firebaseapp.com",
  projectId: "loteriamjydiego",
  storageBucket: "loteriamjydiego.firebasestorage.app",
  messagingSenderId: "282667213800",
  appId: "1:282667213800:web:702ecb8056a47a79b73a5d"
};

// Nombre de la "sala" de datos. Si algún día quieres empezar de
// cero sin borrar nada, cambia "familia" por otra palabra.
export const SALA = "familia";

// ---- PIN de entrada ----
// Correo de la única cuenta que puede entrar. Tiene que ser
// EXACTAMENTE el que creaste en Firebase > Authentication > Users.
export const CUENTA = "loteria@marijoseydiego.es";

// Cuántas cifras tiene el PIN (de 4 a 8).
export const PIN_LONGITUD = 4;

// No toques esto. Es lo que se le pega delante al PIN para formar
// la contraseña de Firebase, que exige 6 caracteres como mínimo.
// Si tu PIN es 2512, la contraseña del usuario es LMJD-2512.
export const PIN_PREFIJO = "LMJD-";

// Fecha del sorteo de Navidad (para la cuenta atrás).
export const SORTEO_NAVIDAD = "2026-12-22T09:00:00+01:00";
