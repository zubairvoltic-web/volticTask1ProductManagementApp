import { Prop } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AdminDocument = Admin & Document;
@Schema( { timestamps: true } )
export class Admin {
    @Prop({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;
    @Prop({ required: true, unique: true })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @Prop({ required: true })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
    @Prop()
    age: number;
}

export const AdminSchema = SchemaFactory.createForClass(Admin); 