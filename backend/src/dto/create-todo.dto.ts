import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    description?: string;

    @IsEnum(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}
