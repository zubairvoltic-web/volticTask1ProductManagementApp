import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Admin } from 'src/admin/admin.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { AdminHelperService } from 'src/utils/admin.helper';
import { User } from 'src/user/user.schema';
import csvParser from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class ProductService {
  constructor(
    private readonly adminHelper: AdminHelperService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
async bulkUpload(file: Express.Multer.File, adminId: any) {
  try {
    const productsArray = await this.parseCSV(file, adminId);

    // Prepare bulk operations
    const bulkOps = productsArray.map((product) => ({
      updateOne: {
        filter: { name: product.name, adminId }, // check duplicates for same admin
        update: { $set: product },
        upsert: true, // insert if not exist, update if exists
      },
    }));

    const result = await this.productModel.bulkWrite(bulkOps);

    return {
      message: 'Bulk operation completed successfully',
      insertedCount: result.upsertedCount,
      modifiedCount: result.modifiedCount,
      total: productsArray.length,
    };
  } catch (error) {
    throw new Error(`Bulk operation failed: ${error.message}`);
  }
}
async updateManyProducts(adminId: string, filter: any, update: any) {
  try {
    // Always enforce adminId in the filter
    const finalFilter = { ...filter, adminId };

    const result = await this.productModel.updateMany(finalFilter, update);

    return {
      message: 'Bulk update operation completed',
      matched: result.matchedCount,
      modified: result.modifiedCount,
    };
  } catch (error) {
    throw new Error(`Bulk update failed: ${error.message}`);
  }
}


  private async parseCSV(file: Express.Multer.File, adminId:any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results = [];
      const stream = Readable.from(file.buffer);

      stream
        .pipe(csvParser())
        .on('data', (row) => {
          // Ensure values are mapped correctly to your schema
          results.push({
            name: row.name,
            description: row.description,
            price: Number(row.price),
            adminId: adminId,
          });
        })
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

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
  // product.service.ts
async bulkUpdateProducts(operations: any[], adminId: string) {
  try {
    // Add adminId into each filter automatically
    const bulkOps = operations.map((op) => ({
      updateOne: {
        filter: { ...op.filter, adminId },
        update: op.update,
        upsert: false, // don’t insert new docs, only update
      },
    }));

    const result = await this.productModel.bulkWrite(bulkOps);

    return {
      message: 'Bulk update operation completed',
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    };
  } catch (error) {
    throw new Error(`Bulk update failed: ${error.message}`);
  }
}

}
