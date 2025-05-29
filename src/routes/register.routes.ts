import express, { Request, Response } from 'express';
import pool from '../db/db.config';

const userCreateRoutes = express.Router();

// Probando que se conecte a la db
userCreateRoutes.get('/test', async (_req: Request, res: Response)=>{
    try {
        const getUserQuery = `
            SELECT * FROM users;
        `
        const result = await pool.query(getUserQuery);
        res.status(200).send(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Error al obtener los usuarios ", err});
    }
});

userCreateRoutes.post('/registro');

export default userCreateRoutes;