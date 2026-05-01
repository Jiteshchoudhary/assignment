import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class TaskQueryDto {
    @IsString()
    @IsOptional()
    status?: string

    @IsString()
    @IsOptional()
    priority?: string

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    page?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    limit?: number;
}