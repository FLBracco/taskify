import express  from "express";
import { createTasksController, getMeTaskController, updateTaskController } from "../controllers/tasks.controller";

const tasksRoutes = express.Router();

tasksRoutes.get('/tasks/me', getMeTaskController);
tasksRoutes.post('/tasks', createTasksController);
tasksRoutes.put('/tasks/:id', updateTaskController);

export default tasksRoutes;