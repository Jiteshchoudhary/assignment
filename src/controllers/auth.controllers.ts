import { NextFunction, Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export class AuthController {
    private readonly authService = new AuthService();

    signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createUser = await this.authService.signupUser(req.body);
            return res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: createUser
            });
        } catch (error) {
            next(error)
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = await this.authService.login(req.body);
            return res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                data: { token }
            })
        } catch (error) {
            next(error)
        }
    }
}