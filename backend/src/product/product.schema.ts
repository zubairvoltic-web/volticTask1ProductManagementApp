import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export type ProductDocument = Product & Document;

@Schema( { timestamps: true } )
export class Product {
    @Prop({ required: true })
    @IsNotEmpty()
    @IsString()
    description: string;
    @Prop({ required: true })
    @IsNotEmpty()
    @IsString()
    price: number;
    @Prop({ required: true, unique: true })
    @IsNotEmpty()
    @IsString()
    name: string;
    @Prop({ required: true })
    @IsNotEmpty()
    @IsString()
    adminId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);