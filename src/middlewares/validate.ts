import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate as classValidate } from 'class-validator';

export const validate = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const bodyParams = req.method === 'GET' ? req.query : req.body;
        const dtoObj = plainToInstance(dtoClass, bodyParams);

        const errors = await classValidate(dtoObj, {
            whitelist: true,
            forbidNonWhitelisted: true
        });

        if (errors.length > 0) {
            // Thoda clean error format bhejte hain
            const formattedErrors = errors.map(err => ({
                property: err.property,
                constraints: err.constraints || { unknown: "Property not allowed" }
            }));

            res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: formattedErrors
            });
            return;
        }

        req.body = dtoObj;
        next();
    };
};