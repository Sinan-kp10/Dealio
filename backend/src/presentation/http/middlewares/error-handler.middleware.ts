import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../../../shared/errors/app-error";


export const errorHandler : ErrorRequestHandler = (error : unknown, _req : Request, res : Response, _next:NextFunction) : void=>{

    if(error instanceof AppError){
        res.status(error.statusCode).json({
            success : false,
            status : error.status,
            message : error.message

        })
    }

}