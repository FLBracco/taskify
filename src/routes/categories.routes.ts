import express from "express";
import { createCategoriesController } from "../controllers/categories.controller";

const categoriesRoutes = express.Router();

categoriesRoutes.post('/categories', createCategoriesController);

export default categoriesRoutes