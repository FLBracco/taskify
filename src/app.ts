import express from 'express';
import userCreateRoutes from './routes/register.routes.js';

const app = express();
app.use(express.json())

app.get('/', (_req, res)=>{
    res.status(200).json({message: "Servidor prendido correctamente!"});
});

app.use('/usuarios', userCreateRoutes);

export default app;