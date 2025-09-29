import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Admin } from 'src/admin/admin.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { AdminHelperService } from 'src/utils/admin.helper';
import { User } from 'src/user/user.schema';

@Injectable()
export class ProductService {
  constructor(
    private readonly adminHelper: AdminHelperService,
    @InjectModel(User.name) private userModel: Model<User>,
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
  async findAll(userId: string) {
    console.log("in the product Block",userId);
    
   const userDetail = await this.userModel.findById(userId);
   console.log("in the product ",userDetail);
   if(userDetail.role === 'admin'){
    console.log("in the product Block");
    const products = await this.productModel.find({adminId : userDetail._id});
    console.log("admin Products",products);
    return products;
   }else if(userDetail.role==='manager'){
    const adminProductForTheirManager = await this.productModel.find({adminId:userDetail.admin});
    return adminProductForTheirManager;
   } 
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
