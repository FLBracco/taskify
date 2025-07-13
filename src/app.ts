import express, { urlencoded } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import userCreateRoutes from './routes/register.routes.js';
import loginRoutes from './routes/login.routes.js';
import categoriesRoutes from './routes/categories.routes.js';
import { errorHandler } from './middlewares/errors.js';
import { authMiddleware } from './middlewares/auth.js';
import tasksRoutes from './routes/tasks.routes.js';

const app = express();

app.use(urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET!, // clave secreta para firmar la cookie
  resave: false,                        // no vuelve a guardar la sesión si no hubo cambios
  saveUninitialized: false,            // no guarda sesiones vacías
  cookie: {
    secure: false,        // ponelo en true solo si usás HTTPS (por ahora false)
    httpOnly: true,       // impide que JS acceda a la cookie (más seguro)
    maxAge: 1000 * 60 * 60 * 24 // 1 día de duración
  }
}));

app.get('/', (_req, res)=>{
    res.status(200).json({message: "Servidor prendido correctamente!"});
});

app.use('/', userCreateRoutes);
app.use('/', loginRoutes);
app.use(authMiddleware, categoriesRoutes);
app.use(authMiddleware, tasksRoutes);
app.use(errorHandler);

export default app;