export class ConnectionError extends Error{
    statusCode: number;
    constructor(message: string){
        super(message);
        this.name = 'ConnectionError'
        this.stack = ''
        this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
};

export class ConflictError extends Error{
    statusCode: number;
    constructor(message:string){
        super(message);
        this.name = 'ConflictError';
        this.statusCode = HttpStatus.CONFLICT;
    }
};

export class CredentialsError extends Error{
    statusCode: number;
    constructor(message:string){
        super(message);
        this.name = 'CredentialsError';
        this.statusCode = HttpStatus.UNAUTHORIZED
    }
};

export class loginUnauthorized extends Error{
    statusCode: number;
    constructor(message:string){
        super(message);
        this.name = "ForbiddenError";
        this.statusCode = HttpStatus.FORBIDDEN;
    }
};

export class NotFoundError extends Error{
    statusCode: number;
    constructor(message:string){
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = HttpStatus.NOT_FOUND;
    }
};

export class BadRequestError extends Error{
     statusCode: number;
     constructor(message: string){
        super(message);
        this.name = "BadRequestError";
        this.statusCode = HttpStatus.BAD_REQUEST;
     };
};

export enum HttpStatus {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500
}