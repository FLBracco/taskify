import express from "express";
import { createCategoriesController, deleteCategoriesController, getCategoriesController, updateCategoriesController } from "../controllers/categories.controller";

const categoriesRoutes = express.Router();

categoriesRoutes.get('/categories', getCategoriesController);
categoriesRoutes.post('/categories', createCategoriesController);
categoriesRoutes.put('/categories/:id', updateCategoriesController);
categoriesRoutes.delete('/categories/:id', deleteCategoriesController);

export default categoriesRoutes