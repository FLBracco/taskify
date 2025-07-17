import z from 'zod';

const TaskSchema = z.object({
    title: z.string().min(3).max(255).trim(),
    description: z.string(),
    categories: z.array(z.number()).optional()
}); // Deberia crear otro schema para la parte del put?? 

const UpdateTaskSchema = z.object({
    title: z.string().min(1).max(100).optional(),
    description: z.string().max(255).optional(),
    completed: z.boolean().optional(),
    categories: z.array(z.number()).optional()
});

export type TaskInput = z.infer<typeof TaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;

export async function validateTaskInput(input: unknown){
    return TaskSchema.safeParseAsync(input);
};

export async function validateUpdateTaskInput(input: unknown){
    return UpdateTaskSchema.safeParseAsync(input);
};