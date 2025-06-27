import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CredentialsError } from "../utils/customErrors";

type TokenPayload = {id: number; username: string};

export function authMiddleware(req: Request, _res: Response, next: NextFunction){
    const token = req.cookies.accessToken;
    const secret = process.env.SECRET_JWT_KEY;
    if(!token || !secret){
        throw new CredentialsError('Acceso denegado');
    }
    req.session.user = undefined
    try {
        const data = jwt.verify(token, secret) as TokenPayload;
        req.session.user = data;
    } catch (err) {}
    next();
};