import z from 'zod';

const CategorySchema = z.object({
    name: z.string({required_error: 'name is required'}).trim().min(1).max(100)
})

const idSchema = z.string().regex(/^\d+$/, {message: 'El id debe ser un numero entero'})

export type CategoryType = z.infer<typeof CategorySchema>;
export type CategoryParamsType = z.infer<typeof idSchema>;

export async function validateCategoryInput(input: unknown){
    return CategorySchema.safeParseAsync(input);
}

export async function validateCategoryParams(input: unknown){
    return idSchema.safeParseAsync(input);
}