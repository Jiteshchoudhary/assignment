import { IsNotEmpty, IsString } from "class-validator";
import { LoginUserDto } from "./Login.dto";

/**
 * Params are same so just inherit that class
 */
export class JwtPayload extends LoginUserDto {
    @IsNotEmpty()
    @IsString()
    user_id!: string
}