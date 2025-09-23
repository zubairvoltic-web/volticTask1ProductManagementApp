import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateAdminDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsNumber()
    age: number;

}
export class ReturnCreateAdminDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsNumber()
    age: number;

    @IsString()
    _id: string;

}
 