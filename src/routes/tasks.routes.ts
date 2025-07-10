import express  from "express";
import { createTasksController, getMeTaskController } from "../controllers/tasks.controller";

const tasksRoutes = express.Router();

tasksRoutes.get('/tasks/me', getMeTaskController);
tasksRoutes.post('/tasks', createTasksController);

export default tasksRoutes;