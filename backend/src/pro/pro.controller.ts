import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProService } from './pro.service';
import { CreateProDto } from './dto/create-pro.dto';
import { UpdateProDto } from './dto/update-pro.dto';

@Controller('pro')
export class ProController {
  constructor(private readonly proService: ProService) {}

  @Post()
  create(@Body() createProDto: CreateProDto) {
    return this.proService.create(createProDto);
  }

  @Get()
  findAll() {
    return this.proService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProDto: UpdateProDto) {
    return this.proService.update(+id, updateProDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proService.remove(+id);
  }
}




