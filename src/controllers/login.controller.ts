import { Request, Response, NextFunction} from "express";
import { loginService } from "../services/login.service.js";
import { validateLoginInput } from "../models/login.models.js";

export async function loginController(req: Request, res: Response, next: NextFunction){
    try {
        const result = await validateLoginInput(req.body);
        if (!result.success){
            return res.status(400).json({
                message: "Datos invalidos",
                errors: result.error.flatten()
            });
        }
        const token = await loginService(result.data);
        res
            .cookie('accessToken', token, {
            httpOnly: true, // la cookie solo se puede acceder en el servidor
            secure: process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en https
            sameSite: 'strict', // la cookie solo se puede acceder en el mismo dominio
            maxAge: 1000 * 60 * 60 // duración de la cookie 1 hora
            })
            .status(200)
            .json({message: "Login exitoso"});
    } catch (err) {
        next(err);
    }
}