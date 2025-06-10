import bcrypt from "bcrypt";
import { findUser } from "../queries/user.repository.js";
import { LoginInput } from "../models/login.models.js";
import { CredentialsError } from "../utils/customErrors.js";

export async function loginService(input: LoginInput){
    const { name, email, password } = input;
    const user = findUser(name, email);
    if(!user){
        throw new CredentialsError("Credenciales Invalidas");
    }
}