import { createCategory, findCategories } from "../queries/categories.repository";
import { CategoryType } from "../models/categories.models";
import { ConflictError } from "../utils/customErrors";

export async function createCategoriesService(category: CategoryType){
    const categoriesExists = await findCategories(category);
    if(categoriesExists) throw new ConflictError('La categoria ya existe');
    return await createCategory(category);;
};