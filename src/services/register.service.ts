import bcrypt from 'bcrypt';
import { createUser, userExists } from '../queries/user.repository.js';
import { UserInput } from "../models/register.models.js";
import { ConflictError } from '../utils/customErrors.js';

export async function createUserService(user: UserInput){
    // Descontruimos el objeto pasado del controller
    const {name, email, password} = user;
    const saltRounds = 10;
    // Encriptamos la password
    const pswEncrypted = await bcrypt.hash(password, saltRounds);
    // Corroboramos si las credenciales estan en uso
    const findUser = await userExists(name, email);
    if(findUser){
        throw new ConflictError("Las credenciales ya están en uso");
    }
    const newUser = {
        name: name,
        email: email,
        password: pswEncrypted
    };
    // Devolvemos el usuario inyectado en la DB
    return createUser(newUser);
};