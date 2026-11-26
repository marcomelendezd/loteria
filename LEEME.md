# Lotería Marijose y Diego

App para llevar los números de lotería, cuánto se juega en cada uno y
con quién se comparte. Funciona en el móvil como una app normal.

- Entrada con **PIN** y animación de apertura.
- Lista de números con el sorteo, lo que se juega y el reparto.
- Apartado **🎄 Navidad** con decoración y cuenta atrás para el sorteo del 22/12.
- Pantalla de **Personas**: cuánto lleva cada uno en total y botón para
  mandarle su resumen por WhatsApp.
- **Comprobador de premios** (el botón del trofeo): apuntas los números y
  terminaciones que han salido y te dice cuánto ha tocado y cuánto le
  corresponde a cada persona.
- Los mismos datos en todos los móviles (con Firebase).
- Funciona sin cobertura: guarda y sincroniza cuando vuelve la conexión.

---

## 1. Crear la base de datos (Firebase) — 10 minutos

Sin esto la app funciona igual, pero cada móvil ve su propia lista.

1. Entra en **https://console.firebase.google.com** con tu cuenta de Google
   y pulsa **Crear un proyecto**. Nombre: `loteria`. Google Analytics: **no**.
2. Dentro del proyecto, menú de la izquierda → **Compilación → Firestore Database**
   → **Crear base de datos**.
   - Ubicación: `eur3` o `europe-west1`.
   - Elige **modo de producción** (las reglas las pones en el paso 4).
3. Menú → **Compilación → Authentication** → **Comenzar** →
   pestaña **Sign-in method** → **Correo electrónico/contraseña** →
   activar el primer interruptor (el de "Verificación por correo" déjalo
   apagado) → guardar.
   **No actives el acceso anónimo**: dejaría la lista abierta a cualquiera.

   Ahora crea la única cuenta que podrá entrar: pestaña **Users** →
   **Añadir usuario**.
   - Correo: `loteria@marijoseydiego.es` (o el que quieras, pero luego
     ponlo igual en `config.js`).
   - Contraseña: **`LMJD-` seguido del PIN que elijas**. Si el PIN va a
     ser 2512, la contraseña es `LMJD-2512`.

   El PIN es lo único que tendréis que recordar. Si algún día lo quieres
   cambiar, entra aquí y cambia la contraseña del usuario.
4. Vuelve a **Firestore Database** → pestaña **Reglas**, borra lo que haya,
   pega esto y pulsa **Publicar**:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /salas/{sala} {
         allow read, write: if request.auth != null;
         match /numeros/{numero} {
           allow read, write: if request.auth != null;
         }
       }
     }
   }
   ```

5. Arriba a la izquierda, la rueda dentada → **Configuración del proyecto**.
   Baja hasta **Tus apps** y pulsa el icono **`</>`** (Web).
   Apodo: `loteria`. **No** marques Hosting. Registrar.
6. Te sale un bloque `const firebaseConfig = { ... }`.
   Copia esos valores dentro de **`config.js`** de esta carpeta, y de paso
   comprueba ahí abajo que `CUENTA` es el correo del paso 3 y que
   `PIN_LONGITUD` coincide con las cifras de tu PIN (por defecto 4).

Y ya está. Al abrir la app debe poner **«Sincronizado en todos los móviles»**.

---

## 2. Subirla a internet (GitHub Pages) — 5 minutos

1. En **https://github.com**, botón **+** → **New repository**.
   - Nombre: `loteria`
   - **Public**
   - Crear.
2. En el repositorio vacío: **uploading an existing file** y arrastra
   **todos** los archivos de esta carpeta (index.html, config.js, sw.js,
   manifest.webmanifest, icon-192.png, icon-512.png, icon-maskable-512.png).
   **Commit changes**.
3. Pestaña **Settings** → **Pages** (menú izquierdo).
   - Source: **Deploy from a branch**
   - Branch: **main** y carpeta **/ (root)** → **Save**.
4. Espera un par de minutos y recarga. Arriba sale la dirección:

   `https://TUUSUARIO.github.io/loteria/`

Ese es el enlace que le pasas a tu madre.

---

## 3. Instalarla en el Redmi

1. Que abra el enlace **en Chrome**.
2. Menú de los tres puntos (⋮) → **Añadir a pantalla de inicio**
   (o **Instalar aplicación**).
3. Le aparece el icono con el logo. Desde ahí se abre a pantalla completa,
   sin barra del navegador, como cualquier otra app.

En iPhone es lo mismo pero desde Safari: **Compartir** → **Añadir a pantalla de inicio**.

---

## Comprobar los premios el día del sorteo

Botón del **trofeo**, arriba a la derecha.

1. **Precio del décimo**: 20 € en Navidad y en el Niño (3 € en los
   ordinarios de jueves y sábado). De aquí sale lo que toca por cada euro
   jugado, así que es lo primero que hay que tener bien.
2. **Números premiados**: una línea por número que haya salido, con lo que
   paga *al décimo*. Los botones de abajo rellenan solos el importe
   habitual de cada categoría (Gordo 400.000, 2º 125.000, 3º 50.000,
   4º 20.000, 5º 6.000, aproximaciones y centenas), así que normalmente
   solo hay que teclear el número.
3. **Terminaciones y reintegros**: las cifras finales premiadas. La pedrea
   y las terminaciones pagan 100 € al décimo y el reintegro 20 €.
4. **Comprobar mis números**. Salen arriba los que han tocado, con el
   desglose del premio y **lo que cobra cada participante**, y un botón
   para mandárselo por WhatsApp.

Los importes se guardan, así que puedes ir apuntándolos mientras se
celebra el sorteo y comprobar las veces que quieras. Ojo: el cálculo es
orientativo, el décimo hay que confirmarlo en la administración.

## Cuando cambies algo

Si tocas `index.html`, sube también el número de versión que hay arriba
de `sw.js` (`loteria-v2` → `loteria-v3`). Si no, los móviles pueden seguir
viendo la versión antigua guardada.

## Preguntas sueltas

**¿Se puede usar sin internet?** Sí. Guarda lo que escribas y lo sube
cuando vuelva la cobertura.

**¿Quién puede ver los datos?** Solo quien sepa el PIN. El enlace y el
código pueden ser públicos sin problema: las reglas de Firestore no dejan
leer ni escribir a nadie que no haya entrado con la cuenta del paso 3.
El PIN se pide una vez por móvil y luego queda recordado; en Opciones hay
un botón para cerrar la sesión y que lo vuelva a pedir.

**¿Y si alguien prueba PINs a lo bruto?** Firebase corta los intentos
seguidos desde el mismo sitio. Aun así, si quieres más margen, pon
`PIN_LONGITUD` a 6 y crea el usuario con `LMJD-` y seis cifras.

**¿Y si quiero empezar de cero?** Cambia `SALA` en `config.js` por otra
palabra: la app empieza con una lista vacía y la anterior se queda guardada.
