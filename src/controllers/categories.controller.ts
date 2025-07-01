import { Request, Response, NextFunction } from "express";
import { createCategoriesService } from "../services/categories.service";
import { validateCategoryInput } from "../models/categories.models";

export async function createCategoriesController (req: Request, res: Response, next: NextFunction){
    try {
        const result = await validateCategoryInput(req.body);
        if(!result.success){
            return res.status(400).json({
                message: "Datos invalidos",
                errors: result.error.flatten()
            });
        };
        const { name } = req.body
        const category = await createCategoriesService(name);
        res.status(201).json({message: "Se creo la categoría correctamente",
            id: category.id,
            name: category.name
        });
    } catch (err) {
        next(err)
    }
}