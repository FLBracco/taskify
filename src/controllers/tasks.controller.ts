import { Request, Response, NextFunction } from "express";
import { createTasksService, getMeTaskService } from "../services/tasks.service";
import { validateTaskInput } from "../models/task.models";

export async function createTasksController(req: Request, res: Response, next: NextFunction){
    try {
        const { user } = req.session
        const result = await validateTaskInput(req.body);
        if(!result.success){
            return res.status(400).json({
                message: "Datos invalidos",
                errors: result.error.flatten()
            });
        };
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            categories: req.body.categories
        };
        const userID = user!.id
        const task = await createTasksService(userID, newTask)
        return res.status(201).json({
            message: 'Se creo la tarea correctamente',
            task
        })
    } catch (err) {
        next(err)
    }
}

export async function getMeTaskController(req: Request, res: Response, next: NextFunction){
    try {
        const { user } = req.session;
        const task = await getMeTaskService(user!.id);
        return res.status(200).json({
            message: "Estás son las tareas del usuario",
            task
        });
    } catch (err) {
        next(err);
    }
}