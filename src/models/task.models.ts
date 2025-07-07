import z from 'zod';

const TaskSchema = z.object({
    title: z.string().min(3).max(255).trim(),
    description: z.string()
}); // Deberia crear otro schema para la parte del put?? 

export type TaskInput = z.infer<typeof TaskSchema>;

export async function validateTaskInput(input: unknown){
    return TaskSchema.safeParseAsync(input);
};