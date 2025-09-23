import { Injectable } from '@nestjs/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsEmpty, IsString, MinLength } from 'class-validator';

export type ManagerDocument = Manager & Document;


@Schema({ timestamps: true })
export class Manager {
    @Prop({ required: true })
    @IsEmpty()
    @IsString()
    name: string;
    @Prop({ required: true, unique: true })
    @IsEmpty()
    @IsString()
    email: string;
    @Prop({ required: true })
    @IsEmpty()
    @IsString()
    @MinLength(6)
    password: string;
    @Prop({required: true})
    @IsEmpty()
    @IsString()
    role: string;
    
    @Prop({required: true})
    @IsEmpty()
    @IsString()
    adminId: string;

}

export const ManagerSchema = SchemaFactory.createForClass(Manager);




// export type AdminDocument = Admin & Document;
// @Schema( { timestamps: true } )
// export class Admin {
//     @Prop({ required: true })
//     @IsNotEmpty()
//     @IsString()
//     name: string;
//     @Prop({ required: true, unique: true })
//     @IsNotEmpty()
//     @IsEmail()
//     email: string;
//     @Prop({ required: true })
//     @IsNotEmpty()
//     @IsString()
//     @MinLength(6)
//     password: string;
//     @Prop()
//     age: number;
// }

// export const AdminSchema = SchemaFactory.createForClass(Admin); 