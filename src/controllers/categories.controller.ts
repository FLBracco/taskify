import { Request, Response, NextFunction } from "express";
import { createCategoriesService, deleteCategoriesService, getCategoriesService, updateCategoriesService} from "../services/categories.service";
import { validateCategoryInput, validateCategoryParams } from "../models/categories.models";

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

export async function getCategoriesController(_req: Request, res: Response, next: NextFunction){
    try {
        const categories = await getCategoriesService();
        if(categories.length > 0){
            return res.status(200).json({
                message: "Estas son las categorías existentes",
                categories
            })
        };
        return res.status(200).json({
            message: "No se encontro ninguna categoría"
        });
    } catch (err) {
        next(err)
    }
}

export async function updateCategoriesController(req: Request, res: Response, next: NextFunction){
    try {
        const resParams = await validateCategoryParams(req.params.id);
        const resBody = await validateCategoryInput(req.body);
        if(!resParams.success){
            return res.status(400).json({
                message: "Datos invalidos",
                errors: resParams.error.flatten()
            });
        };
        if(!resBody.success){
            return res.status(400).json({
                message: "Datos invalidos",
                errors: resBody.error.flatten()
            });
        }
        const id = resParams.data
        const { name } = req.body
        const result = await updateCategoriesService(id, name);
        return res.status(200).json({
            message: 'Se actualizo correctamente',
            result
        });
    } catch (err) {
        next(err)
    }
}

export async function deleteCategoriesController(req: Request, res: Response, next: NextFunction){
    try {
        const resParams = await validateCategoryParams(req.params.id);
        if(!resParams.success){
            return res.status(400).json({
                message: "Datos invalidos",
                errors: resParams.error.flatten()
            });
        };
        const id = resParams.data;
        const result = await deleteCategoriesService(id);
        return res.status(200).json({
            message: 'Se borro la categoría correctamente',
            result
        });
    } catch (err) {
        next(err);
    }
}