import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Admin } from 'src/admin/admin.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { AdminHelperService } from 'src/utils/admin.helper';

@Injectable()
export class ProductService {
  constructor(
    private readonly adminHelper: AdminHelperService,
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}


  async create(createProductDto: CreateProductDto , user: any) {
    try {
      console.log("createProductDto in service:", createProductDto,);

      console.log("user in service:", user);
      await this.adminHelper.validateAdmin(user.userId);
      
    

    
    console.log("AdminId:", user.userId);
    
    

    const newProduct = new this.productModel({
      ...createProductDto,
      adminId: user.userId, // assuming user.sub is the admin Id
    });
    await newProduct.save();
    

    console.log("user in product service:", user);

    return newProduct;
      
    } catch (error) {
      if (error.code === 11000) {
      // Duplicate key error
      throw new ConflictException('Product name must be unique');
    }
    throw error;
      
    }
    
  }
  async findAll(adminId: string) {
    return this.productModel.find({ adminId: adminId }).exec();
  }
  async update(id: string, updateProductDto: UpdateProductDto) {
    
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
    if (!updatedProduct) {
      return { message: 'Product not found' }
    } 
    return updatedProduct;
  }

  async remove(id: String, user: any) {
    // remove the product from the database
    await this.adminHelper.validateAdmin(user.userId);
    const product = this.productModel.findByIdAndDelete(id);
    if (!product) {
      return { message: 'Product not found' };
    }
    return product;

    
  }
}
