import { Request, Response } from "express";
import { createUserService } from "../services/register.service.js";
import { validateInput } from '../models/register.models.js'

export async function createUserController(req: Request, res: Response){
    try{
        // Validación de los inputs
        const result = await validateInput(req.body);
        // Si falla la validación tira el siguiente error
        if(!result.success){
            return res.status(400).json({
                message: "Datos invalidos",
                errors: result.error.flatten()
            });
        }
        const newUser = result.data
        // Llamamos al service
        const user = await createUserService(newUser);
        // Respuesta exitosa
        res.status(201).json({
            message: "Usuario creado con exito",
            data: user
        })
    } catch (err) {
        console.error("Error en el servidor: ", err);
        res.status(500).json({message: "Error interno en el servidor"});
    }
}