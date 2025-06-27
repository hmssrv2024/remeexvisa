# visaremeexplus

Este repositorio contiene una aplicación sencilla de ejemplo. Ahora incluye un pequeño backend en Node.js que permite que un administrador inicie sesión, consulte los usuarios conectados y cambie la clave de un usuario.

## Uso del backend

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor:
   ```bash
  npm start
  ```
   El servidor quedará escuchando por defecto en el puerto `3000`.
   Ahora también expone las páginas estáticas del directorio `public`.
   Si accedes a una ruta con terminación `.html` serás redirigido
   automáticamente a la versión sin extensión, por ejemplo
   `/recarga.html` redirige a `/recarga`.

### Endpoints principales

Cuando el proyecto se despliega en Vercel los servicios quedan disponibles bajo
la ruta `/api`. Los principales endpoints son:

- `POST /api/admin/login` – recibe `username` y `password` y devuelve un token de sesión.
- `GET /api/admin/users` – requiere el token en el encabezado `Authorization` y lista los usuarios conectados con su nombre y saldo.
- `PUT /api/admin/users/:id/password` – permite actualizar la clave de un usuario (requiere token).
- `GET /api/admin/users/:id` – devuelve todos los detalles de un usuario específico (requiere token).
- `DELETE /api/admin/users/:id` – elimina un usuario de la lista (requiere token).

Estos datos se almacenan en memoria para fines de demostración.

## Frontend de administración

Se incluye una interfaz sencilla para manejar el backend desde el navegador. Para
utilizarla basta con abrir `admin` una vez que el servidor esté en ejecución.
Desde esta página podrás:

- Iniciar sesión como administrador a través de `POST /api/admin/login`.
- Consultar los usuarios conectados mediante `GET /api/admin/users`.
- Actualizar la clave de cualquier usuario usando `PUT /api/admin/users/:id/password`.
- Ver los detalles de un usuario con `GET /api/admin/users/:id`.
- Eliminar usuarios mediante `DELETE /api/admin/users/:id`.

De esta forma puedes probar todas las funcionalidades del backend sin utilizar
herramientas externas.

## Ajustes de cuenta

Se agregó la página `ajustes` que presenta un panel completo para gestionar la cuenta del usuario, incluyendo balances, límites, seguridad y bancos registrados.

## Enlaces sin extensión

El proyecto está configurado en Vercel con `cleanUrls` y una regla de
`rewrites` para que cada página funcione tanto con la terminación `.html` como
sin ella. Los enlaces internos apuntan a rutas como `recarga`, `ajustes` o
`transferencia`, pero acceder a `recarga.html` o `recarga` mostrará el mismo
contenido. Si navegas de manera local puedes abrir los archivos con su
extensión `.html` o sin ella si cuentas con un servidor que maneje estas
rewrites.
