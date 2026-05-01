import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

/**
 * Dto class for signup the user
 */
export class SignupDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @IsString()
    tenantId!: string
}