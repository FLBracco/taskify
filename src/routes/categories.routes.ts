import express from "express";
import { createCategoriesController, getCategoriesController } from "../controllers/categories.controller";

const categoriesRoutes = express.Router();

categoriesRoutes.get('/categories', getCategoriesController);
categoriesRoutes.post('/categories', createCategoriesController);

export default categoriesRoutes