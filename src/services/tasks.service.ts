import { createTask, deleteTask, findTaskByID, getMeTask, updateTask } from "../queries/task.repository";
import { findUserByID } from "../queries/user.repository";
import { TaskInput, UpdateTaskInput } from "../models/task.models";
import { NotFoundError } from "../utils/customErrors";

export async function createTasksService(id: number, task: TaskInput){
    const userExists = await findUserByID(id);
    if(!userExists) throw new NotFoundError('Usuario no existe');
    return await createTask(id, task);
}

export async function getMeTaskService(userID: number){
    const userExists = await findUserByID(userID);
    if(!userExists) throw new NotFoundError('El usuario no existe');
    return await getMeTask(userID);
}

export async function updateTaskService(taskID: number, task: UpdateTaskInput){
    const taskExists = await findTaskByID(taskID);
    if(!taskExists) throw new NotFoundError('La tarea no existe');
    return await updateTask(taskID, task);
}

export async function deleteTaskService(taskID: number){
    const taskExists = await findTaskByID(taskID);
    if(!taskExists) throw new NotFoundError('La tarea no existe');
    return await deleteTask(taskID);
}