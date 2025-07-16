# 🗂️ Taskify - API de gestión de tareas

Taskify es una API RESTful construida con Node.js, Express, TypeScript y PostgreSQL. Permite a los usuarios registrarse, iniciar sesión y gestionar sus tareas personales agrupadas por categorías.

Este proyecto forma parte de mi portfolio como desarrollador backend.

---

## 🚀 Funcionalidades implementadas

- Registro, login y logout de usuarios
- Middleware de autenticación con JWT y cookies
- Validación de datos con Zod
- Manejo centralizado de errores
- CRUD completo para categorías
- Obtener tareas del usuario autenticado (`GET /tasks/me`)
- Crear tareas y asignarlas a una categoría (`POST /tasks`)

🔧 En desarrollo:
- Actualizar tareas (`PUT /tasks/:id`)
- Eliminar tareas (`DELETE /tasks/:id`)

---

## 📁 Estructura del proyecto

```bash
taskify/
    ├── controllers/
    ├── db/
    ├── middlewares/
    ├── models/
    ├── queries/
    ├── routes/
    ├── services/
    ├── types/
    ├── utils/
    ├── .env.example
    ├── app.ts
    └── server.ts
```

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- PostgreSQL (`pg`)
- Zod
- JWT
- cookie-parser
- bcrypt
- dotenv

---
## 📦 Instalación

1. Cloná el repositorio:
```bash
git clone https://github.com/FLBracco/taskify.git
cd taskify
```

2. Instala dependencias:
```bash
npm install
```

3. Creá un archivo .env basado en .env.example y configurá tus variables de entorno.

4. Ejecutá el servidor en desarrollo:
```bash
npm run dev
```
---

## 📬 Endpoints disponibles

🧑‍💻 Auth
| Método | Endpoint  | Descripción         |
| ------ | --------- | ------------------- |
| POST   | /registro | Registro de usuario |
| POST   | /login    | Inicio de sesión    |
| POST   | /logout   | Cierre de sesión    |

🗂️ Categorías
| Método | Endpoint         | Descripción                  |
| ------ | ---------------- | ---------------------------- |
| GET    | /categories      | Obtener todas las categorías |
| POST   | /categories      | Crear una nueva categoría    |
| PUT    | /categories/\:id | Actualizar una categoría     |
| DELETE | /categories/\:id | Eliminar una categoría       |

✅ Tareas
| Método | Endpoint  | Descripción                         |
| ------ | --------- | ----------------------------------- |
| GET    | /tasks/me | Ver tareas del usuario logueado     |
| POST   | /tasks    | Crear una nueva tarea con categoría |

Próximamente
* PUT /tasks/:id
* DELETE /tasks/:id

---

## 🌱 Estado del proyecto
* 🔨 Desarrollo activo
* 🔄 Faltan endpoints PUT y DELETE de tareas
* 🧪 Testeo manual con Postman