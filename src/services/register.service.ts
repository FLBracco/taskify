// ¿Qué tengo que hacer en el service?
// 1. Hashear la contraseña y mandarle ese valor al repository. 
// 2. Llamar al repository
// 3. Devolver ese los datos útiles al controller
import bcrypt from 'bcrypt';
import { createUser, userExists } from '../queries/register.repository';
import { UserInput } from "../models/register.models";

export async function createUserService(user: UserInput){
    try {
        const {name, email, password} = user;
        const saltRounds = 10;
        const pswEncrypted = await bcrypt.hash(password, saltRounds);
        const userFind = await userExists(name, email);
        if(userFind){
            throw new Error("Las credenciales ya están en uso");
        }
        const newUser = {
            name: name,
            email: email,
            password: pswEncrypted
        };
        return createUser(newUser);
    } catch (err) {
        console.error("Error en el servicio: ", err);
        throw new Error("Error en el servicio de registro");
    }
};