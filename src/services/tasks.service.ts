import { createTask } from "../queries/task.repository";
import { findUserByID } from "../queries/user.repository";
import { TaskInput } from "../models/task.models";
import { NotFoundError } from "../utils/customErrors";

export async function createTasksService(id: number, task: TaskInput){
    const userExists = findUserByID(id);
    if(!userExists) throw new NotFoundError('Usuario no existe');
    return await createTask(id, task);
}