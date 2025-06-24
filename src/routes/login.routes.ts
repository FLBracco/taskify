import express, { Request, Response } from "express";
import { loginController } from "../controllers/login.controller";

const loginRoutes = express.Router();

loginRoutes.post('/login', loginController);

loginRoutes.get('/protected', (req: Request, res: Response) =>{
    const { user } = req.session;
    if(!user) return res.status(403).send('Access not authorized');
    return res.status(200).json({
        message: "Access authorized",
        user: user
    })
})

export default loginRoutes;