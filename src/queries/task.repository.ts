import pool from "../db/db.config";
import { BadRequestError, ConnectionError } from "../utils/customErrors";
import { TaskInput, UpdateTaskInput } from "../models/task.models";

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
            SELECT tasks.id as TaskID, tasks.title, tasks.description, tasks.completed, categories.id as CategoryID, categories.name as Categoryname FROM tasks
            INNER JOIN task_categories AS tc ON tasks.id =  tc.task_id
            INNER JOIN categories ON tc.category_id = categories.id
            WHERE tasks.user_id = $1;
        `;
        const result = await pool.query(getMeTaskQuery, [userID]);
        const tasksMap = new Map();
        for (const row of result.rows){
            const {taskid, title, description, completed, categoryid, categoryname} = row;
            if(!tasksMap.has(taskid)){
                tasksMap.set(taskid, {
                    taskid: taskid,
                    title,
                    description,
                    completed,
                    categories: []
                });
            };

            tasksMap.get(taskid).categories.push({
                id: categoryid,
                name: categoryname
            });
        }
        const tasks = Array.from(tasksMap.values());
        return tasks;
    } catch (err) {
        console.error("Error en la base de datos", err);
        throw new ConnectionError('Error al conectar la base de datos');
    }
}

export async function updateTask(taskID: number, task: UpdateTaskInput){
    try {
        const {title, description, completed,categories} = task
        const updateTaskPH: string[] = [];
        const taskValues: (string | number | boolean)[] = [];
        let count = 1;
        
        if(title){
            updateTaskPH.push(`title = $${count++}`);
            taskValues.push(title);
        }
        
        if(description){
            updateTaskPH.push(`description = $${count++}`);
            taskValues.push(description);
        }

        if(typeof completed !== 'undefined'){
            updateTaskPH.push(`completed = $${count++}`);
            taskValues.push(completed);
        };
        
        if(!categories && updateTaskPH.length === 0) throw new BadRequestError('No hay datos para actualizar.');
        
        taskValues.push(taskID);
        
        const updateTaskQuery = `
            UPDATE tasks
            SET ${updateTaskPH.join(', ')} WHERE id = $${count}
        `;
        await pool.query(updateTaskQuery, taskValues);
        
        if(!categories) return { message: "Tarea actualizada correctamente."};
        
        await pool.query("DELETE FROM task_categories WHERE task_id = $1", [taskID]);
        
        for(const categoryID of categories){
            await pool.query("INSERT INTO task_categories (task_id, category_id) VALUES ($1, $2)", [taskID, categoryID]);
        };

        return { message: "Tarea actualizada correctamente."}
    } catch (err) {
        console.error("Error en la base de datos", err);
        throw new ConnectionError('Error al conectar la base de datos');
    }
}

export async function findTaskByID(taskID: number){
    try {
        const taskQuery = `
            SELECT * FROM tasks
            WHERE id = $1;
        `;
        const res = await pool.query(taskQuery, [taskID]);
        return res.rows.length > 0;
    } catch (err) {
        console.error("Error en la base de datos", err);
        throw new ConnectionError('Error al conectar la base de datos');
    }
}

export async function deleteTask(taskID: number){
    try {
        const deleteTaskQuery = `
            DELETE FROM tasks
            WHERE id = $1
            RETURNING *;
        `;
        const res = await pool.query(deleteTaskQuery, [taskID]);
        return res.rows[0];
    } catch (err) {
        console.error("Error en la base de datos", err);
        throw new ConnectionError('Error al conectar la base de datos');
    }
}