import express, { Request, Response } from "express";
import { loginController } from "../controllers/login.controller";
import { authMiddleware } from "../middlewares/auth";

const loginRoutes = express.Router();

loginRoutes.post('/login', loginController);

loginRoutes.post('/logout', (req: Request, res:Response)=>{
    res.clearCookie('access_token').json({message: "Logout Successful"});
})

loginRoutes.get('/protected', authMiddleware, (req: Request, res: Response)=>{
    const { user } = req.session;
    if(!user) res.status(403).send('Access not authorized');
    res.status(200).json({
        message: "Access authorized",
        user: user
    })
})

export default loginRoutes;