import z from "zod";

const LoginSchema = z.object({
    name: z.string().trim().min(1).max(100).optional(),
    email: z.string().email().trim().min(1).max(100).optional(),
    password: z.string().trim().min(8).max(255)
        .regex(/[A-Z]/, "Debe tener al menos una letra mayúscula")
        .regex(/[a-z]/, "Debe tener al menos una letra minúscula")
        .regex(/[0-9]/, "Debe tener al menus un número")
        .regex(/[^A-Za-z0-9]/, "Debe tener al menos un carácter especial")
}).refine((data) => data.name || data.email,{
    message: "Debe proporcionar un nombre de usuario o un email",
    path: ["name"]
});

const UserDbSchema = z.object({
    id: z.number().int().positive().min(1),
    name: z.string().trim().min(1).max(100),
    email: z.string().email().trim().min(1).max(100),
    password: z.string().trim().min(8).max(255)
        .regex(/[A-Z]/, "Debe tener al menos una letra mayúscula")
        .regex(/[a-z]/, "Debe tener al menos una letra minúscula")
        .regex(/[0-9]/, "Debe tener al menus un número")
        .regex(/[^A-Za-z0-9]/, "Debe tener al menos un carácter especial")
})

export type LoginInput = z.infer<typeof LoginSchema>;
export type UserDbType = z.infer<typeof UserDbSchema>;

export async function validateLoginInput(input: unknown){
    return LoginSchema.safeParseAsync(input);
}