import express from "express";
import { createCategoriesController, getCategoriesController, updateCategoriesController } from "../controllers/categories.controller";

const categoriesRoutes = express.Router();

categoriesRoutes.get('/categories', getCategoriesController);
categoriesRoutes.post('/categories', createCategoriesController);
categoriesRoutes.put('/categories/:id', updateCategoriesController);

export default categoriesRoutes