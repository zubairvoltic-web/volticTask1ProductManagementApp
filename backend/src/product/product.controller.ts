import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'; // ✅ for file uploads
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';     // ✅ JWT guard
import { NoManagerGuard } from './no-manager.guard';        // ✅ custom guard
import { ProductService } from './product.service';         // ✅ service
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BulkOperationDto } from './dto/bulk-operations.dto';
import type{ Express } from 'express';  // ✅ for bulk ops DTO


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @UseGuards(JwtAuthGuard,NoManagerGuard





    
  )
  @Post('create')
  create(@Request() req, @Body() createProductDto: CreateProductDto) {

    return this.productService.create(createProductDto, req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll(@Request() req) {
    return this.productService.findAll(req.user.userId);
  }

  @UseGuards(JwtAuthGuard,NoManagerGuard)
  @Delete('delete/:id')
  remove(@Request() req,@Param('id') id: string) {
    // const parsedId = parseInt(id, 10);
    return this.productService.remove(id , req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }


// @UseGuards(JwtAuthGuard, NoManagerGuard)
// @Post('bulk')
// bulkOperation(@Request() req, @Body() bulkOperationDto: BulkOperationDto) {
//   return this.productService.bulkOperation(bulkOperationDto.operations, req.user);
// }
@UseGuards(JwtAuthGuard,NoManagerGuard)
@Post('admin/bulk-upload')
  @UseInterceptors(FileInterceptor('file'))
  async bulkUpload(@Request() req,@UploadedFile() file: Express.Multer.File) {
    return this.productService.bulkUpload(file,req.user.userId);
  }
@UseGuards(JwtAuthGuard, NoManagerGuard) // only admins
@Patch('admin/update-many')
async updateManyProducts(@Request() req, @Body() body: any) {
  return this.productService.updateManyProducts(req.user.userId, body.filter, body.update);
}

// product.controller.ts
@UseGuards(JwtAuthGuard, NoManagerGuard) // only admins
@Post('admin/bulk-update')
async bulkUpdateProducts(@Request() req, @Body() body: any) {
  return this.productService.bulkUpdateProducts(body.operations, req.user.userId);
}


}
