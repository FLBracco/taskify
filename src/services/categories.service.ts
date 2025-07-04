import { createCategory, deleteCategories, findCategories, findCategoriesByID, getCategories, updateCategories } from "../queries/categories.repository";
import { CategoryParamsType, CategoryType } from "../models/categories.models";
import { ConflictError, NotFoundError } from "../utils/customErrors";

export async function createCategoriesService(category: CategoryType){
    const categoriesExists = await findCategories(category);
    if(categoriesExists) throw new ConflictError('La categoria ya existe');
    return await createCategory(category);
};

export async function getCategoriesService(){
    return await getCategories();
}

export async function updateCategoriesService(id: CategoryParamsType, category: CategoryType){
    const categoriesExists = await findCategoriesByID(id);
    if(!categoriesExists) throw new NotFoundError('La categoria no existe');
    return await updateCategories(id, category);
}

export async function deleteCategoriesService(id: CategoryParamsType){
    const categoriesExists = await findCategoriesByID(id);
    if(!categoriesExists) throw new NotFoundError('La categoría no existe');
    return await deleteCategories(id);
};