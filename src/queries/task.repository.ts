import pool from "../db/db.config";
import { ConnectionError } from "../utils/customErrors";
import { TaskInput } from "../models/task.models";

export async function createTask(id: number, task: TaskInput){
    try {
        const createTaskQuery = `
            INSERT INTO tasks (user_id, title, description)
            VALUES($1, $2, $3) RETURNING *;
        `
        const idTask = id;
        const { title, description } = task;
        const result = await pool.query(createTaskQuery, [idTask, title, description]);
        return result.rows[0];
    } catch (err) {
        console.error("Error en la base de datos", err);
        throw new ConnectionError('Error al conectar la base de datos');
    }
}