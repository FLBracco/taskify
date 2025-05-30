import bcrypt from 'bcrypt';
import { createUser, userExists } from '../queries/register.repository';
import { UserInput } from "../models/register.models";

export async function createUserService(user: UserInput){
    try {
        // Descontruimos el objeto pasado del controller
        const {name, email, password} = user;
        const saltRounds = 10;
        // Encriptamos la password
        const pswEncrypted = await bcrypt.hash(password, saltRounds);
        // Corroboramos si las credenciales estan en uso
        const userFind = await userExists(name, email);
        if(userFind){
            throw new Error("Las credenciales ya están en uso");
        }
        const newUser = {
            name: name,
            email: email,
            password: pswEncrypted
        };
        // Devolvemos el usuario inyectado en la DB
        return createUser(newUser);
    } catch (err) {
        console.error("Error en el servicio: ", err);
        throw new Error("Error en el servicio de registro");
    }
};