import { createTask, findTaskByID, getMeTask, updateTask } from "../queries/task.repository";
import { findUserByID } from "../queries/user.repository";
import { TaskInput, UpdateTaskInput } from "../models/task.models";
import { NotFoundError } from "../utils/customErrors";

export async function createTasksService(id: number, task: TaskInput){
    const userExists = findUserByID(id);
    if(!userExists) throw new NotFoundError('Usuario no existe');
    return await createTask(id, task);
}

export async function getMeTaskService(userID: number){
    const userExists = findUserByID(userID);
    if(!userExists) throw new NotFoundError('El usuario no existe');
    return await getMeTask(userID);
}

export async function updateTaskService(taskID: number, task: UpdateTaskInput){
    const taskExists = findTaskByID(taskID);
    if(!taskExists) throw new NotFoundError('La tarea no existe');
    return await updateTask(taskID, task);
}