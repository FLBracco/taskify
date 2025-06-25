import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import { findUser } from "../queries/user.repository.js";
import { LoginInput } from "../models/login.models.js";
import { CredentialsError } from "../utils/customErrors.js";

export async function loginService(input: LoginInput){
    const secret = process.env.SECRET_JWT_KEY;
    if(!secret){
        throw new Error("SECRET_JWT_KEY no esta definida.");
    }
    const { name, email, password } = input;
    const user = await findUser(name, email);
    if(!user){
        throw new CredentialsError("Credenciales inválidas");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        throw new CredentialsError("Credenciales inválidas");
    }
    const token = jwt.sign({id: user.id, username: user.name}, secret, {
        expiresIn: '1h'
    });
    return token;
};