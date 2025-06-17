import { Request, Response, NextFunction } from "express";
import { loginService } from "../services/login.service.js";
import { validateInput } from "../models/register.models.js";

export async function loginController(req: Request, res: Response, next: NextFunction){
    try {
        const result = await validateInput(req.body);
        if (!result.success){
            return res.status(400).json({
                message: "Datos invalidos",
                errors: result.error.flatten()
            });
        }
        const token = await loginService(result.data);
        res
            .cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60
            })
            .status(200)
            .json({message: "Login exitoso"});
    } catch (err) {
        next(err);
    }
}