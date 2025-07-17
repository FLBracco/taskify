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

4. Ejecutá el script taskify.sql para crear las tablas y relaciones necesarias en tu base de datos PostgreSQL.
Este archivo se encuentra en la raíz del repositorio.

5. Ejecutá el servidor en desarrollo:
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
| Método | Endpoint         | Descripción                        |
| ------ | ---------------- | ---------------------------------- |
| GET    | /categories      | Obtener todas las categorías       |
| POST   | /categories      | Crear una nueva categoría          |
| PUT    | /categories/\:id | Actualizar una categoría existente |
| DELETE | /categories/\:id | Eliminar una categoría por su ID   |


✅ Tareas
| Método | Endpoint    | Descripción                                                               |
| ------ | ----------- | ------------------------------------------------------------------------- |
| GET    | /tasks/me   | Obtener las tareas del usuario autenticado                                |
| POST   | /tasks      | Crear una nueva tarea con sus categorías asociadas                        |
| PUT    | /tasks/\:id | Actualizar una tarea específica (título, descripción, estado, categorías) |
| DELETE | /tasks/\:id | Eliminar una tarea específica por su ID                                   |


---

## 🌱 Estado del proyecto
* 🔨 Desarrollo completo
* 🧪 Testeo manual con Postman