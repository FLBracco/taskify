import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const token = req.cookies.access_token;
    const secret = process.env.SECRET_JWT_KEY;
    let data = null;

    req.session = { user: null };

    try {
        data = jwt.verify(token, secret);
        req.session.user = data;
    } catch (err) {
    }
    next();
};