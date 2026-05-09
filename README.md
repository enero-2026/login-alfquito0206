# Autenticación con Firebase —

Habilitar flujo de login con Firebase

---

## Requisitos previos


- Una cuenta de Google para acceder a [Firebase Console](https://console.firebase.google.com/)
- Una App de React Native (puedes crearla desde 0)

---

## Paso 1 — Crear un proyecto en Firebase

1. Ve a [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Haz clic en **"Agregar proyecto"** y sigue los pasos del asistente.
3. Una vez creado el proyecto, haz clic en el ícono **web** (`</>`) para registrar tu app.
4. Asigna un nombre a la app (por ejemplo `react-login`) y haz clic en **"Registrar app"**.
5. Firebase te mostrará un objeto `firebaseConfig` con los valores de configuración. Guárdalos; los necesitarás en el Paso 3.

---

## Paso 2 — Habilitar el proveedor de autenticación

1. En la consola de Firebase, navega a **Authentication → Sign-in method**.
2. Haz clic en **"Correo electrónico/Contraseña"** y actívalo.
3. Guarda los cambios.

Para crear un usuario de prueba:

1. Ve a **Authentication → Users**.
2. Haz clic en **"Agregar usuario"**.
3. Ingresa un correo y contraseña y haz clic en **"Agregar usuario"**.

---

## Paso 3 — Configurar las variables de entorno

1. En la raíz del proyecto, crea un archivo `.env` copiando el ejemplo:

   ```bash
   cp .env.example .env
   ```

2. Abre `.env` y reemplaza los valores con los datos del objeto `firebaseConfig` que obtuviste en el Paso 1:

   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=mi-proyecto.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=mi-proyecto
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=mi-proyecto.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
   EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123
   ```

> **Importante:** el archivo `.env` está en `.gitignore` y **nunca debe subirse al repositorio**. Las variables con prefijo `EXPO_PUBLIC_` son expuestas al cliente en tiempo de compilación — no almacenes secretos de servidor en ellas.

---

## Paso 4 — Instalar dependencias

```bash
npm install
```

---

## Paso 5 — Ejecutar la aplicación

```bash
npx expo start
```

Escanea el QR con **Expo GO** en tu dispositivo.

---

## Flujo de autenticación

```
Inicio de la app
      │
      ▼
onAuthStateChanged (Firebase escucha el estado)
      │
      ├── Usuario autenticado ──► WelcomeScreen (mensaje de bienvenida)
      │
      └── Sin sesión activa ────► LoginScreen  (formulario de correo y contraseña)
```


---

## Estructura del proyecto

```
react-login/
├── App.js                       ← Raíz: gestiona el estado de autenticación
├── app.json                     ← Configuración Expo (permisos, etc.)
├── package.json
├── babel.config.js
├── .env                         ← Variables de entorno (NO subir al repo)
├── .env.example                 ← Plantilla de variables de entorno
├── .gitignore
└── src/
    ├── firebase/
    │   └── config.js            ← Inicialización de Firebase
    └── pantallas/
        ├── LoginScreen.js       ← Pantalla de inicio de sesión
        └── WelcomeScreen.js      ← Pantalla de cámara (requiere sesión)
```
