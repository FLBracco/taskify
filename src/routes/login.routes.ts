import express, { Request, Response } from "express";
import { loginController } from "../controllers/login.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const loginRoutes = express.Router();

loginRoutes.post('/login', loginController);

loginRoutes.post('/logout', (_req: Request, res:Response)=>{
    res.clearCookie('accessToken').json({message: "Cierre de sesión exitoso."});
})

loginRoutes.get('/protected', authMiddleware, (req: Request, res: Response)=>{
    const { user } = req.session;
    if(!user){
        res.status(401).send('Access not authorized');
    }
    res.status(200).json({
        message: "Access authorized",
        user: user
    })
})

export default loginRoutes;