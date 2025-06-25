import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type TokenPayload = {id: number; username: string};

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const token = req.cookies.access_token;
    const secret = process.env.SECRET_JWT_KEY;
    if(!token || !secret){
        req.session.user = undefined;
        return next()
    }
    try {
        const data = jwt.verify(token, secret) as TokenPayload;
        req.session.user = data;
    } catch (err) {
        req.session.user = undefined;
        next(err);
    }
    next();
};