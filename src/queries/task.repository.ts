import pool from "../db/db.config";
import { ConnectionError } from "../utils/customErrors";
import { TaskInput } from "../models/task.models";

export async function createTask(id: number, task: TaskInput){
    try {
        const createTaskQuery = `
            INSERT INTO tasks (user_id, title, description)
            VALUES($1, $2, $3) RETURNING id, title, description;
        `
        const userID = id;
        const { title, description, categories} = task; 
        const newTask = await pool.query(createTaskQuery, [userID, title, description]);
        console.log(categories);
        if(!categories) return newTask.rows[0];
        
        const values: number[] = [];
        const placeholders: string[] = [];
        
        categories.forEach((categoryID, index)=>{
            values.push(newTask.rows[0].id);
            values.push(categoryID);

            const p1 = index * 2 + 1;
            const p2 = index * 2 + 2;

            placeholders.push(`($${p1}, $${p2})`);
        });
        
        const taskWithCategoryQuery = `
            INSERT INTO task_categories (task_id, category_id)
            VALUES ${placeholders.join(', ')} RETURNING category_id;
        `;
        const newTaskWithCategory = await pool.query(taskWithCategoryQuery, values);

        return {
            task: newTask.rows[0],
            category_id: newTaskWithCategory.rows.map(row => row.category_id)
        };
    } catch (err) {
        console.error("Error en la base de datos", err);
        throw new ConnectionError('Error al conectar la base de datos');
    }
}

export async function getMeTask(userID: number){
    try {
        const getMeTaskQuery = `
            SELECT id, title, description, completed FROM tasks
            WHERE user_id = $1;
        `;
        const result = await pool.query(getMeTaskQuery, [userID]);
        return result.rows[0];
    } catch (err) {
        console.error("Error en la base de datos", err);
        throw new ConnectionError('Error al conectar la base de datos');
    }
}