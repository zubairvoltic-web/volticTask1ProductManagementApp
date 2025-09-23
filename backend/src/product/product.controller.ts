import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Request() req, @Body() createProductDto: CreateProductDto) {

    return this.productService.create(createProductDto, req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll(@Request() req) {
    return this.productService.findAll(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
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


}
