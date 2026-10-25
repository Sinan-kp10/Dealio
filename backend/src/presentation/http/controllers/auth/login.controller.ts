import type { Request, Response, NextFunction } from "express";
import { LoginUseCase } from "../../../../application/auth/use-cases/login.use-case";
import { LoginDto } from "../../../../application/auth/dto/login.dto";

export class  LoginController {

    constructor(private readonly loginrUseCase : LoginUseCase){}

    handle= async(req : Request, res : Response, next : NextFunction): Promise<void> => {

        try {

            const data = req.body as LoginDto

            const result = await this.loginrUseCase.execute(data)
            
            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 15 * 60 * 1000,
            });

            res.status(200).json({
                success: "success",
                message: "Login successful.",
                data : result
            });
            
        } catch (error) {
            next(error);
        }

    }

}