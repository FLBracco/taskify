import express  from "express";
import { createTasksController } from "../controllers/tasks.controller";

const tasksRoutes = express.Router();

tasksRoutes.post('/tasks', createTasksController);

export default tasksRoutes;