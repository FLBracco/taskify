import express, { Request, Response } from 'express';
import pool from '../db/db.config';
import { createUserController } from '../controllers/register.controller.js';

const userCreateRoutes = express.Router();

userCreateRoutes.post('/registro', createUserController);

export default userCreateRoutes;