import { Request, Response, NextFunction } from "express";
import { ConnectionError, ConflictError, HttpStatus, CredentialsError} from "../utils/customErrors";
import { ZodError } from "zod";

export async function errorHandler (err: any, _req: Request, res: Response, next: NextFunction){ 
    if(err instanceof ConnectionError){
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: err.message});
    }

    if(err instanceof ConflictError){
        return res.status(HttpStatus.CONFLICT).json({error: err.message});
    }

    if(err instanceof ZodError){
        return res.status(HttpStatus.BAD_REQUEST).json({
            error: 'Validación inválida',
            issues: err.issues.map(issue =>({
                path: issue.path.join('.'),
                message: issue.message,
            })),
        })
    };

    if(err instanceof CredentialsError){
        return res.status(HttpStatus.UNAUTHORIZED).json({error: err.message});
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Error interno del servidor',
    })
};