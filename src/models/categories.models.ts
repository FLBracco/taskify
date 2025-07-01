import z from 'zod';

const CategorySchema = z.object({
    name: z.string({required_error: 'name is required'}).trim().min(1).max(100)
})

export type CategoryType = z.infer<typeof CategorySchema>;

export async function validateCategoryInput(input: unknown){
    return CategorySchema.safeParseAsync(input);
}