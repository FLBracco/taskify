import express from 'express';
import cookieParser from 'cookie-parser';
import userCreateRoutes from './routes/register.routes.js';
import loginRoutes from './routes/login.routes.js';
import { errorHandler } from './middlewares/errors.js';
import { authMiddleware } from './middlewares/auth.js';

const app = express();
app.use(express.json())
app.use(cookieParser());

app.get('/', (_req, res)=>{
    res.status(200).json({message: "Servidor prendido correctamente!"});
});

app.use('/usuarios', userCreateRoutes);
app.use('/', loginRoutes);

app.use(authMiddleware);
app.use(errorHandler);

export default app;