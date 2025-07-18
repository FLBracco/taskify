import z from 'zod';

const UserSchema = z.object({
    name: z.string().trim().min(1).max(100),
    email: z.string().email().trim().min(1).max(100),
    password: z.string().trim().min(8).max(255)
        .regex(/[A-Z]/, "Debe tener al menos una letra mayúscula")
        .regex(/[a-z]/, "Debe tener al menos una letra minúscula")
        .regex(/[0-9]/, "Debe tener al menus un número")
        .regex(/[^A-Za-z0-9]/, "Debe tener al menos un carácter especial")
});

export type UserInput = z.infer<typeof UserSchema>;

export async function validateInput(input: unknown){
    return UserSchema.safeParseAsync(input);
}