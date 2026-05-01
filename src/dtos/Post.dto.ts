import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostDto {
    @IsString()
    @IsNotEmpty()
    post!: string

    @IsNumber()
    @IsNotEmpty()
    user_id!: number
}