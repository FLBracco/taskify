import express  from "express";
import { createTasksController, deleteTaskController, getMeTaskController, updateTaskController } from "../controllers/tasks.controller";

const tasksRoutes = express.Router();

tasksRoutes.get('/tasks/me', getMeTaskController);
tasksRoutes.post('/tasks', createTasksController);
tasksRoutes.put('/tasks/:id', updateTaskController);
tasksRoutes.delete('/tasks/:id', deleteTaskController);

export default tasksRoutes;