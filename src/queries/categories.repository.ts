import pool from "../db/db.config";
import { CategoryParamsType, CategoryType } from "../models/categories.models";
import { ConnectionError } from "../utils/customErrors";
// Crear nueva categoria

export async function createCategory(category: CategoryType){
    try {
        const categoryQuery = `
            INSERT INTO categories (name)
            VALUES ($1) RETURNING *;
        `;
        const res = await pool.query(categoryQuery, [category])
        return res.rows[0];
    } catch (err) {
        console.error("Error en la base de datos", err);
        throw new ConnectionError('Error al conectar la base de datos');
    }
}

export async function findCategories(category: CategoryType){
    try {
        const findCategoriesQuery = `
            SELECT * FROM categories
            WHERE name = $1;
        `;
        const res = await pool.query(findCategoriesQuery, [category]);
        return res.rows.length > 0;
    } catch (err) {
        console.error("Error en la base de datos", err);
        throw new ConnectionError('Error al conectar la base de datos');
    }
};

export async function findCategoriesByID(id: CategoryParamsType){
    try {
        const findCategoryByID = `
            SELECT id, name FROM categories
            WHERE id = $1;
        `
        const res = await pool.query(findCategoryByID, [id]);
        return res.rows.length > 0;
    } catch (err) {
        console.error("Error en la base de datos", err);
        throw new ConnectionError('Error al conectar la base de datos');
    }
}

export async function getCategories(){
    try {
        const getCategories = `
            SELECT id, name FROM categories;
        `
        const res = await pool.query(getCategories);
        return res.rows 
    } catch (err) {
        console.error("Error en la base de datos", err);
        throw new ConnectionError('Error al conectar la base de datos');
    }
}

export async function updateCategories(id: CategoryParamsType, name: CategoryType){
    try {
        const updateCategoriesQuery = `
            UPDATE categories
            SET name = $1
            WHERE id = $2 
            RETURNING id, name;
        `
        const res = await pool.query(updateCategoriesQuery, [name, id]);
        return res.rows[0];
    } catch (err) {
        console.error("Error en la base de datos", err);
        throw new ConnectionError('Error al conectar la base de datos');
    }
}

export async function deleteCategories(id: CategoryParamsType){
    try {
        const deleteCategoriesQuery = `
            DELETE FROM categories
            WHERE id = $1
            RETURNING id, name;
        `;
        const res = await pool.query(deleteCategoriesQuery, [id]);
        return res.rows[0];
    } catch (err) {
        console.error("Error en la base de datos", err);
        throw new ConnectionError('Error al conectar la base de datos');
    }
}